import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const customStyle = {
  ...atomDark,
  'pre[class*="language-"]': {
    ...atomDark['pre[class*="language-"]'],
    background: '#2d2d2d',
    padding: '1em',
    borderRadius: '0.5em',
  },
  'code[class*="language-"]': {
    ...atomDark['code[class*="language-"]'],
    fontSize: '0.875rem',
    lineHeight: '1.5',
  },
};

const InterviewMessage: React.FC<{
  message: string;
  isHuman?: boolean;
  className?: string;
}> = ({ message, isHuman, className }) => {
  const dynamicClasses = isHuman ? 'bg-main-gray' : 'bg-main-purple';

  return (
    <div className={`rounded-3xl px-4 py-3 text-left ${dynamicClasses} ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node: _, ...props }) => (
            <h1
              className={'text-2xl font-bold mt-4 mb-2'}
              {...props}
            />
          ),
          h2: ({ node: _, ...props }) => (
            <h2
              className={'text-xl font-semibold mt-4 mb-2'}
              {...props}
            />
          ),
          h3: ({ node: _, ...props }) => (
            <h3
              className={'text-lg font-semibold mt-4 mb-2'}
              {...props}
            />
          ),
          p: ({ node: _, ...props }) => (
            <p
              className={'my-2 leading-relaxed'}
              {...props}
            />
          ),
          ul: ({ node: _, ...props }) => (
            <ul
              className={'list-disc pl-6 my-2'}
              {...props}
            />
          ),
          ol: ({ node: _, ...props }) => (
            <ol
              className={'list-decimal pl-6 my-2'}
              {...props}
            />
          ),
          li: ({ node: _, ...props }) => (
            <li
              className={'mb-1'}
              {...props}
            />
          ),
          blockquote: ({ node: _, ...props }) => (
            <blockquote
              className={'border-l-4 border-gray-400 pl-4 italic text-black my-2'}
              {...props}
            />
          ),

          code({ children, className, ...rest }) {
            const match = /language-(\w+)/.exec(className || '');
            if (match) {
              return (
                // @ts-expect-error tak nado
                <SyntaxHighlighter
                  {...rest}
                  // eslint-disable-next-line react/no-children-prop
                  children={String(children).replace(/\n$/, '')}
                  PreTag={'div'}
                  language={match[1]}
                  style={customStyle}
                />
              );
            }
            return (
              <code
                className={'text-sm px-1 rounded'}
                {...rest}
              >
                {children}
              </code>
            );
          },
          pre: ({ node: _, children, ...rest }) => (
            <pre
              className={'bg-[#2d2d2d] text-white text-sm p-4 rounded-md overflow-x-auto my-2'}
              {...rest}
            >
              {children}
            </pre>
          ),
        }}
      >
        {message}
      </ReactMarkdown>
    </div>
  );
};

export default InterviewMessage;
