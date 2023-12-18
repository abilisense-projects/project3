const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY } = process.env;

function authenticateJWT(req, res, next) {
  const token = req.header('Authorization').split(' ')[1];;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;