const Gaushala = require("../models/Gaushala");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerGaushala = async (req, res) => {
  try {
    const {
      gaushalaName,
      ownerName,
      phone,
      email,
      address,
      milkCapacity,
      breedType,
      deliveryRadius,
      password,
      aadharNumber,
      locationUrl,
    } = req.body;

    const existing = await Gaushala.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newGaushala = new Gaushala({
      gaushalaName,
      ownerName,
      phone,
      email,
      address,
      milkCapacity,
      breedType,
      deliveryRadius,
      password: hashedPassword,
      aadharNumber,
      locationUrl,
      status: "approved", // ✅ Auto-approve
    });

    await newGaushala.save();
    res
      .status(201)
      .json({ message: "Gaushala registered. Awaiting approval." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.loginGaushala = async (req, res) => {
  try {
    const { email, password } = req.body;
    const gaushala = await Gaushala.findOne({ email });

    if (!gaushala) return res.status(404).json({ message: "Not registered" });
    if (gaushala.status !== "approved")
      return res.status(403).json({ message: "Not approved yet" });
    console.log("Trying to login:", email);
    console.log("Gaushala found:", gaushala);
    console.log("Stored password:", gaushala.password);
    const isMatch = await bcrypt.compare(password, gaushala.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: gaushala._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      gaushala: { id: gaushala._id, gaushalaName: gaushala.gaushalaName },
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};
exports.setTodayMilk = async (req, res) => {
  try {
    const { morning, evening } = req.body;
    const today = new Date().toISOString().split("T")[0];

    const gaushala = await Gaushala.findById(req.gaushala._id);
    if (!gaushala) return res.status(404).json({ message: "Not found" });

    gaushala.milkToday = { morning, evening };

    const existing = gaushala.milkAvailabilityHistory.find((d) => d.date === today);
    if (existing) {
      existing.morning = morning;
      existing.evening = evening;
    } else {
      gaushala.milkAvailabilityHistory.push({ date: today, morning, evening });
    }

    await gaushala.save();
    res.json({ message: "Milk updated", milkToday: gaushala.milkToday });
  } catch (err) {
    res.status(500).json({ message: "Error updating milk", error: err.message });
  }
};

exports.getMilkHistory = async (req, res) => {
  try {
    const gaushala = await Gaushala.findById(req.gaushala._id);
    res.json(gaushala.milkAvailabilityHistory || []);
  } catch (err) {
    res.status(500).json({ message: "Error fetching milk history", error: err.message });
  }
};

