import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { clearCart } from '../redux/cartSlice.js';
import { createOrder } from '../redux/orderSlice.js';
import calculateTotal from '../utils/calculateTotal.js';
import formatCurrency from '../utils/formatCurrency.js';
import { validateCheckout } from '../utils/validateForm.js';

export default function Checkout() {
  const { items, restaurant } = useSelector((state) => state.cart);
  const [form, setForm] = useState({ address: { street: '', city: '', phone: '' }, paymentMethod: 'stripe_mock' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totals = calculateTotal(items);

  const submit = async (event) => {
    event.preventDefault();
    const errors = validateCheckout(form);
    if (Object.keys(errors).length) return toast.error(Object.values(errors)[0]);
    const result = await dispatch(createOrder({ restaurant: restaurant?._id, items: items.map(({ _id, quantity }) => ({ menuItem: _id, quantity })), ...form }));
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(clearCart());
      toast.success('Order placed');
      navigate(`/orders/${result.payload.order._id}`);
    } else toast.error(result.payload);
  };

  return (
    <form onSubmit={submit} className="container-page grid gap-6 py-10 lg:grid-cols-[1fr_360px]">
      <section className="surface space-y-4 p-6">
        <h1 className="text-3xl font-black">Checkout</h1>
        <input className="input" placeholder="Street address" value={form.address.street} onChange={(e) => setForm({ ...form, address: { ...form.address, street: e.target.value } })} />
        <input className="input" placeholder="City" value={form.address.city} onChange={(e) => setForm({ ...form, address: { ...form.address, city: e.target.value } })} />
        <input className="input" placeholder="Phone" value={form.address.phone} onChange={(e) => setForm({ ...form, address: { ...form.address, phone: e.target.value } })} />
        <select className="input" value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}><option value="stripe_mock">Stripe mock</option><option value="razorpay_mock">Razorpay mock</option><option value="cash">Cash on delivery</option></select>
      </section>
      <aside className="surface h-max space-y-3 p-5">
        <h2 className="text-2xl font-black">Pay {formatCurrency(totals.total)}</h2>
        <button className="btn-primary w-full" disabled={!items.length}>Place order</button>
      </aside>
    </form>
  );
}
