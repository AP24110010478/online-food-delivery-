import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  cuisine: { type: String, required: true, trim: true },
  description: String,
  image: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  rating: { type: Number, default: 4.5 },
  deliveryTime: { type: Number, default: 30 },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
  isOpen: { type: Boolean, default: true }
}, { timestamps: true });

restaurantSchema.virtual('menu', {
  ref: 'MenuItem',
  localField: '_id',
  foreignField: 'restaurant'
});

restaurantSchema.set('toJSON', { virtuals: true });
restaurantSchema.set('toObject', { virtuals: true });

export default mongoose.model('Restaurant', restaurantSchema);
