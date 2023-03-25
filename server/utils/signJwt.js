const jwt = require('jsonwebtoken');

module.exports = (id, type) => {
  const secret =
    type === 'refresh' ? process.env.REFRESH_SECRET : process.env.ACCESS_SECRET;
  const expiresIn = type === 'refresh' ? '10d' : '10m';

  return jwt.sign({ id }, secret, { expiresIn });
};
