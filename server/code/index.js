const { response } = require("express");
const express = require("express");
const router = express.Router();
const app = express();
const port = 5000;
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlparser = bodyParser.urlencoded();

router.get("/getjobs", (request, response) => {
  var work_ex = request.query.work_ex;
  var domain = request.query.domain;
  var salary = request.query.salary;
  var location = request.query.location;
  console.log(salary);
  fetchjobs(work_ex, domain, salary, location, response);
});
router.post("/usersubmit", jsonParser, (req, response) => {
  var name = req.body.name;
  var user_name = req.body.user_name;
  var pwd = req.body.pwd;

  feed(name, user_name, pwd, response);
});

router.post("/usersignin", urlparser, (req, response) => {
  var user_name = req.body.user_name;
  var pwd = req.body.pwd;

  compare(user_name, pwd, response);
});
app.use("/", router);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
function fetchjobs(work_ex, domain, salary, location, response) {
  var mysql = require("mysql");
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "mysql",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("connected!");
    var sql =
      "SELECT * From job Where reqd_ex<=? AND domain=? AND salary<=? AND location=?";
    con.query(
      sql,
      [work_ex, domain, salary, location],
      function (error, result) {
        if (error) throw error;
        response.json(result);
      }
    );
  });
}

function feed(name, user_name, pwd, response) {
  var mysql = require("mysql");
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "mysql",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("connected!");

    var res_text = "";
    const firstQueryPromise = new Promise((resolve, reject) => {
      var sql1 = "SELECT count(user_name) from mysql.users where user_name=?";
      con.query(sql1, [user_name], function (err, result) {
        console.log(result[0]);
        if (err) reject(err);
        if (result[0]["count(user_name)"] > 0) {
          res_text = "Username already exists!";
          flag = 1;
          resolve(res_text);
        } else {
          resolve("New User");
        }
      });
    });

    firstQueryPromise
      .then((firstRes) => {
        var secondQueryPromise;
        if (firstRes != "Username already exists!") {
          secondQueryPromise = new Promise((resolve, reject) => {
            var sql =
              "INSERT INTO mysql.users (name,user_name,pwd) VALUES (?,?,?);";
            con.query(sql, [name, user_name, pwd], function (err, result) {
              if (err) reject(err);
              if (result.affectedRows == 1)
                res_text = "Account created successfully!";
              else res_text = "Sorry! Try again";
              resolve(res_text);
            });
          });
        } else {
          secondQueryPromise = new Promise((resolve, reject) => {
            resolve("Username already exists!");
          });
        }

        return secondQueryPromise;
      })
      .then((secondQueryResult) => {
        console.log(secondQueryResult);
        response.send(secondQueryResult);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

function compare(user_name, pwd, response) {
  var mysql = require("mysql");
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "mysql",
  });
  var sql = "SELECT pwd from mysql.users WHERE user_name=?;";
  con.query(sql, [user_name], function (err, result) {
    console.log(result);
    if (err) throw err;
    if (pwd == result[0].pwd) {
      console.log("logged in");
      response.send("Logged in!");
    } else response.send("Wrong Password");
  });
}
