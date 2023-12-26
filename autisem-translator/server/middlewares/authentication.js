const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY } = process.env;

function authenticateJWT(req, res, next) {
  const token = req.header('Authorization').split(' ')[1];
  const { userName } = req.query;
  console.log("req.query",req.query)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      // Token is invalid or expired
      if (err.name === 'TokenExpiredError') {
        // Token is expired, issue a new one
        const newToken = jwt.sign({userName}, SECRET_KEY, { expiresIn: '2m' });
        res.setHeader('X-New-Token', newToken);
        req.user = { userName }; 
        return next();
      } else {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
      }
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;