const express = require('express');
const app = express();
const port = 3000;
const { v4: uuid } = require('uuid');

app.use(express.json());

let users = [
  { id: 1, name: 'Hải Phạm', email: 'Haipham@gamil.com' },
  { id: 2, name: 'Thành Tân', email: 'tanThanh123@gamil.com' },
];


app.get('/users', (req, res) => {
  res.json(users);
});


app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Khong tim thay User');
  }
});
function checkUserData(req, res, next) {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).send( 'Thieu thong tin ' );
    }
    next();
  }
  

app.post('/users',checkUserData, (req, res) => {
  const newUser = {
    id: uuid(),
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});


app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    const existingUser = users[userIndex];
    const updatedUser = {
      id: userId,
      name: req.body.name !== undefined ? req.body.name : existingUser.name,
      email: req.body.email !== undefined ? req.body.email : existingUser.email,
    };
    users[userIndex] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).send('Khong tim thay User');
  }
});


app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send('Thong tin dax duoc cap nhat');
  } else {
    res.status(404).send('Thong tin dax duoc cap nhat');
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
