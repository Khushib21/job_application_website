const fs = require("fs");
const { parse } = require("csv-parse");
var f = fs.createReadStream("./data/data_jobs.csv");
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
    "INSERT INTO job (job_id, comp_name, skills_reqd, jd, reqd_ex, salary, candi_reqd, start_date, location, quali_reqd, title, domain) VALUES ?;";
  var values = [];
  f.pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      values.push(row);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
      console.log("finished");
      console.log([values]);
      fun(values, sql);
    });
});
function fun(values, sql) {
  con.query(sql, [values], function (error, result) {
    if (error) throw error;
    console.log("No of rows= " + result.affectedRows);
  });
}
