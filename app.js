require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db.config")();

const app = express();

app.use(express.json());
console.log("oi: ", process.env.REACT_APP_URL);
app.use(cors({ origin: process.env.REACT_APP_URL }));
require("./config/passport.config")(app);

// Importar os roteadores
const buriedRouter = require("./routes/buried.routes");
app.use("/", buriedRouter);

const graveRouter = require("./routes/grave.routes");
app.use("/", graveRouter);

const cemeteryRouter = require("./routes/cemetery.routes");
app.use("/", cemeteryRouter);

const userRouter = require("./routes/user.routes");
app.use("/", userRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
