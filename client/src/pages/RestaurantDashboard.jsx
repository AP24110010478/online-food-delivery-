import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { orderService } from '../services/orderService.js';
import { restaurantService } from '../services/restaurantService.js';

export default function RestaurantDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ name: '', cuisine: 'Indian', description: '', address: { city: '' } });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    restaurantService.list({ mine: true }).then((data) => setRestaurants(data.restaurants || []));
    orderService.list().then((data) => setOrders(data.orders || []));
  }, []);

  const create = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) return toast.error('Restaurant name is required');
    if (!form.cuisine.trim()) return toast.error('Cuisine is required');
    setSaving(true);
    try {
      const data = await restaurantService.create(form);
      setRestaurants((items) => [data.restaurant, ...items]);
      setForm({ name: '', cuisine: 'Indian', description: '', address: { city: '' } });
      toast.success('Restaurant saved');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save restaurant');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-page grid gap-6 py-10 lg:grid-cols-[380px_1fr]">
      <form onSubmit={create} className="surface h-max space-y-3 p-5">
        <h1 className="text-2xl font-black">Restaurant Dashboard</h1>
        <input className="input" placeholder="Restaurant name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="Cuisine *" value={form.cuisine} onChange={(e) => setForm({ ...form, cuisine: e.target.value })} />
        <input className="input" placeholder="City" value={form.address.city} onChange={(e) => setForm({ ...form, address: { ...form.address, city: e.target.value } })} />
        <textarea className="input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="btn-primary w-full" disabled={saving}>{saving ? 'Saving...' : 'Save restaurant'}</button>
      </form>
      <div className="grid gap-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-black">Incoming orders</h2>
          {orders.length === 0 && <p className="text-slate-500">No orders yet.</p>}
          {orders.map((order) => <OwnerOrder key={order._id} order={order} onUpdate={(next) => setOrders((items) => items.map((entry) => entry._id === next._id ? next : entry))} />)}
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-black">Menu management</h2>
          {restaurants.length === 0 && <p className="text-slate-500">No restaurants yet. Create one above.</p>}
          {restaurants.map((restaurant) => <RestaurantAdminCard key={restaurant._id} restaurant={restaurant} />)}
        </section>
      </div>
    </div>
  );
}

function OwnerOrder({ order, onUpdate }) {
  const statusMap = { placed: 'accepted', accepted: 'preparing', preparing: 'out_for_delivery' };
  const next = statusMap[order.status];
  const update = async () => {
    try {
      const data = await orderService.updateStatus(order._id, next);
      onUpdate(data.order);
      toast.success('Order updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update order');
    }
  };
  return (
    <div className="surface flex flex-wrap items-center justify-between gap-4 p-5">
      <div>
        <h3 className="font-black">{order.customer?.name || 'Customer'} · {order.restaurant?.name}</h3>
        <p className="capitalize text-slate-500">{order.status.replaceAll('_', ' ')}</p>
      </div>
      {next && <button className="btn-primary" onClick={update}>{next.replaceAll('_', ' ')}</button>}
    </div>
  );
}

function RestaurantAdminCard({ restaurant }) {
  const [item, setItem] = useState({ name: '', price: '', category: 'Main', description: '' });
  const [adding, setAdding] = useState(false);
  const add = async (event) => {
    event.preventDefault();
    if (!item.name.trim()) return toast.error('Food name is required');
    if (!item.price || isNaN(Number(item.price)) || Number(item.price) <= 0) return toast.error('Valid price is required');
    setAdding(true);
    try {
      await restaurantService.addMenuItem(restaurant._id, { ...item, price: Number(item.price) });
      toast.success('Menu item added');
      setItem({ name: '', price: '', category: 'Main', description: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add menu item');
    } finally {
      setAdding(false);
    }
  };
  return (
    <div className="surface p-5">
      <h2 className="text-xl font-black">{restaurant.name}</h2>
      <form onSubmit={add} className="mt-4 grid gap-3 md:grid-cols-5">
        <input className="input" placeholder="Food name *" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} />
        <input className="input" placeholder="Price *" type="number" min="0" step="0.01" value={item.price} onChange={(e) => setItem({ ...item, price: e.target.value })} />
        <input className="input" placeholder="Category" value={item.category} onChange={(e) => setItem({ ...item, category: e.target.value })} />
        <input className="input" placeholder="Description" value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} />
        <button className="btn-primary" disabled={adding}>{adding ? 'Adding...' : 'Add food'}</button>
      </form>
    </div>
  );
}
