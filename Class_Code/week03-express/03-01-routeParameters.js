const express = require("express");
const app = express();
const port = 8000;

app.use(express.urlencoded({extended:true}))

// ISNT THIS EASIER
app.get("/", (req, res) => {
  console.log(req.params)
  console.log(req.query)
  res.sendFile(__dirname + "/views" + "/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/views" + "/about.html");
});

app.get("/api/users", (req, res) => {
  const users = {
    1: { user_id: "user01", password: "password1" },
    2: { user_id: "user02", password: "password2" },
    3: { user_id: "user03", password: "password3" },
  };
  res.send(users);
});

app.get("/api/user/:id", (req, res) => {
  const users = {
    1: { user_id: "user01", name: "Harman", password: "password1" },
    2: { user_id: "user02", name: "Bob", password: "password2" },
    3: { user_id: "user03", name: "Billy", password: "password3" },
  };

  const userId = req.params.id;
  if (users[userId]) {
    res.send(users[userId]);
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
