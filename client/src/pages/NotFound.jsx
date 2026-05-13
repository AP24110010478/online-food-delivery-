import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-black text-orange-600">404</h1>
      <p className="mt-3 text-xl font-bold">That page is not on the menu.</p>
      <Link className="btn-primary mt-6" to="/">Go home</Link>
    </div>
  );
}
