import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderStatus from '../components/OrderStatus.jsx';
import { orderService } from '../services/orderService.js';
import formatCurrency from '../utils/formatCurrency.js';

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => { orderService.get(id).then((data) => setOrder(data.order)); }, [id]);
  if (!order) return <div className="container-page py-10">Loading order...</div>;

  return (
    <div className="container-page py-10">
      <div className="surface p-6">
        <div className="flex flex-wrap justify-between gap-3"><h1 className="text-3xl font-black">Order #{order._id.slice(-6)}</h1><span className="text-2xl font-black text-orange-600">{formatCurrency(order.total)}</span></div>
        <div className="mt-6"><OrderStatus status={order.status} /></div>
        <div className="mt-6 grid gap-3">{order.items.map((item) => <div key={item.menuItem?._id || item._id} className="flex justify-between border-b pb-2"><span>{item.menuItem?.name}</span><span>x{item.quantity}</span></div>)}</div>
      </div>
    </div>
  );
}
