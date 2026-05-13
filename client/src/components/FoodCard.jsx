import { Plus, Star } from 'lucide-react';
import formatCurrency from '../utils/formatCurrency.js';

export default function FoodCard({ item, onAdd }) {
  return (
    <article className="surface grid grid-cols-[96px_1fr] overflow-hidden">
      <img src={item.image || '/images/food.jpg'} alt={item.name} className="h-full min-h-28 w-24 object-cover" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-black text-slate-900 dark:text-white">{item.name}</h4>
            <p className="line-clamp-2 text-sm text-slate-500">{item.description}</p>
          </div>
          <button onClick={() => onAdd(item)} className="rounded-lg bg-orange-600 p-2 text-white hover:bg-orange-700" aria-label={`Add ${item.name}`}>
            <Plus size={18} />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-black text-orange-600">{formatCurrency(item.price)}</span>
          <span className="flex items-center gap-1 text-sm font-bold text-amber-600"><Star size={14} fill="currentColor" /> {item.rating || 4.6}</span>
        </div>
      </div>
    </article>
  );
}
