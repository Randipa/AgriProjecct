const express = require('express');
const router = express.Router();
const DeliveryOrder = require('../models/DeliveryOrder');

// Handle delivery order creation
router.post('/create-delivery-order', async (req, res) => {
  try {
    const {
      orderId,
      deliveryAddress,
      contactNumber,
      refrigeratedPacking,
      insulatedPacking,
      customPacking,
      specialInstructions,
      isBulkOrder,
      bulkOrderId,
      bulkDeliveryAddress,
      bulkContactNumber,
      bulkOrderWeight,
      preferredPacking,
      preferredVehicleType,
    } = req.body;

    // Validate required fields for regular delivery orders
    if (!orderId || !deliveryAddress || !contactNumber || !preferredPacking || !preferredVehicleType) {
      return res.status(400).json({ message: 'All regular delivery fields are required' });
    }

    // If bulk order is selected, validate bulk-specific fields
    if (isBulkOrder) {
      if (
        !bulkOrderId ||
        !bulkDeliveryAddress ||
        !bulkContactNumber ||
        !bulkOrderWeight
      ) {
        return res.status(400).json({ message: 'All bulk delivery fields are required' });
      }
    }

    // Create a new delivery order
    const deliveryOrder = new DeliveryOrder({
      orderId,
      deliveryAddress,
      contactNumber,
      refrigeratedPacking,
      insulatedPacking,
      customPacking,
      specialInstructions,
      isBulkOrder,
      bulkOrderId,
      bulkDeliveryAddress,
      bulkContactNumber,
      bulkOrderWeight,
      preferredPacking,
      preferredVehicleType,
    });

    await deliveryOrder.save();

    res.status(201).json({ message: 'Delivery order created successfully', data: deliveryOrder });
  } catch (error) {
    console.error('Error creating delivery order:', error);
    if (error.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const validationErrors = {};
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });
      return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
    }
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;