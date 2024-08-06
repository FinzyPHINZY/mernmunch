import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import OrderController from "../controllers/OrderController";

const router = express.Router();

// desc             Create Checkout session
// route            POST /api/checkout
router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  OrderController.CreateCheckoutSession
);

export default router;
