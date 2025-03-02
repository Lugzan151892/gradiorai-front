'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import styles from './styles/GlobalBusy.module.css';

const GlobalLoader = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div
      className={
        'fixed inset-0 w-full h-full flex items-center justify-center z-50'
      }
    >
      <div
        className={
          'fixed inset-0 w-full bg-fixed h-full bg-black opacity-40 z-50'
        }
      />
      <div
        className={
          'fixed inset-0 w-full bg-fixed h-full flex items-center justify-center z-50 ' +
          styles.loader
        }
      />
    </div>
  );
};

export default GlobalLoader;
