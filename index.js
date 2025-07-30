require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Basic route for health check
app.get('/', (req, res) => {
  res.json({ message: 'KShop backend is running' });
});

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/products');

app.use('/api/products', productRoutes);

const orderRoutes = require('./routes/orders');

app.use('/api/orders', orderRoutes);

const paymentRoutes = require('./routes/payments');

app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
