'use client';
import React from 'react';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const routeChecker = (WrappedComponent: React.ComponentType, type: 'authOnly' | 'guestOnly' | 'adminOnly') => {
  return function ProtectedRoute(props: any) {
    const { user, unAuth } = useSelector((state: RootState) => state.user);
    const router = useRouter();

    useEffect(() => {
      if (unAuth && (type === 'authOnly' || type === 'adminOnly')) {
        router.push('/login');
      } else if (user && !user.admin && (type === 'guestOnly' || type === 'adminOnly')) {
        if (window.history.length > 2) {
          router.back();
        } else {
          router.push('/');
        }
      }
    }, [user, unAuth, router]);

    return <WrappedComponent {...props} />;
  };
};

export default routeChecker;
