const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    social: {
      linkedin: String,
      github: String
    },
    role: {
      type: String,
      enum: ['super-admin', 'admin', 'user'],
      default: 'user'
    },
    skills: [String],
    language: [String]
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
