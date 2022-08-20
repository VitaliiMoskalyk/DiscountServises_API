const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .then(() =>
    app.listen(5000, () => {
      console.log("Server running. Use your API on port: 5000");
    })
  )
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
