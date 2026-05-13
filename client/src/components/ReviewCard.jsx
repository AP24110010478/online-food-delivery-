import { Star } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <article className="surface p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-black">{review.user?.name || 'Customer'}</h4>
        <span className="flex items-center gap-1 font-bold text-amber-600"><Star size={16} fill="currentColor" /> {review.rating}</span>
      </div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{review.comment}</p>
    </article>
  );
}
