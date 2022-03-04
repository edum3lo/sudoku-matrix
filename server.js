const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
app.use(express.static('build'));
app.listen(PORT, function () { return console.log("Listening on port ".concat(PORT)); });
