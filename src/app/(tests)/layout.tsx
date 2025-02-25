import AppHeader from '@/components/header/AppHeader';

const TestsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-1 grid-rows-layout h-full">
      <AppHeader />
      <div className="h-full flex flex-grow w-full">
        <div className="my-11 mx-6 rounded-lg bg-main-blue w-full p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TestsLayout;
