const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

/**
 * Middleware to verify if the user is authenticated.
 * It checks for a valid JWT token in the Authorization header.
 */
const isAuthenticated = (req, res, next) => {
  try {
    // 1️⃣ Get token from Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
        error: "No token provided"
      });
    }

    // 2️⃣ Extract token (format: "Bearer <token>")
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
        error: "Invalid token format"
      });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, JWT_KEY);

    // 4️⃣ Attach user info to request
    req.user = decoded;

    // 5️⃣ Move to next handler
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message
    });
  }
};

module.exports = { isAuthenticated };
