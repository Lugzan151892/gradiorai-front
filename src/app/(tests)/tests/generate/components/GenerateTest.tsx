import React from 'react';

const GenerateTest: React.FC<{
  tests: Array<{
    question: string;
    responses: Array<{ answer: string; correct: boolean }>;
  }>;
}> = () => {
  return (
    <div>
      <div>tut test</div>
    </div>
  );
};

export default GenerateTest;
