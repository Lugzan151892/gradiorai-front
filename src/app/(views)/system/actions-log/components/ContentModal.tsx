import CustomModal from '@/components/ui/modal/CustomModal';
import React from 'react';
import MarkdownMessage from '@/components/markdown-message/MarkdownMessage';
import { EGPT_SETTINGS_TYPE } from '@/core/interfaces/enums';

interface IContentModalProps {
  open?: boolean;
  onClose?: () => void;
  content: string;
  type: EGPT_SETTINGS_TYPE;
}

const ContentModal: React.FC<IContentModalProps> = ({ open = false, onClose, content, type }) => {
  const getContentByType = () => {
    if (!content) {
      return;
    }

    if (type === EGPT_SETTINGS_TYPE.TEST) {
      const jsonString = `\`\`\`json
      ${JSON.stringify(JSON.parse(content), null, 2)}
      `;

      return jsonString;
    }

    const data: { user_message: string; resume_result: string } = JSON.parse(content);

    return {
      user_message: `\`\`\`json
      ${data.user_message}
      `,
      resume_result: `\`\`\`json
      ${data.resume_result}
      `,
    };
  };
  return (
    <CustomModal
      fullScreen
      open={open}
      caption={'Данные о активности'}
      onClose={onClose}
    >
      <div className={'p-4'}>
        {type === EGPT_SETTINGS_TYPE.TEST ? (
          <MarkdownMessage message={getContentByType() as string} />
        ) : (
          <div className={'text-xl'}>
            <div className={'mb-2'}>Сообщение пользователя:</div>
            <MarkdownMessage
              message={((getContentByType() as { user_message: string })?.user_message as string) || ''}
            />
            <div className={'my-2'}>Результат генерации:</div>
            <MarkdownMessage message={(getContentByType() as { resume_result: string })?.resume_result || ''} />
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default ContentModal;
