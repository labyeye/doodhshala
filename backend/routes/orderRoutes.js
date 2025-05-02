const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getOrdersForGaushala, approveOrder } = require("../controllers/orderController");

router.get("/", auth, getOrdersForGaushala);
router.put("/:id/approve", auth, approveOrder);

module.exports = router;
