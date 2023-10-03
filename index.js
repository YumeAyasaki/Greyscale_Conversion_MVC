const express = require('express');

const ImageRouter = require('./routes/imageRouter');
require('dotenv').config();

const app = express();

app.use(express.static('public'));

app.use('/image', ImageRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});