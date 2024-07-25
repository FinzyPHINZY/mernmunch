import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

// desc     Create User in Database
// route    POST /api/user/
router.post("/", userController.createCurrentUser);

export default router;
