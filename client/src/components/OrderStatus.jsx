const steps = ['placed', 'accepted', 'preparing', 'out_for_delivery', 'delivered'];

export default function OrderStatus({ status = 'placed' }) {
  const current = steps.indexOf(status);
  return (
    <div className="grid gap-3 sm:grid-cols-5">
      {steps.map((step, index) => (
        <div key={step} className={`rounded-lg border p-3 text-center text-sm font-black capitalize ${index <= current ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-200 bg-white text-slate-400'}`}>
          {step.replaceAll('_', ' ')}
        </div>
      ))}
    </div>
  );
}
