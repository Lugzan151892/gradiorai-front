import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const customStyle = {
  ...atomDark,
  'pre[class*="language-"]': {
    ...atomDark['pre[class*="language-"]'],
    background: '#2d2d2d', // Меньше контраст
    padding: '1em',
    borderRadius: '0.5em',
  },
  'code[class*="language-"]': {
    ...atomDark['code[class*="language-"]'],
    fontSize: '0.875rem',
    lineHeight: '1.5',
  },
};

const InterviewMessage: React.FC<
  Readonly<{
    message: string;
    isHuman?: boolean;
    className?: string;
  }>
> = ({ message, isHuman, className }) => {
  const dynamicClasses = isHuman ? 'bg-message-blue' : 'bg-message-gray';

  return (
    <div className={`rounded-input p-4 whitespace-pre-wrap ${dynamicClasses} ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, node: _, ref: __, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                {...rest}
                // eslint-disable-next-line react/no-children-prop
                children={String(children).replace(/\n$/, '')}
                PreTag={'div'}
                language={match[1] || undefined}
                style={customStyle}
              />
            ) : (
              <code
                {...rest}
                className={className}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {message}
      </ReactMarkdown>
    </div>
  );
};

export default InterviewMessage;
