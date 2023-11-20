const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();

require('dotenv').config();
env = process.env;
const PORT = env.PORT || 5000;

app.use(cors());
app.use(express.query());
app.use(express.json());

const connection = mysql.createConnection({
  host: env.SQL_SERVER,
  user: env.SQL_USER,
  password: env.SQL_PASSWORD,
  database: env.SQL_DATABASE
});

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});