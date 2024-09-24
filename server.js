import express from "express";
import bodyParser from "body-parser";

const app = express();

const todos = [];
const PORT = 3000;

app.use((req, rest, next) => {
  next();
});
// Middle Ware
app.use(express.static("public")); // Load static files
app.use(bodyParser.urlencoded({ extended: true })); // body-parser

// Set view engine to ejs
app.set("view engine", "ejs");
// Routes

app
  .route("/")
  .get((req, res) => {
    //   res.sendFile(process.cwd() + "");
    res.render("index", {
      title: new Date().toLocaleDateString(),
      todos: todos,
    });
  })
  .post((req, res) => {
    todos.push(req.body);
    console.log(req.body);
    res.redirect("/");
  });

// Server set up
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
