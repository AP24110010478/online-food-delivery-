import { ArrowRight, Search, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section>
      <div className="container-page grid min-h-[72vh] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="rounded-md bg-orange-100 px-3 py-1 text-sm font-black text-orange-700">Hot meals. Real tracking. One cart.</span>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight text-slate-950 md:text-7xl dark:text-white">Order food from trusted local restaurants.</h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">Browse menus, pay securely, follow live status, and review every bite from one polished MERN app.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/restaurants" className="btn-primary inline-flex items-center gap-2">Start ordering <ArrowRight size={18} /></Link>
            <Link to="/register" className="btn-secondary">Open an account</Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[['Search fast', Search], ['JWT secured', ShieldCheck], ['Delivery ready', Truck]].map(([label, Icon]) => (
              <div key={label} className="surface flex items-center gap-3 p-4 font-bold"><Icon className="text-orange-600" /> {label}</div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <img className="h-[420px] w-full rounded-lg object-cover shadow-2xl" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" alt="Fresh food spread" />
        </div>
      </div>
    </section>
  );
}
