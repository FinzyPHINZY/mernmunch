import express from "express";
import restaurantController from "../controllers/myRestaurantController";
import { upload } from "../middleware/multer";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
import myRestaurantController from "../controllers/myRestaurantController";
const router = express.Router();

// desc          Fetch restaurant data
// route         GET /api/restaurant/
router.get("/", jwtCheck, jwtParse, restaurantController.getRestaurant);

// desc          Fetch orders
// route         GET /api/restaurant/
router.get(
  "/order",
  jwtCheck,
  jwtParse,
  myRestaurantController.getMyRestaurant
);

// desc          Update orders status
// route         PATCH /api/restaurant/
router.patch(
  "/order/:orderId/status",
  jwtCheck,
  jwtParse,
  myRestaurantController.updateOrderStatus
);

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

// desc          Fetch restaurant data
// route         PUT /api/restaurant/
router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  restaurantController.updateRestaurant
);

export default router;
