import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerUser } from '../redux/authSlice.js';
import { validateAuth } from '../utils/validateForm.js';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const errors = validateAuth(form, 'register');
    if (Object.keys(errors).length) return toast.error(Object.values(errors)[0]);
    const result = await dispatch(registerUser(form));
    if (result.meta.requestStatus === 'fulfilled') {
      const user = result.payload.user;
      toast.success('Account created');
      navigate(user.role === 'customer' ? '/orders' : '/dashboard');
    } else toast.error(result.payload);
  };

  return (
    <div className="container-page flex min-h-[72vh] items-center justify-center py-12">
      <form onSubmit={submit} className="surface w-full max-w-md space-y-4 p-6">
        <div><h1 className="text-3xl font-black">Create account</h1><p className="text-slate-500">Choose your role and get started</p></div>
        <input className="input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="customer">Customer</option><option value="restaurant">Restaurant owner</option><option value="delivery">Delivery staff</option>
        </select>
        <button className="btn-primary w-full" disabled={loading}>{loading ? 'Please wait...' : 'Register'}</button>
        <p className="text-center text-sm">Already joined? <Link className="font-bold text-orange-600" to="/login">Login</Link></p>
      </form>
    </div>
  );
}
