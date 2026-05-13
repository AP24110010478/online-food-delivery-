import { Link } from 'react-router-dom';

export default function CustomerDashboard() {
  return <Dashboard title="Customer Dashboard" cards={[['Browse restaurants', '/restaurants'], ['View orders', '/orders'], ['Edit profile', '/profile']]} />;
}

export function Dashboard({ title, cards }) {
  return (
    <div className="container-page py-10">
      <h1 className="mb-6 text-4xl font-black">{title}</h1>
      <div className="grid gap-4 md:grid-cols-3">{cards.map(([label, href]) => <Link key={label} to={href} className="surface p-6 text-xl font-black transition hover:-translate-y-1 hover:shadow-xl">{label}</Link>)}</div>
    </div>
  );
}
