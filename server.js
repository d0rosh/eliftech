const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const mongoURI = 'mongodb://Andrew:phantom13@ds259377.mlab.com:59377/eliftech';
mongoose
  .connect(process.env.MONGODB_URI || mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

// app.use(express.static(__dirname + '/build'));

// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/build/index.html'));
// });

const list = require('./routes/item');
app.use('/api', list);

// ****HANDLING ERRORS****

app.use((req, res, next) => {
  const err = new Error('not found!');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message
  });
});

const port = process.env.PORT || 3333;
app.listen(port, function() {
  console.log(`Server listen port ${port}`);
});
