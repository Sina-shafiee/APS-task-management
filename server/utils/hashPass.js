const bcrypt = require('bcryptjs');

module.exports = (pass) => {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(pass, salt);
};
