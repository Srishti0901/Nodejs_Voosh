require("dotenv").config();
const cors = require("cors");
const cookieparser = require("cookie-parser");
const express = require("express");
const orderRoute = require("./routes/OrderRoute");
const userRoute = require("./routes/UserRoute");
const connection = require("./config/db");
const app = express();
connection();
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use("/users", userRoute);
app.use("/order", orderRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("connected", port);
});
