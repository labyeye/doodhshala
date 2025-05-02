const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

require("dotenv").config();

const app = express();
connectDB();

// ✅ CORS setup to allow frontend (port 3000) access
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// ✅ Parse JSON and FormData
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded files (document images) statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api/gaushalas", require("./routes/gaushalaRoutes")); // ✅ Fixed typo

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
