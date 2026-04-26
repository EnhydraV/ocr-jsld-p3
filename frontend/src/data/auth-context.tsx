import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { User } from '../types/api';

interface AuthContextValues {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  register: ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => void;
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
  isLoading: boolean;
  error: string;
}

const AuthContext = React.createContext<AuthContextValues | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User>();
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setUser(undefined);
    navigate('/login');
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setError('');
    setIsLoading(true);

    try {
      const authResponse = await authAPI.login({ email, password });
      localStorage.setItem('token', authResponse.token);
      const userResponse = await authAPI.getCurrentUser();
      setUser(userResponse);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    setError('');
    setIsLoading(true);

    try {
      const authResponse = await authAPI.register({ name, email, password });
      localStorage.setItem('token', authResponse.token);
      const userResponse = await authAPI.getCurrentUser();
      setUser(userResponse);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authAPI
        .getCurrentUser()
        .then((user) => {
          setUser(user);
          navigate('/');
        })
        .catch(() => logout())
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, register, login, logout, isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within <AuthProvider>');
  }

  return context;
};
