'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IInterview } from '@/app/(views)/(interview)/interview/types';
import { useParams } from 'next/navigation';
import { interviewMock } from '@/app/(views)/(interview)/interview/utils';
import ScrollContainer from '@/components/ui/scrollarea/CustomScrollarea';
import CustomInput from '@/components/ui/input/CustomInput';
import InterviewMessage from '@/app/(views)/(interview)/interview/[id]/components/InterviewMessage';

const CurrentInterviewPage = () => {
  const { id } = useParams();

  const [interview, setInterview] = useState<IInterview>();
  const [userMessage, setUserMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);

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
      </div>
    </div>
  );
};

export default CurrentInterviewPage;
