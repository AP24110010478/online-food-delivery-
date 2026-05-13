export function validateAuth(values, mode = 'login') {
  const errors = {};
  if (mode === 'register' && !values.name?.trim()) errors.name = 'Name is required';
  if (!/^\S+@\S+\.\S+$/.test(values.email || '')) errors.email = 'Valid email is required';
  if (!values.password || values.password.length < 6) errors.password = 'Password must be at least 6 characters';
  if (mode === 'register' && !['customer', 'restaurant', 'delivery'].includes(values.role)) errors.role = 'Choose a valid role';
  return errors;
}

export function validateCheckout(values) {
  const errors = {};
  if (!values.address?.street) errors.street = 'Street is required';
  if (!values.address?.city) errors.city = 'City is required';
  if (!values.address?.phone) errors.phone = 'Phone is required';
  return errors;
}
