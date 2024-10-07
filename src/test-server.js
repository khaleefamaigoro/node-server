const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

//Middleware
app.use(express.json());
app.use(cors);

const USERS = [
  {id: 1, name: 'Mello', email: 'melody@mail.com', password: '12345'}
]

// Routes
app.get('/', (req, res) => {
  res.status(200).send({message: 'Hello express'});
});

app.post('/register', (req, res) => {
  const { user, email, password } = req.body;
  const hashPassword = bcrypt.hash(password, 10);
})


//Listening Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
})