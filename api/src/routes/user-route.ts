import express, { Application } from "express";
import { User, UserModel } from "../database/models/user";
import jwt from "jsonwebtoken";
import { secret } from "../config/bcrypt";
import { DocumentType } from "@typegoose/typegoose";
import UserController from "../controllers/userController";

const router = express.Router();
const controller = new UserController();

//Gets user with id
router.get("/:id", async (_req: express.Request, _res: express.Response) => {
  try {
    const { name, email, password: passwordBody } = _req.body;
    return _res.status(200).json({ id: 0 });
  } catch (err) {
    _res.status(500).json({ msg: "Internal Server Error, Something wrong" });
  }
});

//Creating a user
router.post("/login", controller.login);

//Creating a user
router.post("/register", controller.register);

export default router;
