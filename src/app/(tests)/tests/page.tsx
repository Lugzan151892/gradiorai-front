'use client';
import CustomButton from '@/components/ui/button/CustomButton';
import { useRouter } from 'next/navigation';

const TestsPage = () => {
  const router = useRouter();

  const goToTestGenerate = () => {
    router.push('/tests/generate'); // Переключение на новую страницу
  };

  return (
    <div className="h-full w-full flex items-center justify-center flex-grow">
      <CustomButton text="Перейти к тестированию" onClick={goToTestGenerate} />
    </div>
  );
};

export default TestsPage;
