import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import { cn } from '@/lib/utils';

interface ICustomModalProps {
  open?: boolean;
  caption?: string | React.ReactNode;
  header?: Readonly<React.ReactNode>;
  children?: Readonly<React.ReactNode>;
  footer?: Readonly<React.ReactNode>;
  fullScreen?: boolean;
  type?: 'success' | 'error' | 'warning';
  onClose?: (vaL: boolean) => void;
  className?: string;
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
  className,
}) => {
  const typeColor = () => {
    switch (type) {
      case 'success':
      case 'error':
      case 'warning':
        return type;
      default:
        return 'main-gray';
    }
  };
  const widthClasses = fullScreen ? 'w-full h-full' : 'w-auto';

  return (
    <>
      <Dialog
        open={open}
        as={'div'}
        className={'relative z-10 focus:outline-none'}
        onClose={() => {
          if (onClose) onClose(open);
        }}
      >
        <DialogBackdrop className={'fixed inset-0 bg-black opacity-80'} />
        <div className={'fixed inset-0 z-10 w-screen overflow-y-auto'}>
          <div className={'flex h-full items-center justify-center p-4 overflow-hidden'}>
            <DialogPanel
              transition
              className={cn(
                'rounded-3xl bg-black border-1 text-white flex flex-col duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 overflow-hidden',
                `border-${typeColor()}`,
                widthClasses,
                className
              )}
            >
              {header || (
                <div
                  className={cn(
                    'grid grid-cols-[40px_1fr_40px] items-center py-2 px-4 justify-items-center border-b',
                    `border-${typeColor()} `
                  )}
                >
                  <DialogTitle
                    as={'h3'}
                    className={'lg:text-2xl text-center text-xl lg:p-auto px-2 py-2 font-medium col-start-2 col-end-3'}
                  >
                    {caption}
                  </DialogTitle>
                  <CustomIcon
                    color={'var(--main-white)'}
                    name={'cross'}
                    className={'cursor-pointer col-start-3 col-end-4'}
                    onClick={onClose ? () => onClose(false) : undefined}
                  />
                </div>
              )}
              <div className={'overflow-y-auto overflow-x-hidden'}>{children}</div>
              {footer || null}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CustomModal;
