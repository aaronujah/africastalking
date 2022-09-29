const dotenv = require("dotenv");
const express = require("express");
dotenv.config({ path: "./config.env" });

// extra security packages
const cors = require("cors");

app = express();
port = process.env.PORT || 3000;

const connectDB = require("./db/connect");

//routers
const ussdRouter = require("./route");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./errorController");

app.use(cors());

// routes
app.use("/ussd", ussdRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
