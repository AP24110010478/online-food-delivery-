import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import Payment from '../models/Payment.js';

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const payment = await Payment.create({
    order: req.body.order,
    user: req.user._id,
    provider: req.body.provider || 'stripe_mock',
    amount: req.body.amount,
    status: 'created',
    providerPaymentId: `mock_${crypto.randomUUID()}`
  });
  res.status(201).json({ payment, clientSecret: `mock_secret_${payment._id}` });
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.body.paymentId);
  if (!payment) {
    res.status(404);
    throw new Error('Payment not found');
  }
  payment.status = 'paid';
  await payment.save();
  res.json({ payment });
});
