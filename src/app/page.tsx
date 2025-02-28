import AppHeader from '@/components/header/AppHeader';

const Home = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AppHeader />
      <main className="flex flex-col w-full">{children}</main>
    </>
  );
};

export default Home;
