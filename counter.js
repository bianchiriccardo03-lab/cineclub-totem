const express = require('express');
const app = express();

// Serve static files from 'public' folder
app.use(express.static('public'));

let counter = 0;

app.get('/value', (req, res) => {
  res.send(`${counter}`);
});

app.get('/inc', (req, res) => {
  const increment = parseInt(req.query.n) || 0;
  counter += increment;
  res.send(`Counter has been incremented by ${increment}`);
});

app.get('/dec', (req, res) => {
  const decrement = parseInt(req.query.n) || 0;
  counter -= decrement;
  res.send(`Counter has been decremented by ${decrement}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
