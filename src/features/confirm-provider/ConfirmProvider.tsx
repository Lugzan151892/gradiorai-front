// context/ConfirmContext.tsx
import React, { createContext, useCallback, useContext, useState } from 'react';
import CustomModal from '@/components/ui/modal/CustomModal';
import { cn } from '@/lib/utils';

type ConfirmButton = {
  key: string;
  label: string | React.ReactNode;
  type?: 'default' | 'danger';
};

type ConfirmOptions = {
  caption?: string | React.ReactNode;
  content?: React.ReactNode;
  buttons: ConfirmButton[];
  type?: 'success' | 'error' | 'warning';
};

type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => Promise<string>;
};

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalState, setModalState] = useState<{
    options: ConfirmOptions;
    resolve: (key: string) => void;
  } | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<string>((resolve) => {
      setModalState({ options, resolve });
    });
  }, []);

  const handleClose = (key: string) => {
    if (modalState) {
      modalState.resolve(key);
      setModalState(null);
    }
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {modalState && (
        <CustomModal
          className={'max-w-md'}
          open
          caption={modalState.options.caption}
          type={modalState.options.type}
          onClose={() => handleClose('cancel')}
          footer={
            <div className={'flex justify-end gap-2 p-4'}>
              {modalState.options.buttons.map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => handleClose(btn.key)}
                  className={cn(
                    'px-4 py-2 rounded cursor-pointer',
                    btn.type === 'danger' ? 'bg-red-600 text-white' : 'bg-gray-300 text-black'
                  )}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          }
        >
          <div className={'p-4 text-xl text-center max-w-md'}>{modalState.options.content}</div>
        </CustomModal>
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error('useConfirm must be used within ConfirmProvider');
  return context.confirm;
};
