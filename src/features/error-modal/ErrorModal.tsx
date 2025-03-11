'use client';

import CustomButton from '@/components/ui/button/CustomButton';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store';
import { closeModal } from '@/store/tech/techSlice';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import React from 'react';

const ErrorModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: RootState) => state.tech.mainModal);
  const settings = useAppSelector(
    (state: RootState) => state.tech.mainModalSettings
  );

  function close() {
    dispatch(closeModal());
  }

  const statusIcons = () => {
    if (settings.type === 'success') {
      return (
        <div
          className={
            'w-10 h-10 bg-success shadow-lg rounded-full flex items-center justify-center'
          }
        >
          <span className={'text-white text-xl font-bold'}>✔</span>
        </div>
      );
    }

    if (settings.type === 'warning') {
      return (
        <div
          className={
            'w-10 h-10 bg-warning shadow-lg rounded-full flex items-center justify-center'
          }
        >
          <span className={'text-white text-xl font-bold'}>!</span>
        </div>
      );
    }

    if (settings.type === 'error') {
      return (
        <div
          className={
            'w-10 h-10 bg-error shadow-lg rounded-full flex items-center justify-center'
          }
        >
          <span className={'text-white text-xl font-bold'}>X</span>
        </div>
      );
    }
  };

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
                'w-full max-w-md rounded-xl bg-white p-6 border-2 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 ' +
                `border-${settings.type}`
              }
            >
              <div
                className={
                  'grid grid-cols-[40px_1fr_40px] gap-3 items-center justify-items-center'
                }
              >
                {statusIcons()}
                <DialogTitle
                  as={'h3'}
                  className={'text-xl font-medium text-black text-center'}
                >
                  {settings.text}
                </DialogTitle>
              </div>
              <div className={'mt-6 flex'}>
                <CustomButton
                  className={'mx-auto'}
                  type={settings.type}
                  text={'OK'}
                  fullWidth={false}
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
