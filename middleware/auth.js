const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
    return async (req, res, next) => {
      try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
          return res.status(401).json({ message: 'No token provided' });
        }
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
  
        if (roles.length && !roles.includes(decoded.role)) {
          return res.status(403).json({ message: 'Access denied' });
        }
  
        next();
      } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
      }
    };
  };
  
  module.exports = auth;