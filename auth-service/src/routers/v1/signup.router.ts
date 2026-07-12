import express from "express";
import { SignUpController } from "@/controllers/signup.controller";
import { validateRequestBody } from "@/middlewares/validateRequestbody.middleware";
import { createUserSchema } from "@/validators/signup.validator";

export const signupRouter = express.Router();

signupRouter.post(
	"/",
	validateRequestBody(createUserSchema),
	SignUpController.signUp,
);
