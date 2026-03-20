require('dotenv').config();
const express = require('express');
const cors = require('cors');
const playersRouter = require('./routes/players');

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/players', playersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
