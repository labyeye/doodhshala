const express = require("express");
const router = express.Router();
const multer = require("multer");
const Gaushala = require("../models/Gaushala");
const {
  registerGaushala,
  loginGaushala,
} = require("../controllers/GaushalaController");
const auth = require("../middleware/authMiddleware");
const storage = multer.memoryStorage(); // ✅ use memory storage for MongoDB
const upload = multer({ storage });

const {
  setTodayMilk,
  getMilkHistory,
} = require("../controllers/GaushalaController");

router.put("/milk-today", auth, setTodayMilk);
router.get("/milk-history", auth, getMilkHistory);

// ✅ Fix this line to handle file uploads
router.post("/register", registerGaushala);
router.post("/login", loginGaushala);
router.get("/me", auth, async (req, res) => {
  const gaushala = await Gaushala.findById(req.gaushala.id).lean();
  if (!gaushala) return res.status(404).json({ message: "Not found" });

  if (gaushala.photo?.data) {
    gaushala.photo = `data:${
      gaushala.photo.contentType
    };base64,${gaushala.photo.data.toString("base64")}`;
  } else {
    gaushala.photo = null;
  }

  res.json(gaushala);
});

router.get("/approved", async (req, res) => {
  try {
    const gaushalas = await Gaushala.find({ status: "approved" }).lean();

    const enriched = gaushalas.map((g) => ({
      ...g,
      photo: g.photo?.data
        ? `data:${g.photo.contentType};base64,${g.photo.data.toString(
            "base64"
          )}`
        : null,
    }));

    res.json(enriched);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch gaushalas", error: err.message });
  }
});

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
