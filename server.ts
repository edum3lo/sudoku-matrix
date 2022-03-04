const express = require('express');
const app = express();
const PORT = process.env.port || 3000;

app.use(express.static('build'));
app.listen(PORT, ():void => console.log(`Listening on port ${PORT}`))