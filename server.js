const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({
  path: "./config.env",
});

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// //console.log(process.env)
mongoose
  .connect(
    // process.env.LOCAL_DB,
    db,

    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Db connection successful! ..........");
  });

app.listen(6000, () => {
  console.log("the server is running........");
});
