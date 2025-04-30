'use client';

import { ReactNode } from 'react';
import Loader from './Loader';

type Props = {
  isLoading: boolean;
  children: ReactNode;
};

export default function LoadingWrapper({ isLoading, children }: Props) {
  return (
    <>
      {/* контент всегда в DOM */}
      {children}

      {/* затемнённая шторка + лоадер поверх */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-300">
          <Loader />
        </div>
      )}
    </>
  );
}