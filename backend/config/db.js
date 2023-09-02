const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

const connection = () => {
  mongoose
    .connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("DB connected");
    })
    .catch((e) => {
      console.log(e.message);
    });
};

module.exports = connection;
