const express = require('express'),
    session = require('express-session'),
    path = require("path"),
    app = express()


app.use(express.static('public'))
app.use(express.static('views'))



app.listen(process.env.PORT || 3000)