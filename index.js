const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());

// Route: GET /hello
app.get('/hello', (req, res) => {
  res.send('Hello Express JS');
});

// Route: GET /user with query parameters for firstname and lastname
app.get('/user', (req, res) => {
  const firstname = req.query.firstname || 'Melina';
  const lastname = req.query.lastname || 'Behzadi Nejad';
  res.json({ firstname, lastname });
});

// Route: POST /user with path parameters for firstname and lastname
app.post('/user/:firstname/:lastname', (req, res) => {
  const { firstname, lastname } = req.params;
  res.json({ firstname, lastname });
});

// Route: GET /profile to serve JSON data from user.json
app.get('/profile', (req, res) => {
  fs.readFile('./user.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Server Error');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Route: POST /login to validate username and password
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  fs.readFile('./user.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Server Error');
    } else {
      const user = JSON.parse(data);
      if (user.username === username) {
        if (user.password === password) {
          res.json({ status: true, message: 'User is valid' });
        } else {
          res.json({ status: false, message: 'Password is invalid' });
        }
      } else {
        res.json({ status: false, message: 'Username is invalid' });
      }
    }
  });
});

// Route: GET /logout with username parameter
app.get('/logout/:username', (req, res) => {
  const username = req.params.username;
  res.send(`<b>${username} successfully logged out.</b>`);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).send('Server Error');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
