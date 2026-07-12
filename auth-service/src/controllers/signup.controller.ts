import { Request, Response } from "express";
import { SignUpRepository } from "../repositories/signup.repository";
import { SignUpService } from "../services/signup.service";
import jwt from "jsonwebtoken";

const signUpRepository = new SignUpRepository();
const signUpService = new SignUpService(signUpRepository);

export const SignUpController = {
	async signUp(req: Request, res: Response) {
		const { success, user, message } = await signUpService.createUser(req.body);
		if (success) {
			// const token = await jwt.sign();
			return res.status(201).json({
				message,
				user,
				success,
			});
		}

		if (!success) {
			return res.status(409).json({
				message,
				success,
			});
		}
	},
};
