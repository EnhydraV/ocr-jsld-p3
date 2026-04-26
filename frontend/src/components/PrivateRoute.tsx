import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../data/auth-context';

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
}
