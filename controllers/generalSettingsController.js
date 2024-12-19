const GeneralSettingsModel = require('../models/generalSettingsModel');

/**
 * @swagger
 * /settings/general/{id}:
 *   get:
 *     summary: Get general settings by ID
 *     description: Fetch general settings from the database using the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the general settings to fetch.
 *     responses:
 *       200:
 *         description: General settings details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 hospitalName:
 *                   type: string
 *                 hospitalCode:
 *                   type: string
 *                 address:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 email:
 *                   type: string
 *                 language:
 *                   type: string
 *                 dateTime:
 *                   type: string
 *                   format: date-time
 *                 timeZone:
 *                   type: string
 *       404:
 *         description: General settings not found.
 *       500:
 *         description: Failed to fetch general settings.
 */
exports.getGeneralSettings = (req, res) => {
  const { id } = req.params;

  GeneralSettingsModel.getGeneralSettings(id, (err, result) => {
    if (err) {
      console.error('Error fetching general settings:', err);
      return res.status(500).json({ error: 'Failed to fetch general settings' });
    }

    if (!result) {
      return res.status(404).json({ message: 'General settings not found' });
    }

    res.status(200).json(result);
  });
};

/**
 * @swagger
 * /settings/general:
 *   post:
 *     summary: Add new general settings
 *     description: Adds new general settings to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hospitalName:
 *                 type: string
 *               hospitalCode:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               language:
 *                 type: string
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *               timeZone:
 *                 type: string
 *     responses:
 *       201:
 *         description: General settings added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Failed to add general settings.
 */
exports.saveGeneralSettings = (req, res) => {
  const { hospitalName, hospitalCode, address, phone, email, language, dateTime, timeZone } = req.body;

  // Validate the incoming data
  if (!hospitalName || !hospitalCode || !address || !phone || !email || !language || !dateTime || !timeZone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Create the settings data object
  const generalSettingsData = {
    hospitalName,
    hospitalCode,
    address,
    phone,
    email,
    language,
    dateTime,
    timeZone,
  };

  GeneralSettingsModel.saveGeneralSettings(generalSettingsData, (err, result) => {
    if (err) {
      console.error('Error saving general settings:', err);
      return res.status(500).json({ error: 'Failed to save general settings' });
    }

    res.status(201).json({ message: 'General settings saved successfully', id: result.insertId });
  });
};

/**
 * @swagger
 * /settings/general/{id}:
 *   put:
 *     summary: Update general settings by ID
 *     description: Update existing general settings in the database using the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the general settings to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hospitalName:
 *                 type: string
 *               hospitalCode:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               language:
 *                 type: string
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *               timeZone:
 *                 type: string
 *     responses:
 *       200:
 *         description: General settings updated successfully.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: General settings not found.
 *       500:
 *         description: Failed to update general settings.
 */
exports.updateGeneralSettings = (req, res) => {
  const { id } = req.params;
  const { hospitalName, hospitalCode, address, phone, email, language, dateTime, timeZone } = req.body;

  // Validate the incoming data
  if (!hospitalName || !hospitalCode || !address || !phone || !email || !language || !dateTime || !timeZone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const updatedData = {
    hospitalName,
    hospitalCode,
    address,
    phone,
    email,
    language,
    dateTime,
    timeZone,
  };

  GeneralSettingsModel.updateGeneralSettings(id, updatedData, (err, result) => {
    if (err) {
      console.error('Error updating general settings:', err);
      return res.status(500).json({ error: 'Failed to update general settings' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'General settings not found' });
    }

    res.status(200).json({ message: 'General settings updated successfully' });
  });
};
