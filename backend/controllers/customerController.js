const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerCustomer = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    const existing = await Customer.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
    });

    await newCustomer.save();
    res.status(201).json({ message: "Customer registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration error", error: err.message });
  }
};

exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, customer: { id: customer._id, name: customer.name, email: customer.email } });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};
