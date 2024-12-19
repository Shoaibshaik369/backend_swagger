const db = require('../config/db');

/**
 * Get general settings by ID
 * @param {number} id - The ID of the general settings
 * @param {function} callback - Callback function to return results or error
 */
exports.getGeneralSettings = (id, callback) => {
  const query = 'SELECT * FROM general_settings WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    callback(null, results[0]);
  });
};

/**
 * Save new general settings
 * @param {Object} data - General settings data
 * @param {function} callback - Callback function to return result or error
 */
exports.saveGeneralSettings = (data, callback) => {
  const query = 'INSERT INTO general_settings (hospitalName, hospitalCode, address, phone, email, language, dateTime, timeZone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [data.hospitalName, data.hospitalCode, data.address, data.phone, data.email, data.language, data.dateTime, data.timeZone], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

/**
 * Update general settings by ID
 * @param {number} id - The ID of the general settings
 * @param {Object} data - New general settings data
 * @param {function} callback - Callback function to return result or error
 */
exports.updateGeneralSettings = (id, data, callback) => {
  const query = 'UPDATE general_settings SET hospitalName = ?, hospitalCode = ?, address = ?, phone = ?, email = ?, language = ?, dateTime = ?, timeZone = ? WHERE id = ?';
  db.query(query, [data.hospitalName, data.hospitalCode, data.address, data.phone, data.email, data.language, data.dateTime, data.timeZone, id], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};
