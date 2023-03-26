const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connect = require('./db/connect');

const authRouter = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

const startup = async () => {
  try {
    await connect(process.env.MANGO_URI);
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  } catch (error) {
    console.log('Error from startup fnc', error);
  }
};

startup();
