var express = require("express");
var router = express.Router({ mergeParams: true });
var customerController = require("../controller/customerController");
const authorize = require("../middleware/verify");

/* GET User's customers. */
router.get("/", authorize.authenticationToken, async (req, res) => {
  const { id } = req.user;
  const arr = await customerController.getCustomersByUser(id);
  res.status(200).json({ arr });
});

/* GET customer details. */
router.get("/:customerId", authorize.authenticationToken, async (req, res) => {
  const { userId, customerId } = req.params;
  const arr = await customerController.getCustomerByUserAndCustomer(
    userId,
    customerId
  );
  res.status(200).json({ arr });
});

router.post("/edit", authorize.authenticationToken, async (req, res) => {
  try {
    const customer = req.body;
    const arr = await customerController.editCoustomer(customer);
    res.status(200).json({ arr });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
