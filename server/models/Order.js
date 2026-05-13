import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  deliveryStaff: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    name: String,
    price: Number,
    quantity: { type: Number, required: true, min: 1 }
  }],
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    phone: String
  },
  subtotal: Number,
  tax: Number,
  deliveryFee: Number,
  total: Number,
  paymentMethod: { type: String, enum: ['stripe_mock', 'razorpay_mock', 'cash'], default: 'stripe_mock' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  status: { type: String, enum: ['placed', 'accepted', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'], default: 'placed' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
