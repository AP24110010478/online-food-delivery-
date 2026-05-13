export default function calculateTotal(items = [], deliveryFee = 49, taxRate = 0.05) {
  const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + tax + (subtotal > 0 ? deliveryFee : 0);
  return { subtotal, tax, deliveryFee: subtotal > 0 ? deliveryFee : 0, total };
}
