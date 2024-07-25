import express from "express";
import userController from "../controllers/userController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

// desc     Create User in Database
// route    POST /api/user/
router.post("/", jwtCheck, userController.createCurrentUser);

export default router;
