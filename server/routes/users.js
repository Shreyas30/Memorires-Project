import express from "express";
const router = express.Router();
import {signin,signup} from "../Controllers/users.js";

router.post("/signin",signin);
router.post("/signup",signup);

export default router;