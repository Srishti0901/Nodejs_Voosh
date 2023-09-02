const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToke");

const userRegister = async (req, res) => {
  const { name, phoneNo, password } = req.body;
  try {
    const phno = await User.findOne({ phoneNo });
    if (phno) {
      throw new Error("phoneno already Exists");
    }
    const user = await User.create({ name, phoneNo, password });
    const userId = user._id;
    const token = generateToken(userId);
    // console.log(token);
    res.status(200).json({
      user,
      accessToken: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  const { phoneNo, password } = req.body;
  try {
    const user = await User.findOne({ phoneNo });
    if (!user) {
      throw new Error("invalid phone no");
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error("invalid password");
    }

    const userId = user._id;
    const token = generateToken(userId);
    // console.log(token);

    await user.save();
    res.status(200).json({ user, accessToken: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwtsign", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json("User logged out");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { userLogin, userRegister, logout };
