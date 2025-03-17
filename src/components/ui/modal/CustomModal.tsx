import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import CustomIcon from '@/components/ui/icon/CustomIcon';

interface ICustomModalProps {
  open?: boolean;
  caption?: string;
  header?: Readonly<React.ReactNode>;
  children?: Readonly<React.ReactNode>;
  footer?: Readonly<React.ReactNode>;
  fullScreen?: boolean;
  type?: 'success' | 'error' | 'warning';
  onClose?: (vaL: boolean) => void;
}

const CustomModal: React.FC<ICustomModalProps> = ({
  open = false,
  type,
  caption,
  header,
  children,
  footer,
  fullScreen,
  onClose,
}) => {
  const typeColor = () => {
    switch (type) {
      case 'success':
      case 'error':
      case 'warning':
        return type;
      default:
        return 'main-blue';
    }
  };
  const widthClasses = fullScreen ? 'w-full h-full' : 'w-full max-w-md';

  return (
    <>
      <Dialog
        open={open}
        as={'div'}
        className={'relative z-10 focus:outline-none'}
        onClose={onClose || close}
      >
        <DialogBackdrop className={'fixed inset-0 bg-black opacity-30'} />
        <div className={'fixed inset-0 z-10 w-screen overflow-y-auto'}>
          <div className={'flex h-full items-center justify-center p-4'}>
            <DialogPanel
              transition
              className={
                'rounded-xl bg-white p-6 border-2 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 ' +
                `border-${typeColor()} ` +
                widthClasses
              }
            >
              {header || (
                <div className={'grid grid-cols-[1fr_40px] items-center justify-items-center mb-5'}>
                  <DialogTitle
                    as={'h3'}
                    className={'text-2xl font-medium text-black'}
                  >
                    {caption}
                  </DialogTitle>
                  <CustomIcon
                    color={'var(--main-black)'}
                    name={'cross'}
                    className={'cursor-pointer'}
                    onClick={onClose ? () => onClose(false) : undefined}
                  />
                </div>
              )}
              <div>{children}</div>
              {footer || null}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CustomModal;
