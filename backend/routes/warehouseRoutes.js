const express = require('express');
const router = express.Router();
const WarehouseRequest = require('../models/WarehouseRequest');

// Handle warehouse request
router.post('/request-warehouse', async (req, res) => {
  try {
    const {
      name,
      address,
      contactName,
      typeOfGoods,
      storageDuration,
      quantity,
      specialRequirements,
      preferredLocation,
      dropOffDate,
      pickUpDate,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !address ||
      !contactName ||
      !typeOfGoods ||
      !storageDuration ||
      !quantity ||
      !specialRequirements ||
      !preferredLocation ||
      !dropOffDate ||
      !pickUpDate
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new warehouse request
    const warehouseRequest = new WarehouseRequest({
      name,
      address,
      contactName,
      typeOfGoods,
      storageDuration,
      quantity,
      specialRequirements,
      preferredLocation,
      dropOffDate: new Date(dropOffDate),
      pickUpDate: new Date(pickUpDate),
    });

    await warehouseRequest.save();

    res.status(201).json({ message: 'Warehouse request submitted successfully', data: warehouseRequest });
  } catch (error) {
    console.error('Error submitting warehouse request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;