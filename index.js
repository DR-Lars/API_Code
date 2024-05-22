var mysql = require("mysql");
const express = require("express");
const app = express();
const port = 8080;

app.listen(port, () =>
  console.log(`API is running on http://localhost:${port}`)
);

app.use(express.json());

app.get("/station", (req, res) => {
  res.status(200).send({
    idWeatherStation: "4",
    Temperature: 22,
    Humidity: 48,
    Moisture: 28,
    TimeStamp: "2024-05-22 00:16:25",
    Location: 1,
  });
});

app.post("/station/:id", (req, res) => {
  const { id } = req.params.id;
  const { station } = req.body;

  if (station) {
    res.status(418).send({ message: "Please attach a JSON" });
  } else {
    res.status(200).send({
      idWeatherStation: req.body.idWeatherStation,
      Temperature: req.body.Temperature,
      Humidity: req.body.Humidity,
      Moisture: req.body.Moisture,
      TimeStamp: req.body.TimeStamp,
      Location: req.body.Location,
    });
  }
});
