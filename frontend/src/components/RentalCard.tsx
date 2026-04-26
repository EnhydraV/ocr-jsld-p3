import { Link } from 'react-router-dom';
import type { Rental } from '../types/api';

interface RentalCardProps {
  rental: Rental;
}

export default function RentalCard({ rental }: RentalCardProps) {
  return (
    <Link
      to={`/rental/${rental.id}`}
      className='block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white'
    >
      <div className='relative h-48'>
        <img
          src={rental.picture}
          alt={rental.name}
          className='w-full h-full object-cover'
        />
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4'>
          <h3 className='text-white font-semibold text-lg'>{rental.name}</h3>
        </div>
      </div>
      <div className='p-4'>
        <div className='flex justify-between items-center text-sm text-gray-600'>
          <span>{rental.surface} m²</span>
          <span className='font-bold text-primary'>
            {rental.price} € / mois
          </span>
        </div>
      </div>
    </Link>
  );
}
