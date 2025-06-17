'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IInterview } from '@/app/(views)/(interview)/interview/types';
import { useParams } from 'next/navigation';
import InterviewMessage from '@/app/(views)/(interview)/interview/[id]/components/InterviewMessage';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import UITextarea from '@/components/ui/textarea/UITextarea';
import { useSpeechRecognition } from '@/hooks/speech-recognition/useSpeechRecognition';
import CustomIcon from '@/components/ui/icon/CustomIcon';

const CurrentInterviewPage = () => {
  const { id } = useParams();

  const [interview, setInterview] = useState<IInterview>();
  const [userMessage, setUserMessage] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { isListening, startListening, stopListening, interimTranscript, canUseRecognition } = useSpeechRecognition(
    (finalPart) => {
      setUserMessage((prev) => `${prev} ${finalPart}`.trim());
    }
  );

  const dispatch = useAppDispatch();

  const continueChat = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      await Api.post<{ interviewId: any }, IInterview>('/interview/chat/continue', {
        interviewId: id,
      });
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, id]);

  const sendMessage = async () => {
    if (!userMessage) {
      return;
    }

    setIsGenerating(true);

    try {
      dispatch(setLoading(true));
      const result = await Api.post<{ content: string; interviewId: any }, IInterview>('/interview/message', {
        interviewId: id,
        content: userMessage,
      });

      setInterview(result.payload);
      setUserMessage('');

      if (!result.payload.finished) {
        continueChat();
      }
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadInterview = useCallback(async () => {
    if (interview) {
      return;
    }

    try {
      dispatch(setLoading(true));
      const result = await Api.get<{ id: any }, IInterview>('/interview/interview', { id });
      setInterview(result.payload);
      if (!result.payload.messages?.length) {
        continueChat();
      }

      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, id, interview, continueChat]);

  useEffect(() => {
    let partialMessage = '';
    const eventSource = Api.createEvent('/interview/stream');

    eventSource.onmessage = (event: MessageEvent) => {
      const content = JSON.parse(event.data) as {
        text: string;
        type: 'chunk' | 'data' | 'result';
        interview: IInterview;
      };
      partialMessage += content.text;

      if (content.type === 'chunk') {
        setIsGenerating(true);
        setGeneratedMessage(partialMessage);

        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }

      if (content.type === 'data' || content.type === 'result') {
        setGeneratedMessage('');
        setInterview(content.interview);
        setIsGenerating(false);

        setTimeout(() => {
          messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    };

    return () => eventSource.close();
  }, []);

  useEffect(() => {
    loadInterview();
  }, [loadInterview]);

  return (
    <div className={'w-full max-w-[840px] h-[calc(100vh-112px)] lg:mx-auto flex flex-col lg:py-14 py-8 px-4'}>
      <div className={'border-1 border-main-gray rounded-3xl p-4 flex flex-col justify-end overflow-hidden h-full'}>
        <div className={'flex-grow'} />
        <div className={'flex flex-col overflow-auto'}>
          {interview?.messages.map((message) => (
            <InterviewMessage
              key={message.id}
              className={`max-w-[70%] mb-2 ${message.is_human ? 'ml-auto' : 'mr-auto'}`}
              message={message.text}
              isHuman={message.is_human}
            />
          ))}
          {isGenerating && !!generatedMessage && (
            <InterviewMessage
              className={'max-w-[70%] mb-2 mr-auto'}
              message={generatedMessage}
              isHuman={false}
            />
          )}
          {interview?.finished && (
            <div className={'bg-message-gray p-4 rounded-input'}>
              <div className={'text-2xl mb-4'}>Результат интервью:</div>
              <div>{interview.recomendations}</div>
            </div>
          )}
          <div ref={messageEndRef} />
        </div>
        <div className={'mt-4'}>
          <div className={'h-4 mb-2'}>
            {(isListening || isGenerating || true) && (
              <div className={'text-text-disabled flex justify-center'}>
                {isListening && <div>Записываем голос ...</div>}
                {isGenerating && <div>Генерируем ответ ...</div>}
              </div>
            )}
          </div>
          <UITextarea
            value={isListening ? `${userMessage} ${interimTranscript}`.trim() : userMessage}
            onInput={setUserMessage}
            autoResize
            placeholder={'Введите текст'}
            paddingGap={70}
            onChange={sendMessage}
            disabled={isGenerating || interview?.finished || isListening}
          >
            <div className={'flex gap-3'}>
              {canUseRecognition && (
                <CustomIcon
                  name={isListening ? 'stop' : 'microphone'}
                  className={'cursor-pointer'}
                  color={isListening ? 'var(--main-error)' : 'var(--main-white)'}
                  disabled={isGenerating || interview?.finished}
                  onClick={isListening ? stopListening : startListening}
                />
              )}
              <CustomIcon
                name={'send'}
                className={'cursor-pointer'}
                disabled={isGenerating || interview?.finished}
                onClick={sendMessage}
              />
            </div>
          </UITextarea>
        </div>
      </div>
    </div>
  );
};

export default CurrentInterviewPage;
