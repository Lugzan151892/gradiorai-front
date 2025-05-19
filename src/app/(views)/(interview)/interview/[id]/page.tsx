'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IInterview } from '@/app/(views)/(interview)/interview/types';
import { useParams } from 'next/navigation';
import { interviewMock } from '@/app/(views)/(interview)/interview/utils';
import ScrollContainer from '@/components/ui/scrollarea/CustomScrollarea';
import CustomInput from '@/components/ui/input/CustomInput';
import InterviewMessage from '@/app/(views)/(interview)/interview/[id]/components/InterviewMessage';
import Api from '@/core/api/api';
import CustomButton from '@/components/ui/button/CustomButton';

const CurrentInterviewPage = () => {
  const { id } = useParams();

  const [interview, setInterview] = useState<IInterview>();
  const [userMessage, setUserMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let partialMessage = '';
    const eventSource = new EventSource('http://localhost:5000/gpt/interview/stream');

    eventSource.onmessage = (event: MessageEvent) => {
      console.log(event);

      const content = JSON.parse(event.data) as { text: string; type: 'chunk' | 'done' };
      partialMessage += content.text;

      if (content.type === 'chunk') {
        setInterview((prev) => {
          if (!prev) return prev;

          const updatedMessages = [...prev.messages];
          const last = updatedMessages[updatedMessages.length - 1];

          if (last && last.type === 'GPT') {
            last.text = partialMessage;
          } else {
            updatedMessages.push({
              id: Date.now(),
              created_at: new Date().toISOString(),
              type: 'GPT',
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
      }
    };

    // eventSource.addEventListener('done', () => {
    //   console.log('GPT закончил сообщение');
    // });

    return () => eventSource.close();
  }, []);

  const sendMessage = async () => {
    const result = await Api.post('/gpt/interview/message', {
      content: 'test content',
    });

    console.log(result);
  };

  const loadInterview = useCallback(async () => {
    console.log(id);

    const result = interviewMock;

    console.log(result);

    setInterview(result);
  }, [id]);

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
                    className={`max-w-[70%] ${message.type === 'USER' ? 'ml-auto' : 'mr-auto'}`}
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
          text={'test'}
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default CurrentInterviewPage;
