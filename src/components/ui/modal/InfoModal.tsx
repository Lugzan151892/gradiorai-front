'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';

interface IInfoModalProps {
  opened?: boolean;
  text?: string;
  onClose?: () => void;
  children?: React.ReactNode;
}

const InfoModal: React.FC<Readonly<IInfoModalProps>> = ({ opened, text, children, onClose }) => {
  const close = () => {
    if (onClose) {
      onClose();
    }
  };
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
              className={
                'w-full max-w-md flex flex-col rounded-input bg-modal py-3 px-7 border-[3px] border-white min-h-[180px] duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
              }
            >
              <div className={'grid gap-3 items-center justify-items-center'}>
                <DialogTitle
                  as={'h3'}
                  className={'text-xl font-medium text-white text-center'}
                >
                  {text}
                </DialogTitle>
              </div>
              <div className={'mt-auto flex'}>{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default InfoModal;
