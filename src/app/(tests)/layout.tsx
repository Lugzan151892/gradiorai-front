import AppHeader from '@/components/header/AppHeader';

const TestsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-1 grid-rows-layout h-full">
      <AppHeader />
      {children}
    </div>
  );
};

export default TestsLayout;
