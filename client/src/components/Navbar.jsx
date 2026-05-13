import { Moon, ShoppingCart, Sun, UserRound, Utensils } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice.js';

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const count = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDark = () => {
    document.body.classList.toggle('dark');
    setDark((value) => !value);
  };

  const signOut = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-black text-orange-600">
          <Utensils size={28} /> QuickBite
        </Link>
        <div className="hidden items-center gap-6 font-semibold text-slate-700 md:flex dark:text-slate-100">
          <NavLink to="/restaurants">Restaurants</NavLink>
          {user && <NavLink to="/orders">Orders</NavLink>}
          {user && <NavLink to="/dashboard">Dashboard</NavLink>}
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle dark mode" onClick={toggleDark} className="rounded-lg p-2 text-slate-700 hover:bg-orange-50 dark:text-slate-100">
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/cart" className="relative rounded-lg p-2 text-slate-700 hover:bg-orange-50 dark:text-slate-100">
            <ShoppingCart size={22} />
            {count > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-orange-600 px-1.5 text-xs font-bold text-white">{count}</span>}
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="hidden rounded-lg p-2 text-slate-700 hover:bg-orange-50 sm:block dark:text-slate-100"><UserRound size={22} /></Link>
              <button onClick={signOut} className="btn-secondary">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn-primary">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
