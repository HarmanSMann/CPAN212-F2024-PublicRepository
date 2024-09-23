const express = require("express");
const app = express();
const PORT = 8000;

app.get("/", (req, res)=>{
    res.send("Welcome to our server")
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
