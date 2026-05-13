export default function Footer() {
  return (
    <footer className="mt-16 border-t border-orange-100 bg-white py-8 dark:border-slate-700 dark:bg-slate-900">
      <div className="container-page grid gap-6 text-sm text-slate-600 md:grid-cols-3 dark:text-slate-300">
        <div>
          <h3 className="text-lg font-black text-orange-600">QuickBite</h3>
          <p className="mt-2">Fresh food, fast checkout, live order tracking.</p>
        </div>
        <p>Built for customers, restaurants, couriers, and admins.</p>
        <p className="md:text-right">© {new Date().getFullYear()} QuickBite. All rights reserved.</p>
      </div>
    </footer>
  );
}
