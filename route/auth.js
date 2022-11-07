var express = require("express");
var router = express.Router();
var authController = require("../controller/authController");

/* Authentication User */
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const accessToken = await authController.authenticationUser({
      email,
      password,
    });
    res.status(200).json(accessToken);
  } catch (err) {
    res.status(403).json({ message: err });
    console.log(err);
  }
});

module.exports = router;
