'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IInterview } from '@/app/(views)/(interview)/interview/types';
import { useParams } from 'next/navigation';
import ScrollContainer from '@/components/ui/scrollarea/CustomScrollarea';
import CustomInput from '@/components/ui/input/CustomInput';
import InterviewMessage from '@/app/(views)/(interview)/interview/[id]/components/InterviewMessage';
import Api from '@/core/api/api';
import CustomButton from '@/components/ui/button/CustomButton';
import errorHandler from '@/core/utils/error/errorHandler';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';

const CurrentInterviewPage = () => {
  const { id } = useParams();

  const [interview, setInterview] = useState<IInterview>();
  const [userMessage, setUserMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const continueChat = async () => {
    try {
      dispatch(setLoading(true));
      await Api.post<{ interviewId: any }, IInterview>('/interview/chat/continue', {
        interviewId: id,
      });
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const sendMessage = async () => {
    if (!userMessage) {
      return;
    }

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
    try {
      dispatch(setLoading(true));
      const result = await Api.get<any, IInterview>('/interview/interview', { id });
      setInterview(result.payload);
      const lastMessage = result.payload.messages?.length
        ? result.payload.messages[result.payload.messages.length - 1]
        : null;
      if ((!lastMessage || lastMessage.is_human) && !result.payload.finished) {
        continueChat();
      }
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, id]);

  useEffect(() => {
    let partialMessage = '';
    const eventSource = Api.createEvent('/interview/stream');

    eventSource.onmessage = (event: MessageEvent) => {
      console.log(event);

      const content = JSON.parse(event.data) as {
        text: string;
        type: 'chunk' | 'done' | 'data';
        interview: IInterview;
      };
      partialMessage += content.text;

      if (content.type === 'chunk') {
        setInterview((prev) => {
          if (!prev) return prev;

          const updatedMessages = [...prev.messages];
          const last = updatedMessages[updatedMessages.length - 1];

          if (last && !last.is_human) {
            last.text = partialMessage;
          } else {
            updatedMessages.push({
              id: Date.now(),
              created_at: new Date().toISOString(),
              is_human: false,
              text: partialMessage,
            });
          }

          return {
            ...prev,
            messages: updatedMessages,
          };
        });
      }

      if (content.type === 'done') {
        console.log('Конец сообщения');
        console.log('END: ', content.text);
      }

      if (content.type === 'data') {
        setInterview(content.interview);
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
                    message={message}
                  />
                ))}
              <div ref={messageEndRef} />
            </div>
          </ScrollContainer>
        </div>
        <div className={'mt-2'}>
          <CustomInput
            value={userMessage}
            onInput={setUserMessage}
          />
        </div>
        <CustomButton
          text={'Отправить'}
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default CurrentInterviewPage;
