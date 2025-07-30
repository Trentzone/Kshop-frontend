const express = require('express');
const paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);
const router = express.Router();

// Initialize payment
router.post('/initialize', async (req, res) => {
  const { orderId, amount, email, phone, provider, studentId } = req.body;
  if (!orderId || !amount || !email) {
    return res.status(400).json({ message: 'Missing required payment data' });
  }
  try {
    const response = await paystack.transaction.initialize({
      email,
      amount: amount * 100, // Convert to pesewas
      currency: 'GHS',
      callback_url: process.env.PAYSTACK_CALLBACK_URL,
      metadata: {
        order_id: orderId,
        student_id: studentId
      },
      channels: ['mobile_money', 'card'],
      mobile_money: {
        phone,
        provider // 'mtn', 'vodafone', 'airteltigo'
      }
    });
    res.status(200).json({
      success: true,
      authorization_url: response.data.authorization_url,
      access_code: response.data.access_code,
      reference: response.data.reference
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify payment
router.get('/verify/:reference', async (req, res) => {
  const { reference } = req.params;
  try {
    const response = await paystack.transaction.verify({ reference });
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
