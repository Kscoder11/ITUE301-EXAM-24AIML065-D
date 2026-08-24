// Task 3 — Global request logger: logs [METHOD] [PATH] [TIMESTAMP]
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.path} [${timestamp}]`);
  next();
};

module.exports = requestLogger;
