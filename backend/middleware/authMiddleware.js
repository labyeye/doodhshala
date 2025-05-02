const jwt = require("jsonwebtoken");
const Gaushala = require("../models/Gaushala");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token. Authorization denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const gaushala = await Gaushala.findById(decoded.id).select("-password");

    if (!gaushala) {
      return res.status(404).json({ message: "Gaushala not found" });
    }

    req.gaushala = gaushala;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid", error: err.message });
  }
};

module.exports = authMiddleware;
