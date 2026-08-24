// Task 3 — Auth guard: validates Bearer token, attaches employee to req
const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
  const header = req.headers.authorization;

  // Expect "Bearer <token>"
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.employee = decoded; // { id, role, name }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = authGuard;
