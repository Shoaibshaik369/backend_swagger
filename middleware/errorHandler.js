const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', err.stack);

  // Standardize error response format
  res.status(500).json({
    error: {
      message: 'Something went wrong!',
      details: err.message || 'No additional error details available',
    },
  });
};

module.exports = errorHandler;
