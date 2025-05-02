const express = require("express");
const router = express.Router();
const multer = require("multer");
const Gaushala = require("../models/Gaushala");
const {
  registerGaushala,
  loginGaushala,
} = require("../controllers/GaushalaController");
const auth = require("../middleware/authMiddleware");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {
  setTodayMilk,
  getMilkHistory,
} = require("../controllers/GaushalaController");

// 🥛 Milk Routes
router.put("/milk-today", auth, setTodayMilk);
router.get("/milk-history", auth, getMilkHistory);

// 📝 Auth Routes
router.post("/register", registerGaushala);
router.post("/login", loginGaushala);

// 👤 Logged-in Gaushala Info
router.get("/me", auth, async (req, res) => {
  const gaushala = await Gaushala.findById(req.gaushala.id).lean();
  if (!gaushala) return res.status(404).json({ message: "Not found" });

  if (gaushala.photo?.data) {
    gaushala.photo = `data:${gaushala.photo.contentType};base64,${gaushala.photo.data.toString("base64")}`;
  } else {
    gaushala.photo = null;
  }

  res.json(gaushala);
});

// ✅ List of Approved Gaushalas (without photo for faster loading)
router.get("/approved", async (req, res) => {
  try {
    const gaushalas = await Gaushala.find({ status: "approved" }).select("-_v -photo").lean();
    res.json(gaushalas);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch gaushalas", error: err.message });
  }
});

// ✅ Serve a Gaushala's image (faster, lazy load from frontend)
router.get("/:id/photo", async (req, res) => {
  try {
    const gaushala = await Gaushala.findById(req.params.id);
    if (!gaushala || !gaushala.photo || !gaushala.photo.data) {
      return res.status(404).send("No image found");
    }
    res.set("Content-Type", gaushala.photo.contentType);
    res.send(gaushala.photo.data);
  } catch (err) {
    res.status(500).send("Failed to load image");
  }
});

// 📸 Update Gaushala Profile Photo
router.put("/update-photo", auth, upload.single("photo"), async (req, res) => {
  try {
    const gaushala = await Gaushala.findById(req.gaushala.id);
    if (!gaushala)
      return res.status(404).json({ message: "Gaushala not found" });

    gaushala.photo = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    await gaushala.save();
    res.json({ message: "Photo updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

module.exports = router;
