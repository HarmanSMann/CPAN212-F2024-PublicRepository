const express = require("express");
const app = express();
const PORT = 8000 || process.env.PORT;

// router file(s)
const router = require("./router");

app.use("/", router);

app.listen(PORT, () => {
  console.log(`http://127.0.0.1:${PORT}`);
});
