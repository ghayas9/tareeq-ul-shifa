import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/redux/store/store';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  useEffect(() => {
    const isAdminRoute = router.pathname.startsWith('/admin');

    if (isAdminRoute && (!isAuthenticated || user?.role !== 'admin')) {
      router.push('/login');
    }
  }, [router.pathname, isAuthenticated, user]);

  return <>{children}</>;
}