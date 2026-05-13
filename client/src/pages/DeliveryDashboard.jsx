import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { orderService } from '../services/orderService.js';

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.assigned()
      .then((data) => setOrders(data.orders || []))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  const update = async (id, status) => {
    try {
      const data = await orderService.updateStatus(id, status);
      setOrders((items) => items.map((order) => order._id === id ? data.order : order));
      toast.success('Delivery updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update order');
    }
  };

  return (
    <div className="container-page py-10">
      <h1 className="mb-6 text-4xl font-black">Delivery Dashboard</h1>
      {loading ? <p className="text-slate-500">Loading orders...</p> :
        orders.length === 0 ? <p className="text-slate-500">No assigned orders yet.</p> :
        <div className="grid gap-4">
          {orders.map((order) => {
            const canAct = ['preparing', 'out_for_delivery'].includes(order.status);
            const nextStatus = order.status === 'out_for_delivery' ? 'delivered' : 'out_for_delivery';
            const btnLabel = order.status === 'out_for_delivery' ? 'Mark delivered' : 'Start delivery';
            return (
              <div key={order._id} className="surface flex flex-wrap items-center justify-between gap-4 p-5">
                <div>
                  <h2 className="font-black">{order.restaurant?.name}</h2>
                  <p className="text-sm text-slate-500 capitalize">{order.status.replaceAll('_', ' ')}</p>
                  <p>{order.address?.street}, {order.address?.city}</p>
                </div>
                {canAct && (
                  <button className="btn-primary" onClick={() => update(order._id, nextStatus)}>{btnLabel}</button>
                )}
              </div>
            );
          })}
        </div>}
    </div>
  );
}
