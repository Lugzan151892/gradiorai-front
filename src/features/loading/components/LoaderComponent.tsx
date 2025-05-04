import React from 'react';
import styles from '../styles/GlobalBusy.module.css';

const LoaderComponent = () => {
  return (
    <div className={'fixed inset-0 w-full bg-fixed h-full flex items-center justify-center z-50 ' + styles.loader} />
  );
};

export default LoaderComponent;
