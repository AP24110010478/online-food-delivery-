import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: { type: String, required: true, trim: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  category: { type: String, default: 'Main' },
  image: String,
  rating: { type: Number, default: 4.6 },
  isAvailable: { type: Boolean, default: true },
  tags: [String]
}, { timestamps: true });

export default mongoose.model('MenuItem', menuItemSchema);
