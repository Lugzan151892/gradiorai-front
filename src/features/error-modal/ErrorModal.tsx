'use client';

import AuthConfirmButton from '@/app/(views)/(auth)/components/AuthConfirmButton';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store';
import { closeModal } from '@/store/tech/techSlice';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';

const ErrorModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: RootState) => state.tech.mainModal);
  const settings = useAppSelector((state: RootState) => state.tech.mainModalSettings);

  function close() {
    dispatch(closeModal());
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as={'div'}
        className={'relative z-10 focus:outline-none'}
        onClose={close}
      >
        <DialogBackdrop className={'fixed inset-0 bg-black opacity-30'} />
        <div className={'fixed inset-0 z-10 w-screen overflow-y-auto'}>
          <div className={'flex min-h-full items-center justify-center p-4'}>
            <DialogPanel
              transition
              className={
                'w-full max-w-md flex flex-col rounded-input bg-transparent p-6 border-[3px] min-h-[180px] backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 ' +
                `border-${settings.type === 'error' ? 'error' : 'white'}`
              }
            >
              <div className={'grid grid-cols-[40px_1fr_40px] gap-3 items-center justify-items-center'}>
                <div />
                <DialogTitle
                  as={'h3'}
                  className={'text-xl font-medium text-white text-center'}
                >
                  {settings.text}
                </DialogTitle>
              </div>
              <div className={'mt-auto flex'}>
                <AuthConfirmButton
                  className={'!w-[120px] mx-auto'}
                  customBorder
                  size={24}
                  type={settings.type === 'error' ? 'error' : 'default'}
                  icon={'check'}
                  text={'OK'}
                  onClick={close}
                />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ErrorModal;
