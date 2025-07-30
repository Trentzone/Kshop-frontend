const express = require('express');
const { prisma } = require('../lib/db');
const router = express.Router();

// Get all orders for a user
router.get('/user/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  const { userId, items, total, status } = req.body;
  if (!userId || !items || !Array.isArray(items) || items.length === 0 || !total) {
    return res.status(400).json({ message: 'Missing or invalid order data' });
  }
  try {
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: status || 'pending',
        orderItems: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        orderItems: true
      }
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

module.exports = router;
