import AppHeader from '@/components/header/AppHeader';

const Home = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AppHeader />
      <main className="flex flex-col h-full w-full">{children}</main>
    </>
  );
};

export default Home;
