const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();
const jwt = require('jsonwebtoken')

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
  database: env.SQL_DATABASE,
  multipleStatements: true,
});

app.get('/admin', (req, res) => {
  const {func} = req.query;
  
})

app.get('/booking', (req, res) => {
  const {func, sid, vid} = req.query;
  let avail, error;
  const query = `CALL Show_Availability(${sid}, ${vid}, @avail, @error); SELECT @avail`;
  connection.query(query, (err, rows, fields) => {
    if (error){
      console.error(error);
      res.sendStatus(403);
    }
    res.send(rows[0][0]);
  })
})

app.post('/booking', (req, res) => {
  const {func} = req.query;
  const {seat, bid} = req.body;
  const query = `CALL InsertSeatNo(${seat}, ${bid})`;
  connection.query(query, (err, rows, fields) => {
    if (err){
      console.error(err);
      res.sendStatus(403);
    }
    res.sendStatus(200);
  })
  
});

app.post('/login', (req, res) => {
  const {uid, password } = req.body;
  const query = `CALL VerifyUserCredentials(\'${uid}\', \'${password}\', @verified, @error); SELECT @verified, @error;`;
  connection.query(query, (err, rows, fields) => {
    if (err){
      console.error(err);
      res.sendStatus(403);
    }
    res.send(rows[1][0]);
  })
})

app.post('/register', (req, res) => {
  const { name, email, age, gender, mobile, uname, password } = req.body;
  const query = `CALL InsertUser(\'${name}\', \'${email}\', ${age}, 
  \'${gender}\', ${mobile}, \'${uname}\', \'${password}\')`;
  connection.query(query, (err, rows, fields) => {
    if (err){
      console.error(err);
      res.sendStatus(409);
    }
    res.sendStatus(200);
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});