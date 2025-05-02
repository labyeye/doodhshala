const Order = require("../models/Order");

exports.getOrdersForGaushala = async (req, res) => {
  try {
    const orders = await Order.find({ gaushalaId: req.gaushala._id }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

exports.approveOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id, gaushalaId: req.gaushala._id });

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "approved";
    await order.save();

    res.json({ message: "Order approved", order });
  } catch (err) {
    res.status(500).json({ message: "Error approving order", error: err.message });
  }
};
