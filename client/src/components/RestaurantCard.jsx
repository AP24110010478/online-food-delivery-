import { Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurants/${restaurant._id}`} className="surface group overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
      <img src={restaurant.image || '/images/restaurant.jpg'} alt={restaurant.name} className="h-44 w-full object-cover" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">{restaurant.name}</h3>
            <p className="text-sm text-slate-500">{restaurant.cuisine}</p>
          </div>
          <span className="flex items-center gap-1 rounded-md bg-green-100 px-2 py-1 text-sm font-bold text-green-700"><Star size={14} fill="currentColor" />{restaurant.rating?.toFixed?.(1) || '4.5'}</span>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-slate-600">
          <span>{restaurant.address?.city || 'Nearby'}</span>
          <span className="flex items-center gap-1"><Clock size={15} /> {restaurant.deliveryTime || 30} min</span>
        </div>
      </div>
    </Link>
  );
}
