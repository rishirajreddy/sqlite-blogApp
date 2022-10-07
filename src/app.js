const express = require('express');
const app = express();
const connectDB = require('./models')
const sqlite = require("sqlite3").verbose();
const postsDb = new sqlite.Database('./dev.sqlite');
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth_routes");
const postRoutes = require("./routes/post_routes");

connectDB.sequelize.sync()
    .then(() => {
        console.log("Connected to db");   
    }).catch((err) => {
        console.log(err.message);
    });
    
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.use("/users", authRoutes);
app.use("/posts", postRoutes);

module.exports = app;