import express from "express";
import { getAllUser, signup, login } from "../controllers/user-controller.js";
import auth from "../middleware/Authentication.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", auth, signup);
router.post("/login",auth, login);
export default router;
