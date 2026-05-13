/**
 * autoSeed.js — Auto-seeds demo data on first startup.
 * Safe to call repeatedly — it checks if data already exists.
 */
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import MenuItem from '../models/MenuItem.js';

const RESTAURANTS = [
  {
    name: 'Spice Garden',
    cuisine: 'Indian',
    description: 'Authentic Indian flavors with a modern twist — from rich curries to crispy snacks.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80',
    address: { street: '12 Curry Lane', city: 'Hyderabad', state: 'TS', zip: '500001' },
    rating: 4.7,
    deliveryTime: 25,
    menu: [
      { name: 'Butter Chicken', price: 280, category: 'Main', description: 'Creamy tomato-based curry with tender chicken.', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&q=80', rating: 4.8 },
      { name: 'Paneer Tikka', price: 220, category: 'Starter', description: 'Grilled cottage cheese with spiced marinade.', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80', rating: 4.6 },
      { name: 'Dal Makhani', price: 180, category: 'Main', description: 'Slow-cooked black lentils in a buttery sauce.', image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&q=80', rating: 4.5 },
      { name: 'Garlic Naan', price: 60, category: 'Bread', description: 'Fluffy oven-baked bread with garlic butter.', image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&q=80', rating: 4.7 },
      { name: 'Mango Lassi', price: 80, category: 'Drink', description: 'Sweet yogurt drink blended with fresh mango.', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80', rating: 4.9 },
    ],
  },
  {
    name: 'Pizza Pronto',
    cuisine: 'Italian',
    description: 'Hand-tossed Neapolitan pizzas and fresh pasta made daily in our open kitchen.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
    address: { street: '8 Via Roma', city: 'Mumbai', state: 'MH', zip: '400001' },
    rating: 4.5,
    deliveryTime: 30,
    menu: [
      { name: 'Margherita Pizza', price: 320, category: 'Pizza', description: 'Classic tomato, fresh mozzarella, and basil.', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80', rating: 4.6 },
      { name: 'Pepperoni Pizza', price: 380, category: 'Pizza', description: 'Loaded with premium pepperoni and double cheese.', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80', rating: 4.8 },
      { name: 'Pasta Arrabbiata', price: 260, category: 'Pasta', description: 'Spicy tomato sauce with penne and fresh herbs.', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80', rating: 4.4 },
      { name: 'Garlic Bread', price: 120, category: 'Sides', description: 'Toasted ciabatta with herb butter and garlic.', image: 'https://images.unsplash.com/photo-1619531038896-f7b03a24c1b5?w=800&q=80', rating: 4.5 },
      { name: 'Tiramisu', price: 180, category: 'Dessert', description: 'Classic Italian coffee-flavored dessert.', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80', rating: 4.9 },
    ],
  },
  {
    name: 'Dragon Palace',
    cuisine: 'Chinese',
    description: 'Wok-tossed noodles, dim sum, and fiery Szechuan dishes from the heart of China.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&q=80',
    address: { street: '5 Noodle Street', city: 'Delhi', state: 'DL', zip: '110001' },
    rating: 4.3,
    deliveryTime: 35,
    menu: [
      { name: 'Kung Pao Chicken', price: 280, category: 'Main', description: 'Spicy stir-fried chicken with peanuts and chilies.', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80', rating: 4.5 },
      { name: 'Veg Hakka Noodles', price: 200, category: 'Noodles', description: 'Wok-tossed noodles with crisp vegetables.', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80', rating: 4.3 },
      { name: 'Dim Sum Basket', price: 240, category: 'Starter', description: 'Steamed dumplings with ginger-soy dipping sauce.', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80', rating: 4.6 },
      { name: 'Spring Rolls', price: 160, category: 'Starter', description: 'Crispy rolls stuffed with seasoned vegetables.', image: 'https://images.unsplash.com/photo-1584278860047-22db9ff82bed?w=800&q=80', rating: 4.4 },
      { name: 'Sweet & Sour Pork', price: 300, category: 'Main', description: 'Classic Cantonese dish with tangy sauce.', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80', rating: 4.2 },
    ],
  },
  {
    name: 'The Green Bowl',
    cuisine: 'Healthy',
    description: 'Nutritious bowls, smoothies, and salads packed with superfoods and local greens.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
    address: { street: '20 Wellness Road', city: 'Bangalore', state: 'KA', zip: '560001' },
    rating: 4.6,
    deliveryTime: 20,
    menu: [
      { name: 'Quinoa Power Bowl', price: 320, category: 'Bowl', description: 'Quinoa, roasted veggies, avocado, and tahini.', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80', rating: 4.7 },
      { name: 'Green Goddess Smoothie', price: 180, category: 'Drink', description: 'Spinach, banana, mango, and coconut water.', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80', rating: 4.8 },
      { name: 'Avocado Toast', price: 240, category: 'Breakfast', description: 'Sourdough with smashed avocado and poached egg.', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=800&q=80', rating: 4.6 },
      { name: 'Caesar Salad', price: 200, category: 'Salad', description: 'Crisp romaine, parmesan, croutons, caesar dressing.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80', rating: 4.5 },
      { name: 'Acai Bowl', price: 280, category: 'Bowl', description: 'Frozen acai blend topped with granola and fresh fruit.', image: 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=800&q=80', rating: 4.9 },
    ],
  },
  {
    name: 'Burger Republic',
    cuisine: 'American',
    description: 'Juicy smash burgers, crispy fries, and thick milkshakes — the real deal.',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1200&q=80',
    address: { street: '45 Main Street', city: 'Chennai', state: 'TN', zip: '600001' },
    rating: 4.4,
    deliveryTime: 30,
    menu: [
      { name: 'Classic Smash Burger', price: 280, category: 'Burger', description: 'Double smash patty, american cheese, pickles, special sauce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', rating: 4.7 },
      { name: 'Crispy Chicken Burger', price: 260, category: 'Burger', description: 'Fried chicken fillet with coleslaw and sriracha mayo.', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80', rating: 4.5 },
      { name: 'Loaded Fries', price: 180, category: 'Sides', description: 'Crispy fries topped with cheese sauce and jalapenos.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80', rating: 4.6 },
      { name: 'Chocolate Milkshake', price: 160, category: 'Drink', description: 'Thick chocolate shake topped with whipped cream.', image: 'https://images.unsplash.com/photo-1572490122747-3e9c1f09b0fb?w=800&q=80', rating: 4.8 },
      { name: 'Onion Rings', price: 140, category: 'Sides', description: 'Golden battered onion rings with dipping sauce.', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=800&q=80', rating: 4.4 },
    ],
  },
  {
    name: 'Sweet Cravings',
    cuisine: 'Dessert',
    description: 'Handcrafted cakes, Belgian waffles, gelato, and artisan chocolates for every sweet tooth.',
    image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=1200&q=80',
    address: { street: '3 Sugar Lane', city: 'Pune', state: 'MH', zip: '411001' },
    rating: 4.8,
    deliveryTime: 20,
    menu: [
      { name: 'Belgian Waffle', price: 200, category: 'Waffle', description: 'Crispy waffle with fresh berries and whipped cream.', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&q=80', rating: 4.9 },
      { name: 'Chocolate Lava Cake', price: 240, category: 'Cake', description: 'Warm chocolate cake with molten center and vanilla ice cream.', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', rating: 4.9 },
      { name: 'Strawberry Gelato', price: 160, category: 'Ice Cream', description: 'Authentic Italian gelato made with fresh strawberries.', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&q=80', rating: 4.8 },
      { name: 'Cheesecake Slice', price: 220, category: 'Cake', description: 'New York-style baked cheesecake on a graham cracker crust.', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80', rating: 4.7 },
      { name: 'Macaron Box (6 pcs)', price: 280, category: 'Bakery', description: 'Assorted French macarons in seasonal flavors.', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80', rating: 4.8 },
    ],
  },
];

const DEMO_USERS = [
  { name: 'Admin User', email: 'admin@quickbite.com', password: 'admin123', role: 'admin' },
  { name: 'Restaurant Owner', email: 'owner@quickbite.com', password: 'owner123', role: 'restaurant' },
  { name: 'Delivery Guy', email: 'delivery@quickbite.com', password: 'delivery123', role: 'delivery' },
  { name: 'Test Customer', email: 'customer@quickbite.com', password: 'customer123', role: 'customer' },
];

export async function autoSeed() {
  const restaurantCount = await Restaurant.countDocuments();
  if (restaurantCount > 0) {
    console.log(`ℹ️  Database already has ${restaurantCount} restaurants — skipping seed.`);
    return;
  }

  console.log('🌱 Auto-seeding demo data...');

  // Create users
  let ownerUser;
  for (const u of DEMO_USERS) {
    const existing = await User.findOne({ email: u.email });
    if (!existing) {
      const created = await User.create(u);
      if (u.role === 'restaurant') ownerUser = created;
    } else {
      if (u.role === 'restaurant') ownerUser = existing;
    }
  }

  // Fallback: use first user with restaurant role
  if (!ownerUser) ownerUser = await User.findOne({ role: 'restaurant' });
  // Final fallback: first user
  if (!ownerUser) ownerUser = await User.findOne({});

  // Create restaurants + menus
  for (const data of RESTAURANTS) {
    const { menu: menuData, ...restaurantData } = data;
    const restaurant = await Restaurant.create({
      ...restaurantData,
      owner: ownerUser._id,
      status: 'approved',
    });
    await MenuItem.insertMany(menuData.map(item => ({ ...item, restaurant: restaurant._id })));
    console.log(`   🍽️  ${restaurant.name} — ${menuData.length} items`);
  }

  console.log('✅ Demo data seeded successfully!');
  console.log('   📧 Login as customer: customer@quickbite.com / customer123');
  console.log('   📧 Login as admin:    admin@quickbite.com / admin123');
}
