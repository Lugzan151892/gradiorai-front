'use client';

import { useState } from 'react';
import GenerateStep from './components/GenerateStep';

const TestsGenerate = () => {
  const [step, setStep] = useState(1);

  if (step === 1) {
    return (
      <GenerateStep
        title="Первый Шаг"
        description="Выберите специализацию"
        options={[
          {
            id: 1,
            text: 'Front',
          },
          {
            id: 2,
            text: 'Back',
          },
          {
            id: 3,
            text: 'QA',
          },
        ]}
      />
    );
  }
  return (
    <div>
      <div>tut generate</div>
    </div>
  );
};

export default TestsGenerate;
