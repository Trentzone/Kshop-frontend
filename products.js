const express = require('express');
const { prisma } = require('../lib/db');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
});

// Create new product
router.post('/', async (req, res) => {
  const { title, description, price, inventory, sellerId, images } = req.body;
  if (!title || !description || !price || !sellerId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        inventory: inventory || 0,
        sellerId,
        images: {
          create: images.map((imageUrl, index) => ({
            imageUrl,
            isPrimary: index === 0
          }))
        }
      },
      include: {
        images: true,
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  const { title, description, price, inventory, images } = req.body;
  try {
    // Update product details
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        title,
        description,
        price,
        inventory
      }
    });

    if (images && images.length > 0) {
      // Delete existing images
      await prisma.productImage.deleteMany({ where: { productId } });
      // Add new images
      await prisma.productImage.createMany({
        data: images.map((imageUrl, index) => ({
          productId,
          imageUrl,
          isPrimary: index === 0
        }))
      });
    }

    const productWithImages = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true }
    });

    res.json(productWithImages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    await prisma.product.delete({ where: { id: productId } });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
});

module.exports = router;
