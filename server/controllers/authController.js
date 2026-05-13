import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const sanitize = (user) => ({ _id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone, address: user.address });

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (await User.findOne({ email })) {
    res.status(409);
    throw new Error('Email already registered');
  }
  const user = await User.create({ name, email, password, role });
  res.status(201).json({ user: sanitize(user), token: generateToken(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  res.json({ user: sanitize(user), token: generateToken(user) });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: sanitize(req.user) });
});

export const updateProfile = asyncHandler(async (req, res) => {
  Object.assign(req.user, {
    name: req.body.name ?? req.user.name,
    phone: req.body.phone ?? req.user.phone,
    address: req.body.address ?? req.user.address
  });
  await req.user.save();
  res.json({ user: sanitize(req.user) });
});
