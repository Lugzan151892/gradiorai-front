import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onlyGuest?: boolean; // true — если страница доступна только неавторизованным
}

const ProtectedRoute = ({
  children,
  onlyGuest = false,
}: ProtectedRouteProps) => {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [prevPath, setPrevPath] = useState<string | null>(null);

  useEffect(() => {
    // Запоминаем предыдущий путь для редиректа
    if (typeof window !== 'undefined') {
      setPrevPath(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user && !onlyGuest) {
        // Если пользователь не авторизован, но страница требует авторизации → редирект
        router.push(prevPath || '/login');
      } else if (user && onlyGuest) {
        // Если пользователь авторизован, а страница только для гостей → редирект
        router.push(prevPath || '/');
      }
    }
  }, [user, loading, onlyGuest, router, prevPath]);

  if (loading) return <p>Загрузка...</p>; // Пока Redux загружает пользователя
  return <>{children}</>;
};

export default ProtectedRoute;
