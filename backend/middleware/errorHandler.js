// Task 3 — Global error handler: returns structured JSON, never raw stack
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Mongoose validation error → 400
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ success: false, message: messages.join('; ') });
  }

  // Mongoose duplicate key → 400
  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: 'Duplicate field value' });
  }

  // Default → 500
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
