require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const customerRouter = require("./route/customers");
const authRouter = require("./route/auth");
const { usersService } = require("./entity/user");
const { authenticationToken } = require("./middleware/verify");
app.use(express.json());

app.use("/customers", customerRouter);
app.use("/auth", authRouter);

app.get("/check-token", authenticationToken, (req, res) => {
  const user = req.user;
  res.json({ user });
});

app.listen(3001);
