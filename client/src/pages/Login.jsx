import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser } from '../redux/authSlice.js';
import { validateAuth } from '../utils/validateForm.js';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    const errors = validateAuth(form);
    if (Object.keys(errors).length) return toast.error(Object.values(errors)[0]);
    const result = await dispatch(loginUser(form));
    if (result.meta.requestStatus === 'fulfilled') {
      const user = result.payload.user;
      toast.success('Welcome back');
      const target = location.state?.from?.pathname || (user.role === 'customer' ? '/orders' : '/dashboard');
      navigate(target);
    } else toast.error(result.payload);
  };

  return <AuthShell title="Welcome back" subtitle="Login to manage meals and orders" form={form} setForm={setForm} submit={submit} loading={loading} mode="login" />;
}

function AuthShell({ title, subtitle, form, setForm, submit, loading, mode }) {
  return (
    <div className="container-page flex min-h-[72vh] items-center justify-center py-12">
      <form onSubmit={submit} className="surface w-full max-w-md space-y-4 p-6">
        <div><h1 className="text-3xl font-black">{title}</h1><p className="text-slate-500">{subtitle}</p></div>
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn-primary w-full" disabled={loading}>{loading ? 'Please wait...' : 'Login'}</button>
        <p className="text-center text-sm">New here? <Link className="font-bold text-orange-600" to="/register">Create account</Link></p>
      </form>
    </div>
  );
}
