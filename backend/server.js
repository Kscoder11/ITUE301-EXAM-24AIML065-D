// server.js — Express entry point
// Task 3: mounts middleware (logger, authGuard, errorHandler) + all routes
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Middleware
const requestLogger = require('./middleware/requestLogger');
const authGuard = require('./middleware/authGuard');
const errorHandler = require('./middleware/errorHandler');

// Routes
const authRoutes = require('./routes/auth');
const leaveTypeRoutes = require('./routes/leaveTypes');
const leaveRoutes = require('./routes/leaves');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Global middleware ---
app.use(cors());
app.use(express.json());
app.use(requestLogger); // Task 3: logs every request

// --- Public routes (no authGuard) ---
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/leave-types', leaveTypeRoutes);

// --- Protected routes (authGuard applied) ---
app.use('/api/v1/leaves', authGuard, leaveRoutes);

// --- Global error handler (must be last) ---
app.use(errorHandler);

// --- Start server after DB connection ---
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
