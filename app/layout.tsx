import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BottomNav from './components/BottomNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
