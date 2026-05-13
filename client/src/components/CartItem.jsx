import { Minus, Plus, Trash2 } from 'lucide-react';
import formatCurrency from '../utils/formatCurrency.js';

export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div className="surface flex items-center gap-4 p-4">
      <img src={item.image || '/images/food.jpg'} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
      <div className="min-w-0 flex-1">
        <h3 className="font-black text-slate-900 dark:text-white">{item.name}</h3>
        <p className="font-bold text-orange-600">{formatCurrency(item.price)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-lg border p-2" onClick={() => onUpdate(item._id, item.quantity - 1)}><Minus size={16} /></button>
        <span className="w-8 text-center font-black">{item.quantity}</span>
        <button className="rounded-lg border p-2" onClick={() => onUpdate(item._id, item.quantity + 1)}><Plus size={16} /></button>
      </div>
      <button className="rounded-lg p-2 text-red-600 hover:bg-red-50" onClick={() => onRemove(item._id)}><Trash2 size={18} /></button>
    </div>
  );
}
