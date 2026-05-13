import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { updateProfile } from '../redux/authSlice.js';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const dispatch = useDispatch();
  const submit = async (event) => {
    event.preventDefault();
    const result = await dispatch(updateProfile(form));
    result.meta.requestStatus === 'fulfilled' ? toast.success('Profile saved') : toast.error(result.payload);
  };

  return (
    <div className="container-page py-10">
      <form onSubmit={submit} className="surface max-w-xl space-y-4 p-6">
        <h1 className="text-3xl font-black">Profile</h1>
        <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <p className="font-bold capitalize text-orange-600">{user?.role}</p>
        <button className="btn-primary">Save</button>
      </form>
    </div>
  );
}
