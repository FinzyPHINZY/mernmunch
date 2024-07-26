import express from "express";
import userController from "../controllers/userController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

// desc     Fetch User from Database
// route    GET /api/user/
router.get("/", jwtCheck, jwtParse, userController.getCurrentUser);

// desc     Create User in Database
// route    POST /api/user/
router.post("/", jwtCheck, userController.createCurrentUser);

// desc     Update User in Database
// route    PUT /api/user/
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  userController.updateCurrentUser
);

export default router;
