const express = require("express");
const router = express.Router();

import RestaurantController from "../controllers/RestaurantController";
import {
  validateParameters,
  validateRestaurantId,
} from "../middleware/validation";

router.get(
  "/:restaurantId",
  validateRestaurantId,
  RestaurantController.getRestaurant
);

// desc       Fetch restaurant in location
// route      GET /restaurant/search/:city
router.get(
  "/search/:city",
  validateParameters,
  RestaurantController.searchRestaurant
);

export default router;
