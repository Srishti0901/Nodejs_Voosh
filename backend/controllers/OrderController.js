const Order = require("../model/orderModel");

const AddOrder = async (req, res) => {
  const { user_id, subTotal, phoneNo } = req.body;
  try {
    const order = await Order.create({ user_id, subTotal, phoneNo });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const GetOrder = async (req, res) => {
  const user_id = req.user._id;
  // console.log(_id);
  try {
    const orders = await Order.find({ user_id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { AddOrder, GetOrder };
