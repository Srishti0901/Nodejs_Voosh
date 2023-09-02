const router = require("express").Router();
const { GetOrder, AddOrder } = require("../controllers/OrderController");
const { AuthMiddleware } = require("../Middleware/AuthMiddleware");

router.get("/get-order", AuthMiddleware, GetOrder);
router.post("/add-order", AuthMiddleware, AddOrder);

module.exports = router;
