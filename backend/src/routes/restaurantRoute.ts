import express from "express";
import restaurantController from "../controllers/restaurantController";
import { upload } from "../middleware/multer";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
const router = express.Router();

// desc          Fetch restaurant data
// route         GET /api/restaurant/
router.get("/", jwtCheck, jwtParse, restaurantController.getRestaurant);

// desc          Create a new restaurant
// route         POST /api/restaurant/
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  restaurantController.createResturant
);

export default router;
