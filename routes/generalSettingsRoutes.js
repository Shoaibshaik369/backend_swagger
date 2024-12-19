const express = require('express');
const router = express.Router();
const generalSettingsController = require('../controllers/generalSettingsController');

// Get general settings
router.get('/:id', generalSettingsController.getGeneralSettings);

// Save general settings (POST)
router.post('/', generalSettingsController.saveGeneralSettings);

// Update general settings (PUT)
router.put('/:id', generalSettingsController.updateGeneralSettings);

module.exports = router;
