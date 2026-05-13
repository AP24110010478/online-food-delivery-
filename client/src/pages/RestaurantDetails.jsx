import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import FoodCard from '../components/FoodCard.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import { addToCart } from '../redux/cartSlice.js';
import { fetchRestaurant } from '../redux/restaurantSlice.js';
import { createReview, fetchReviews } from '../redux/reviewSlice.js';

export default function RestaurantDetails() {
  const { id } = useParams();
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const { selected, loading } = useSelector((state) => state.restaurants);
  const { items: reviews } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurant(id));
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  // Show loading if restaurant hasn't loaded yet OR if it's a different restaurant
  if (loading || !selected || selected._id !== id)
    return <div className="container-page py-10 text-slate-500">Loading restaurant...</div>;

  const submitReview = async (event) => {
    event.preventDefault();
    if (!review.comment.trim()) return toast.error('Comment is required');
    const result = await dispatch(createReview({ ...review, restaurant: id }));
    if (result.meta.requestStatus === 'fulfilled') {
      setReview({ rating: 5, comment: '' });
      toast.success('Review posted');
    } else toast.error(result.payload);
  };

  return (
    <div className="container-page py-10">
      <div className="surface overflow-hidden">
        <img src={selected.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80'} alt={selected.name} className="h-72 w-full object-cover" />
        <div className="p-6"><h1 className="text-4xl font-black">{selected.name}</h1><p className="text-slate-500">{selected.cuisine} · {selected.address?.city}</p></div>
      </div>
      <h2 className="mt-8 text-2xl font-black">Menu</h2>
      {(selected.menu || []).length === 0 && <p className="mt-4 text-slate-500">No menu items yet.</p>}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {(selected.menu || []).map((item) => <FoodCard key={item._id} item={item} onAdd={(food) => dispatch(addToCart({ item: food, restaurant: selected }))} />)}
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {reviews.length === 0 && <p className="text-slate-500">No reviews yet. Be the first!</p>}
          {reviews.map((entry) => <ReviewCard key={entry._id} review={entry} />)}
        </div>
        <form onSubmit={submitReview} className="surface space-y-3 p-4">
          <h3 className="text-xl font-black">Leave a review</h3>
          <select className="input" value={review.rating} onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}>{[5, 4, 3, 2, 1].map((v) => <option key={v}>{v}</option>)}</select>
          <textarea className="input min-h-28" placeholder="How was it?" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} />
          <button className="btn-primary w-full">Post review</button>
        </form>
      </div>
    </div>
  );
}
