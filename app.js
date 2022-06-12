const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.static(__dirname + "/Views")); //use css for loading
app.use(bodyParser.urlencoded({extended: true})); // use for post method on html
app.set("view engine", "ejs"); //define of EJS : Views folder :
const date = require(__dirname + "/date.js"); //loading external Js , using () to call it


var item = ["Buy the grocery", "Buy chicken"];
var workitem = ["Made the dishes", "Making food"];
var typelist = "Buy things";



app.get("/", function(req, res) {
  res.render('index', {
    page: typelist,
    date: date.getday(),
    newitem: item
  }) //we have just one render at all -  index.ejs is existed already
})

app.post("/", function(req, res) {
  if (req.body.list === "work") {
    workitem.push(req.body.newtodo)
    res.redirect("/work")
  } else {
    item.push(req.body.newtodo)
    res.redirect("/")
  }
})

app.get("/work", function(req, res) {
  res.render('index', {
    page: "work",
    date: date.getday(),
    newitem: workitem
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log("server is started.")
})
