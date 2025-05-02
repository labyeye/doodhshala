const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  registerGaushala,
  loginGaushala,
} = require("../controllers/GaushalaController");
const auth = require("../middleware/authMiddleware");

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});
const {
  setTodayMilk,
  getMilkHistory,
} = require("../controllers/GaushalaController");

router.put("/milk-today", auth, setTodayMilk);
router.get("/milk-history", auth, getMilkHistory);

// ✅ Fix this line to handle file uploads
router.post("/register",registerGaushala);
router.post("/login", loginGaushala);
router.get("/me", auth, (req, res) => {
  res.json(req.gaushala);
});

module.exports = router;
