const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

// app.engine(file_extension, engine_use(directory))
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.set("view engine", ".hbs");

app.get("/", (req, res)=>{
  res.send("home page for handlebars")
})

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
