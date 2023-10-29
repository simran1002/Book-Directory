require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const { connectDB } = require("./Configs/db");
const Routes = require("./Routes/router");
const bodyParser = require("body-parser");

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(Routes);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "GOOD TO GO",
  });
});
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
