import { ReactNode } from 'react';
import TopHeader from '@/components/layout/TopHeader';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
