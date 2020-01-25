var express = require("express");
var router = express.Router();
const mariadb = require("mariadb");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Database Read by Gurjot" });
});

router.get("/data", function(req, res, next) {
  console.log("Server running");
  mariadb
    .createConnection({
      host: "localhost",
      user: "gurjot",
      password: "password",
      database: "gurjot"
    })
    .then(conn => {
      conn
        .query("SELECT * FROM customer JOIN user ON id=customer_id")
        .then(rows => {
          console.log("Successful Response");
          console.log(rows);
          res.render("data", { user_data: rows });
          conn.end();
        })
        .catch(err => {
          //handle query error
        });
    })
    .catch(err => {
      //handle connection error
    });
  //res.render("index", { title: "Express" });
});

module.exports = router;
