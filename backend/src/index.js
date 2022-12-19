const express = require('express');
const route = require('./route');
const mongoose = require('mongoose');
const app = express();
var cors = require('cors')

app.use(express.json());
app.use(cors())



mongoose.connect("mongodb+srv://Arman:W0ZPcEp2jiZXKgid@cluster0.ilfh6.mongodb.net/feynman-dashboard", {
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route)


app.listen(process.env.PORT || 4000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 4000))
});