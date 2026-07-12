import express from "express";
import { signupRouter } from "./v1/signup.router";

export const v1Router = express.Router();

v1Router.use("/signup", signupRouter);
