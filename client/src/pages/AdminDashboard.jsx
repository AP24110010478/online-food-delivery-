import { useEffect, useState } from 'react';
import { api } from '../services/authService.js';

export default function AdminDashboard() {
  const [data, setData] = useState({ users: [], restaurants: [], reports: {} });
  useEffect(() => { api.get('/admin/overview').then((res) => setData(res.data)); }, []);
  return (
    <div className="container-page py-10">
      <h1 className="mb-6 text-4xl font-black">Admin Dashboard</h1>
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Metric label="Users" value={data.reports.users || 0} /><Metric label="Restaurants" value={data.reports.restaurants || 0} /><Metric label="Orders" value={data.reports.orders || 0} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Users" rows={data.users.map((u) => `${u.name} · ${u.role}`)} />
        <Panel title="Restaurants" rows={data.restaurants.map((r) => `${r.name} · ${r.status}`)} />
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return <div className="surface p-5"><p className="text-sm font-bold text-slate-500">{label}</p><p className="text-4xl font-black text-orange-600">{value}</p></div>;
}

function Panel({ title, rows }) {
  return <div className="surface p-5"><h2 className="mb-3 text-xl font-black">{title}</h2><div className="space-y-2">{rows.map((row) => <p key={row} className="rounded-md bg-orange-50 p-2">{row}</p>)}</div></div>;
}
