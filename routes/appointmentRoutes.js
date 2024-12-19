const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const router = express.Router();

/**
 * @route POST /appointments
 * @description Add a new appointment
 * @access Public
 */
router.post('/', appointmentController.addAppointment);

/**
 * @route GET /appointments
 * @description Get all appointments
 * @access Public
 */
router.get('/', appointmentController.getAppointments);

/**
 * @route GET /appointments/:id
 * @description Fetch a specific appointment by ID
 * @access Public
 */
router.get('/:id', appointmentController.getAppointmentById);

/**
 * @route POST /appointments
 * @description Add a new appointment
 * @access Public
 */
router.post('/', appointmentController.addAppointment);

module.exports = router;
