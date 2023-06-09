const { model, Schema } = require('mongoose');

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Task', taskSchema);
