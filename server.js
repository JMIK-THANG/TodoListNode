import express from "express";
import bodyParser from "body-parser";

const app = express();

var todos = [];
const PORT = 4000;

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
    todos.push(req.body); // body is object
    console.log(req);
    res.redirect("/");
  });

// Delete route

app.route("/delete/:id").get((req, res) => {
  const id = parseInt(req.params.id); // params is object (found in console when we log req)
  console.log(req);
  todos = todos.filter((todo, index) => {
    return id !== index;
  });
  res.redirect("/");
});

// Server set up
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
