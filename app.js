const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

const routes = require("./routes/routes");

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", routes);

const PORT = process.env.PORT || 3050;

app.listen(PORT);