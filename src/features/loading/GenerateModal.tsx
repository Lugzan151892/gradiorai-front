'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import LoaderComponent from '@/features/loading/components/LoaderComponent';
import { cn } from '@/lib/utils';

interface IGenerateModalProps {
  opened?: boolean;
  text?: string | React.ReactNode;
  onCLose?: () => void;
}

const GenerateModal: React.FC<Readonly<IGenerateModalProps>> = ({ opened, text, onCLose }) => {
  function close() {
    if (onCLose) onCLose();
  }

  return (
    <>
      <Dialog
        open={opened}
        as={'div'}
        className={'relative z-10 focus:outline-none'}
        onClose={close}
      >
        <DialogBackdrop className={'fixed inset-0 bg-black opacity-80'} />
        <div className={'fixed inset-0 z-10 w-screen overflow-y-auto'}>
          <div className={'flex min-h-full items-center justify-center p-4'}>
            <DialogPanel
              transition
              className={cn(
                'w-full max-w-md flex flex-col rounded-3xl bg-black p-6 border-1 border-white min-h-[180px]', 
                'duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0'
              )}
            >
              <div className={'grid grid-cols-[40px_1fr_40px] gap-3 items-center justify-items-center'}>
                <div />
                <DialogTitle
                  as={'h3'}
                  className={'text-base font-medium text-white text-center'}
                >
                  {text}
                </DialogTitle>
              </div>
              <div className={'mt-auto mx-auto flex'}>
                <LoaderComponent />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default GenerateModal;
