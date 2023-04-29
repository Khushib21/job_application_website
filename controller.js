const { response } = require("express");
const express = require("express");
const router = express.Router();
const app = express();
const port = 5000;
router.get("/getjobs", (request, response) => {
  var work_ex = request.query.work_ex;
  var domain = request.query.domain;
  var salary = request.query.salary;
  var location = request.query.location;
  console.log(salary);
  fetchjobs(work_ex, domain, salary, location, response);
});
router.post("/usersubmit", (req, response) => {
  const { name, user_name, pwd } = req.body;
  feed(name, user_name, pwd, response);
});
app.use("/", router);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
function fetchjobs(work_ex, domain, salary, location, response) {
  console.log("inside fetch");
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
        console.log("No of rows= " + result.affectedRows);
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

    var sql = "INSERT INTO users (name,user_name,pwd) VALUES (?,?,?);";
    con.query(sql, [name, user_name, pwd], function (err, result) {
      if (err) throw err;
      if (result.affectedRows == 1)
        response.send("Account is created successfully!");
      else response.send("Sorry! Try again");
    });
  });
}
