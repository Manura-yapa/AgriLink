const express = require('express');
const protect = require('../middleware/auth');
const User = require('../models/User');
const Crop = require('../models/Crop');
const Order = require('../models/Order');

const router = express.Router();

const ensureSeedData = async (farmerId) => {
  if (!farmerId) return;

  const listings = await Crop.find({ farmer: farmerId }).sort({ createdAt: -1 });
  if (listings.length === 0) {
    await Crop.create({
      farmer: farmerId,
      name: 'Fresh Rice',
      category: 'Grains',
      quantity: 120,
      unit: 'kg',
      pricePerUnit: 65,
      location: 'Anuradhapura',
      harvestDate: new Date(),
      status: 'available'
    });

    await Crop.create({
      farmer: farmerId,
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      quantity: 80,
      unit: 'kg',
      pricePerUnit: 110,
      location: 'Kandy',
      harvestDate: new Date(),
      status: 'available'
    });
  }

  const orders = await Order.find({ farmer: farmerId }).sort({ createdAt: -1 });
  if (orders.length === 0) {
    const buyer = await User.findOne({ role: 'buyer' });
    const seedCrop = await Crop.findOne({ farmer: farmerId }).sort({ createdAt: -1 });

    if (buyer && seedCrop) {
      await Order.create({
        buyer: buyer._id,
        farmer: farmerId,
        crop: seedCrop._id,
        quantity: 25,
        total: seedCrop.pricePerUnit * 25,
        status: 'pending'
      });
    }
  }
};

router.use(protect);

router.get('/summary', async (req, res) => {
  if (req.user.role !== 'farmer') {
    return res.status(403).json({ message: 'Farmer access only.' });
  }

  await ensureSeedData(req.user._id);

  const [listings, orders] = await Promise.all([
    Crop.find({ farmer: req.user._id }).sort({ createdAt: -1 }),
    Order.find({ farmer: req.user._id }).populate('crop').sort({ createdAt: -1 })
  ]);

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

  return res.json({
    listingsCount: listings.length,
    totalOrders: orders.length,
    totalRevenue,
    name: req.user.name
  });
});

router.get('/listings', async (req, res) => {
  if (req.user.role !== 'farmer') {
    return res.status(403).json({ message: 'Farmer access only.' });
  }

  await ensureSeedData(req.user._id);

  const listings = await Crop.find({ farmer: req.user._id }).sort({ createdAt: -1 });
  return res.json(listings);
});

router.post('/listings', async (req, res) => {
  if (req.user.role !== 'farmer') {
    return res.status(403).json({ message: 'Farmer access only.' });
  }

  const { name, category, quantity, unit, pricePerUnit, location } = req.body;

  if (!name || !category || !quantity || !pricePerUnit) {
    return res.status(400).json({ message: 'Please provide name, category, quantity and price.' });
  }

  const crop = await Crop.create({
    farmer: req.user._id,
    name,
    category,
    quantity: Number(quantity),
    unit: unit || 'kg',
    pricePerUnit: Number(pricePerUnit),
    location: location || 'Local farm'
  });

  return res.status(201).json(crop);
});

router.get('/orders', async (req, res) => {
  if (req.user.role !== 'farmer') {
    return res.status(403).json({ message: 'Farmer access only.' });
  }

  await ensureSeedData(req.user._id);

  const orders = await Order.find({ farmer: req.user._id })
    .populate('buyer', 'name email')
    .populate('crop', 'name category pricePerUnit')
    .sort({ createdAt: -1 });

  return res.json(orders);
});

module.exports = router;
