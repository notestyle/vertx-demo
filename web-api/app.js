const httpLib = require("http");
const express = require('express')
var path = require("path");


const app = express();
const http = httpLib.createServer(app);

app.use(
    "/static",
    express.static(path.join(__dirname, "../web/build//static"))
  );

app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "../web/build/index.html"))
);
 
http.listen(3000, () =>
  console.log("API listening on port 3000!")
);