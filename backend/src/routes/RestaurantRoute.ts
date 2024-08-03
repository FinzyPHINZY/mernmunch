const express = require("express");
const router = express.Router();

import RestaurantController from "../controllers/RestaurantController";
import { validateParameters } from "../middleware/validation";

// desc       Fetch restaurant in location
// route      GET /restaurant/search/:city
router.get(
  "/search/:city",
  validateParameters,
  RestaurantController.searchRestaurant
);

export default router;
