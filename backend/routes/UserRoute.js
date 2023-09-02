const router = require("express").Router();
const {
  userLogin,
  userRegister,
  logout,
} = require("../controllers/UserController");

router.post("/signup", userRegister);
router.post("/login", userLogin);
router.post("/logout", logout);

module.exports = router;
