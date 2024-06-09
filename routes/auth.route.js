import express from "express";
import {
  forgotPasswordController,
  getAllOrdersController,
  getAllUsers,
  getOrdersController,
  loginConteroller,
  orderStatusController,
  registerConteroller,
  testController,
  updateProfileController,
} from "../controllers/auth.controller.js";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";

// route object
const router = express.Router();

// routing
// register || method post
router.post("/register", registerConteroller);

// Login|| post
router.post("/login", loginConteroller);

// Forgot password ||post
router.post("/forgot-password", forgotPasswordController);

// test routes ||admin
router.get("/test", requireSignIn, isAdmin, testController);

// Protected  User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected  Adminroute auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  console.log("in auth");
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//all orders
router.get("/all-users", requireSignIn, isAdmin, getAllUsers);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
