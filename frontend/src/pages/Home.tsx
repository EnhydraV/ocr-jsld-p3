import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { rentalsAPI } from '../services/api';
import RentalCard from '../components/RentalCard';

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['rentals'],
    queryFn: rentalsAPI.getAll,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600">Erreur lors du chargement des locations</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Locations disponibles</h1>
        <Link
          to="/rentals/new"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Ajouter une location
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.rentals.map((rental) => (
          <RentalCard key={rental.id} rental={rental} />
        ))}
      </div>

      {data?.rentals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Aucune location disponible pour le moment</p>
        </div>
      )}
    </div>
  );
}
