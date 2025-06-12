'use client';

import UIButton from '@/components/ui/button/UIButton';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store';
import { closeModal, resetModalSettings } from '@/store/tech/techSlice';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { useEffect } from 'react';

const ErrorModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: RootState) => state.tech.mainModal);
  const settings = useAppSelector((state: RootState) => state.tech.mainModalSettings);

  function close() {
    dispatch(closeModal());
  }

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        dispatch(resetModalSettings());
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, dispatch]);

  return (
    <>
      <Dialog
        open={isOpen}
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
                'w-full max-w-md flex flex-col rounded-input bg-modal p-6 border-[3px] min-h-[180px] duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 ' +
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
                <UIButton
                  className={'w-[120px]! mx-auto'}
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
