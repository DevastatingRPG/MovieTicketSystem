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

app.post('/admin', (req, res) => {
  let query;
  const { func } = req.query;
  const { vid, city, pincode, location, vtype, avail,
    sid, name, producer, stype, timing, lead } = req.body;
  // Stype is category'Action\',_utf8mb4\'Drama\',_utf8mb4\'Comedy\',_utf8mb4\'Thriller\',_utf8mb4\'Other\
  switch (func) {
    case 'insvenue':
      query = `CALL InsertVenue(${vid}, \'${city}\', ${pincode}, \'${location}\', \'${vtype}\', \'${avail}\')`;
      break;
    case 'insshow':
      query = `CALL InsertShow(${sid}, \'${name}\', \'${producer}\', \'${stype}\', \'${timing}\', \'${lead}\')`;
      break;
    case 'delvenue':
      query = `DELETE FROM venue WHERE vid=${vid}`;
      break;
    case 'delshow':
      query = `DELETE FROM shows WHERE sid=${sid}`;
      break;
  }

  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.error(err);
      res.sendStatus(403);
    }
    res.sendStatus(200);
  })


})

app.get('/booking', (req, res) => {
  const { func, uid, sid, vid } = req.query;
  let query;
  switch (func) {
    case 'avail':
      query = `CALL Show_Availability(${sid}, ${vid}, @avail, @error); SELECT @avail, @error`;
      connection.query(query, (err, rows, fields) => {
        if (err) {
          console.error(err);
          res.sendStatus(403);
        }
        let result = rows[1][0]
        let avail = result["@avail"];
        let error = result["@error"];
        if (error) {
          res.send(error);
        }
        else {
          res.send(avail);
        }
      })
      break;
    case 'list':
      query = 'SELECT * FROM event_location; SELECT VID, location FROM venue; SELECT SID, name FROM shows;';
      connection.query(query, (err, rows, fields) => {
        if (err) {
          console.error(err);
          res.sendStatus(403);
        }
        res.send(rows);
      })
      break;
    case 'occupied':
      query = `CALL GetOccupiedSeats(${sid}, ${vid}, @occupied); SELECT @occupied;`;
      connection.query(query, (err, rows, fields) => {
        if (err) {
          console.error(err);
          res.sendStatus(403);
        }
        res.send(rows[1][0]["@occupied"]);
      })
      break;
  }

})

app.post('/booking', (req, res) => {
  const { func } = req.query;
  const { uid, sid, pmeth, amount, stat, seat } = req.body;
  switch (func) {
    case 'insert':
      query = `
      CALL InsertBooking(${uid}, ${sid}, ${pmeth}, ${amount}, ${stat}, @bid);
      CALL InsertSeatNo(${seat}, @bid)`;
      break;
  }

  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.error(err);
      res.sendStatus(403);
    }
    res.sendStatus(200);
  })

});

app.post('/login', (req, res) => {
  const { uid, password } = req.body;
  const query = `CALL VerifyUserCredentials(\'${uid}\', \'${password}\', @verified, @error); SELECT @verified, @error;`;
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.error(err);
      res.sendStatus(403);
    }
    let result = rows[1][0];
    let verified = result["@verified"];
    let error = result["@error"];
    res.send(error);
  })
})

app.post('/register', (req, res) => {
  const { name, email, age, gender, mobile, uname, password } = req.body;
  const query = `CALL InsertUser(\'${name}\', \'${email}\', ${age}, 
  \'${gender}\', ${mobile}, \'${uname}\', \'${password}\')`;
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.error(err);
      res.sendStatus(409);
    }
    res.sendStatus(200);
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});