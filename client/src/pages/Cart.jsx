import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem.jsx';
import { removeFromCart, updateQuantity } from '../redux/cartSlice.js';
import calculateTotal from '../utils/calculateTotal.js';
import formatCurrency from '../utils/formatCurrency.js';

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totals = calculateTotal(items);

  return (
    <div className="container-page grid gap-6 py-10 lg:grid-cols-[1fr_360px]">
      <section>
        <h1 className="mb-5 text-4xl font-black">Cart</h1>
        <div className="space-y-3">{items.length ? items.map((item) => <CartItem key={item._id} item={item} onUpdate={(id, quantity) => quantity < 1 ? dispatch(removeFromCart(id)) : dispatch(updateQuantity({ id, quantity }))} onRemove={(id) => dispatch(removeFromCart(id))} />) : <p className="surface p-6">Your cart is empty.</p>}</div>
      </section>
      <aside className="surface h-max space-y-3 p-5">
        <h2 className="text-2xl font-black">Summary</h2>
        <Row label="Subtotal" value={totals.subtotal} /><Row label="Tax" value={totals.tax} /><Row label="Delivery" value={totals.deliveryFee} />
        <div className="border-t pt-3"><Row label="Total" value={totals.total} bold /></div>
        <Link className={`btn-primary block text-center ${!items.length ? 'pointer-events-none opacity-50' : ''}`} to="/checkout">Checkout</Link>
      </aside>
    </div>
  );
}

function Row({ label, value, bold }) {
  return <div className={`flex justify-between ${bold ? 'text-xl font-black' : 'font-semibold'}`}><span>{label}</span><span>{formatCurrency(value)}</span></div>;
}
