const mongoose = require('mongoose');

module.exports = (uri) => {
  return mongoose.connect(uri);
};
