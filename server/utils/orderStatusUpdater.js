export const ORDER_STATUSES = ['placed', 'accepted', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

export function canTransition(from, to, role) {
  if (to === 'cancelled') return ['customer', 'restaurant', 'admin'].includes(role);
  const current = ORDER_STATUSES.indexOf(from);
  const next = ORDER_STATUSES.indexOf(to);
  if (next !== current + 1) return false;
  if (['accepted', 'preparing'].includes(to)) return ['restaurant', 'admin'].includes(role);
  if (['out_for_delivery', 'delivered'].includes(to)) return ['delivery', 'admin', 'restaurant'].includes(role);
  return false;
}
