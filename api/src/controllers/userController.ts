import express, { Application } from "express";
import { User, UserModel } from "../database/models/user";
import jwt from "jsonwebtoken";
import { secret } from "../config/bcrypt";
import { DocumentType } from "@typegoose/typegoose";

export default class UserController {
  async get(_req: express.Request, _res: express.Response) {
    try {
      const { name, email, password: passwordBody } = _req.body;
      return _res.status(200).json({ id: 0 });
    } catch (err) {
      _res.status(500).json({ msg: "Internal Server Error, Something wrong" });
    }
  }

  async register(_req: express.Request, _res: express.Response) {
    try {
      const { email, password, name } = _req.body;
      if (!email || !password)
        return _res.status(400).json({
          success: false,
          status: 400,
          message: "Missing Data Required To Login",
        });
      const isUserExists = await UserModel.findOne({ email }).exec();
      if (isUserExists) {
        return _res.status(409).json({
          success: false,
          status: 409,
          message: "User already exists",
        });
      }
      const newUser: DocumentType<User> = await UserModel.create({
        ..._req.body,
      });
      // Create token
      const token = jwt.sign({ user_id: newUser.id, email }, secret, {
        expiresIn: "24h",
      });
      return _res.status(200).json({ token: token, user: newUser.toJSON() });
    } catch (err) {
      _res.status(500).json({ msg: "Internal Server Error, Something wrong" });
    }
  }

  async login(_req: express.Request, _res: express.Response) {
    const { email, password } = _req.body;
    console.log(email, password);
    if (!email || !password)
      return _res.status(400).json({
        success: false,
        status: 400,
        message: "Missing Data Required To Login",
      });

    const user = await UserModel.findOne({ email: email });
    if (user && (await user.validatePassword(password))) {
      const token = jwt.sign({ user_id: user.id, email }, secret, {
        expiresIn: "24h",
      });
      // save user token
      return _res.status(200).json({ token: token, user: user.toJSON() });
    } else {
      return _res
        .status(401)
        .json({ success: false, status: 401, message: "Invalid credentials" });
    }
  }
}
