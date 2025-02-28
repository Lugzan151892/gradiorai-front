'use client';
import CustomButton from '@/components/ui/button/CustomButton';
import { useRouter } from 'next/navigation';
import TestsPrepareLayout from './components/TestsPrepareLayout';

const TestsPage = () => {
  const router = useRouter();

  const goToTestGenerate = () => {
    router.push('/tests/generate');
  };

  return (
    <TestsPrepareLayout>
      <div className="h-full w-full flex items-center justify-center flex-grow">
        <CustomButton text="Перейти к тестированию" onClick={goToTestGenerate} />
      </div>
    </TestsPrepareLayout>
  );
};

export default TestsPage;
