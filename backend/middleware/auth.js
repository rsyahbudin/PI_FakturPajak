const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('No Authorization header found');
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log('No token found in Authorization header');
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authenticateToken;
