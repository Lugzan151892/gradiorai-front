import CustomModal from '@/components/ui/modal/CustomModal';
import React, { useEffect, useRef, useState } from 'react';
import { IInterview } from '@/app/(views)/(interview)/interview/types';
import MarkdownMessage from '@/components/markdown-message/MarkdownMessage';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import { normalizeServerDate } from '@/core/utils/date';
import { cn } from '@/lib/utils';
import UIButton from '@/components/ui/button/UIButton';
import { useRouter } from 'next/navigation';
import { Trans } from '@/i18n/Trans';

interface IInterviewModalProps {
  open?: boolean;
  onClose?: () => void;
  interview: IInterview | null;
}

const InterviewModal: React.FC<IInterviewModalProps> = ({ open = false, onClose, interview }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;

      setShowScrollToBottom(!isAtBottom);
    };

    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <CustomModal
      open={open}
      caption={
        <Trans
          ns={'profile'}
          k={'profile_interview_history'}
        />
      }
      onClose={onClose}
    >
      <div className={'lg:min-w-[400px] max-w-[840px] h-[calc(100dvh-112px)] lg:mx-auto flex flex-col p-6'}>
        <div className={'flex flex-col gap-2 mb-6'}>
          <div className={'flex items-center gap-2'}>
            <CustomIcon name={'calendar'} />
            <div>{normalizeServerDate(interview?.created_at || '')}</div>
          </div>
          <div>
            <span>
              <Trans
                ns={'common'}
                k={'common_status'}
              />
              :{' '}
            </span>
            <span
              className={cn(
                interview?.finished && (interview?.success ? 'text-success' : 'text-error'),
                !interview?.finished && 'text-yellow'
              )}
            >
              {interview?.finished ? (
                interview?.success ? (
                  <Trans
                    ns={'profile'}
                    k={'profile_interview_success'}
                  />
                ) : (
                  <Trans
                    ns={'profile'}
                    k={'profile_interview_failed'}
                  />
                )
              ) : (
                <Trans
                  ns={'profile'}
                  k={'profile_interview_in_progress'}
                />
              )}
            </span>
          </div>
        </div>
        <div
          className={
            'border-1 border-main-gray rounded-3xl p-4 flex flex-col justify-end overflow-hidden h-full relative'
          }
        >
          <div className={'flex-grow'} />
          <div
            className={'flex flex-col overflow-y-auto overflow-x-hidden'}
            ref={scrollContainerRef}
          >
            {interview?.messages.map((message) => (
              <MarkdownMessage
                key={message.id}
                className={`lg:max-w-[70%] max-w-[85%] mb-2 ${message.is_human ? 'ml-auto' : 'mr-auto'}`}
                message={message.text}
                isHuman={message.is_human}
              />
            ))}
            {interview?.finished && (
              <div className={'bg-message-gray p-4 rounded-input'}>
                <div className={'text-2xl mb-4'}>
                  <Trans
                    ns={'profile'}
                    k={'profile_interview_history'}
                  />
                </div>
                <div>{interview.recomendations}</div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
          {showScrollToBottom && (
            <div
              className={
                'absolute bottom-1 right-1 p-1 bg-main-blue text-white rounded-full shadow-lg z-50 cursor-pointer bg-main-purple'
              }
              onClick={() => {
                scrollContainerRef.current?.scrollTo({
                  top: scrollContainerRef.current.scrollHeight,
                  behavior: 'smooth',
                });
              }}
            >
              <CustomIcon name={'arrow-down'} />
            </div>
          )}
        </div>
        {!interview?.finished && (
          <UIButton
            className={'mx-auto lg:w-auto w-full max-w-full mt-6'}
            iconAfter={'arrow-top-right'}
            text={'ВОЗОБНОВИТЬ СОБЕСЕДОВАНИЕ'}
            onClick={() => router.push(`/interview/${interview?.id}`)}
          />
        )}
      </div>
    </CustomModal>
  );
};

export default InterviewModal;
