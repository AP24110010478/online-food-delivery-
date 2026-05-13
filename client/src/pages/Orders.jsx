import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderStatus from '../components/OrderStatus.jsx';
import { fetchOrders } from '../redux/orderSlice.js';
import formatCurrency from '../utils/formatCurrency.js';

export default function Orders() {
  const { items, loading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

  return (
    <div className="container-page py-10">
      <h1 className="mb-5 text-4xl font-black">Orders</h1>
      {loading ? <p>Loading...</p> : <div className="space-y-4">{items.map((order) => (
        <Link key={order._id} to={`/orders/${order._id}`} className="surface block p-5">
          <div className="mb-4 flex flex-wrap justify-between gap-3"><h2 className="font-black">{order.restaurant?.name || 'Restaurant'}</h2><span className="font-black text-orange-600">{formatCurrency(order.total)}</span></div>
          <OrderStatus status={order.status} />
        </Link>
      ))}</div>}
    </div>
  );
}
