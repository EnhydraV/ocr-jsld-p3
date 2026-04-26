import { Link } from 'react-router-dom';
import { useAuth } from '../data/auth-context';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className='bg-white shadow-md'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <Link to='/' className='text-2xl font-bold text-primary'>
          ChâTop
        </Link>
        <nav className='flex gap-4'>
          {user ? (
            <>
              <Link to='/' className='text-gray-700 hover:text-primary'>
                Accueil
              </Link>
              <Link to='/profile' className='text-gray-700 hover:text-primary'>
                Profil
              </Link>
              <button
                onClick={logout}
                className='text-gray-700 hover:text-primary'
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='text-gray-700 hover:text-primary'>
                Connexion
              </Link>
              <Link to='/register' className='text-gray-700 hover:text-primary'>
                Inscription
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
