var mysql = require("mysql2");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config();

var con = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
});

const port = process.env.PORT;
app.listen(port, () =>
  console.log(`API is running on http://localhost:${port}`)
);

app.use(express.json());

app.get("/measurement/station=:stn", (req, res) => {
  const { stn } = req.params;

  con.query(
    `SELECT * FROM weatherdb.Measurement WHERE Station_idStation="${stn}";`,
    (err, result, field) => {
      if (err) throw err;
      res.status(200).send(result);
    }
  );
});

app.get("/measurement/id=:id", (req, res) => {
  const { id } = req.params;

  con.query(
    `SELECT * FROM weatherdb.Measurement WHERE idMeasurement=${id};`,
    (err, result, field) => {
      if (err) throw err;
      res.status(200).send(result);
    }
  );
});

app.post("/measurement", (req, res) => {
  const { id } = req.params;
  const { station } = req.body;
  var resultId = 0;

  if (station) {
    res.status(418).send({ message: "Please attach a valid JSON" });
  } else {
    con.query(
      `INSERT INTO weatherdb.Measurement (temperature, humidity, moisture, Station_idStation) VALUES ('${req.body.temperature}', '${req.body.humidity}', '${req.body.moisture}', '${req.body.location}');`,
      (err, result, field) => {
        if (err) throw err;
        resultId = result.insertId;
      }
    );

    var millisecondsToWait = 490;
    setTimeout(function () {
      con.query(
        `SELECT * FROM weatherdb.Measurement WHERE idMeasurement=${resultId};`,
        (err, result, field) => {
          if (err) throw err;
          res.status(200).send(result);
        }
      );
    }, millisecondsToWait);
  }
});

app.get("/station/id=:id", (req, res) => {
  const { id } = req.params;

  con.query(
    `SELECT * FROM weatherdb.Station WHERE idStation="${id}";`,
    (err, result, field) => {
      if (err) throw err;
      res.status(200).send(result);
    }
  );
});

app.get("/latest-measurement/station=:stn", (req, res) => {
  const { station } = req.body;

  const sql = "SELECT * FROM measurements ORDER BY timeStamp DESC LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(result[0]);
  });
});
