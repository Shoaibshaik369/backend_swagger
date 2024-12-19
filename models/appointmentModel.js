const db = require('../config/db');

/**
 * Adds a new appointment to the database.
 * 
 * @param {Object} appointmentData - The data for the new appointment.
 * @param {string} appointmentData.patientName - The name of the patient.
 * @param {string} appointmentData.appointmentNo - The appointment number.
 * @param {string} appointmentData.appointmentDate - The date of the appointment.
 * @param {string} appointmentData.phone - The phone number of the patient.
 * @param {string} appointmentData.gender - The gender of the patient.
 * @param {string} appointmentData.doctor - The name of the doctor.
 * @param {string} appointmentData.priority - The priority of the appointment.
 * @param {number} appointmentData.fee - The fee for the appointment.
 * @param {function} callback - Callback function to handle the result or error.
 */
exports.addAppointment = (appointmentData, callback) => {
  const query = `
    INSERT INTO appointments (patientName, appointmentNo, appointmentDate, phone, gender, doctor, priority, fee)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    appointmentData.patientName,
    appointmentData.appointmentNo,
    appointmentData.appointmentDate,
    appointmentData.phone,
    appointmentData.gender,
    appointmentData.doctor,
    appointmentData.priority,
    appointmentData.fee,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error adding appointment:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

/**
 * Fetches all appointments from the database.
 * 
 * @param {function} callback - Callback function to handle the result or error.
 */
exports.getAppointments = (callback) => {
  const query = 'SELECT * FROM appointments';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

/**
 * Fetches a single appointment by its ID.
 * 
 * @param {number} id - The ID of the appointment to fetch.
 * @param {function} callback - Callback function to handle the result or error.
 */
exports.getAppointmentById = (id, callback) => {
  const query = 'SELECT * FROM appointments WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching appointment by ID:', err);
      return callback(err, null);
    }
    // Return the first record if found, otherwise null
    callback(null, results[0] || null);
  });
};
