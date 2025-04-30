'use client';

import { ReactNode } from 'react';
import Loader from './Loader';

type Props = {
  isLoading: boolean;
  children: ReactNode;
};

export default function LoadingWrapper({ isLoading, children }: Props) {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}