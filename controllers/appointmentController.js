const AppointmentModel = require('../models/appointmentModel');

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Add a new appointment
 *     description: Adds a new appointment to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2023-12-17
 *               time:
 *                 type: string
 *                 example: 10:30 AM
 *               description:
 *                 type: string
 *                 example: Meeting with the client
 *     responses:
 *       201:
 *         description: Appointment added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *       500:
 *         description: Failed to add appointment.
 */
exports.addAppointment = (req, res) => {
  const appointmentData = req.body;

  AppointmentModel.addAppointment(appointmentData, (err, result) => {
    if (err) {
      console.error('Error adding appointment:', err);
      return res.status(500).json({ error: 'Failed to add appointment' });
    }
    res.status(201).json({ message: 'Appointment added successfully', id: result.insertId });
  });
};

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     description: Fetch all appointments from the database.
 *     responses:
 *       200:
 *         description: A list of appointments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     format: date
 *                   time:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Failed to fetch appointments.
 */
exports.getAppointments = (req, res) => {
  AppointmentModel.getAppointments((err, results) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      return res.status(500).json({ error: 'Failed to fetch appointments' });
    }
    res.status(200).json(results);
  });
};

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get an appointment by ID
 *     description: Fetch a single appointment using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the appointment to fetch.
 *     responses:
 *       200:
 *         description: Appointment details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date
 *                 time:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Appointment not found.
 *       500:
 *         description: Failed to fetch appointment.
 */
exports.getAppointmentById = (req, res) => {
  const { id } = req.params;

  AppointmentModel.getAppointmentById(id, (err, result) => {
    if (err) {
      console.error('Error fetching appointment:', err);
      return res.status(500).json({ error: 'Failed to fetch appointment' });
    }
    if (!result) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(result);
  });
};


// Add a new appointment
exports.addAppointment = (req, res) => {
  // Extract data from the request body
  const { patientName, appointmentNo, appointmentDate, phone, gender, doctor, priority, fee } = req.body;

  // Validate the incoming data
  if (!patientName || !appointmentNo || !appointmentDate || !phone || !gender || !doctor || !priority || !fee) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Create an object to pass to the model
  const appointmentData = {
    patientName,
    appointmentNo,
    appointmentDate,
    phone,
    gender,
    doctor,
    priority,
    fee,
  };

  // Call the model function to add the appointment
  AppointmentModel.addAppointment(appointmentData, (err, result) => {
    if (err) {
      console.error('Error adding appointment:', err);
      return res.status(500).json({ error: 'Failed to add appointment' });
    }

    // Respond with success
    res.status(201).json({
      message: 'Appointment added successfully',
      id: result.insertId,
    });
  });
};