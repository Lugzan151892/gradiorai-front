'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IInterview } from '@/app/(views)/(interview)/interview/types';
import { useParams } from 'next/navigation';
import ScrollContainer from '@/components/ui/scrollarea/CustomScrollarea';
import InterviewMessage from '@/app/(views)/(interview)/interview/[id]/components/InterviewMessage';
import Api from '@/core/api/api';
import CustomButton from '@/components/ui/button/CustomButton';
import errorHandler from '@/core/utils/error/errorHandler';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import CustomTextarea from '@/components/ui/textarea/CustomTextarea';

const CurrentInterviewPage = () => {
  const { id } = useParams();

  const [interview, setInterview] = useState<IInterview>();
  const [userMessage, setUserMessage] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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

      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      }

      if (content.type === 'data' || content.type === 'result') {
        setGeneratedMessage('');
        setInterview(content.interview);
        setIsGenerating(false);
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return () => eventSource.close();
  }, []);

  useEffect(() => {
    loadInterview();
  }, [loadInterview]);

  return (
    <div className={'w-full max-w-[990px] mx-auto flex flex-col h-full'}>
      <div className={'bg-bg-transparent-25 rounded-10 p-4 flex-grow flex flex-col h-full justify-end'}>
        <div className={'overflow-hidden'}>
          <ScrollContainer>
            <div className={'flex flex-col w-full h-full px-2'}>
              {interview &&
                interview.messages.map((message) => (
                  <InterviewMessage
                    key={message.id}
                    className={`max-w-[70%] mb-2 ${message.is_human ? 'ml-auto' : 'mr-auto'}`}
                    message={message.text}
                    isHuman={message.is_human}
                  />
                ))}
              {isGenerating && !!generatedMessage && (
                <InterviewMessage
                  className={`max-w-[70%] mb-2 'mr-auto'`}
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
          </ScrollContainer>
        </div>
        <div className={'mt-2'}>
          <CustomTextarea
            value={userMessage}
            onInput={setUserMessage}
            onChange={sendMessage}
            disabled={isGenerating || interview?.finished}
          />
        </div>
        {isGenerating && <div>Генерируем ответ</div>}
        <CustomButton
          text={'Отправить'}
          onClick={sendMessage}
          disabled={isGenerating || interview?.finished}
        />
      </div>
    </div>
  );
};

export default CurrentInterviewPage;
