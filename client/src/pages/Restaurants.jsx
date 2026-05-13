import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RestaurantCard from '../components/RestaurantCard.jsx';
import { fetchRestaurants } from '../redux/restaurantSlice.js';

export default function Restaurants() {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { items, loading, error } = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();

  // Debounce: wait 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => { dispatch(fetchRestaurants({ search: debouncedQuery, cuisine })); }, [dispatch, debouncedQuery, cuisine]);

  return (
    <div className="container-page py-10">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><h1 className="text-4xl font-black">Restaurants</h1><p className="text-slate-500">Search meals, cuisines, and trusted kitchens.</p></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="input" placeholder="Search restaurant or food" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select className="input" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
            <option value="">All cuisines</option><option>Indian</option><option>Italian</option><option>Chinese</option><option>Healthy</option><option>Dessert</option>
          </select>
        </div>
      </div>
      {error && <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}
      {loading ? <div className="grid gap-5 md:grid-cols-3">{[1, 2, 3].map((i) => <div key={i} className="h-72 animate-pulse rounded-lg bg-orange-100" />)}</div> :
        items.length === 0 ? <p className="text-center text-slate-500 py-10">No restaurants found.</p> :
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map((restaurant) => <RestaurantCard key={restaurant._id} restaurant={restaurant} />)}</div>}
    </div>
  );
}
