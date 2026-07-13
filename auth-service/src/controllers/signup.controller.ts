import { Request, Response } from "express";
import { SignUpRepository } from "../repositories/signup.repository";
import { SignUpService } from "../services/signup.service";
import jwt from "jsonwebtoken";
import { authConfig } from "@/config";

const signUpRepository = new SignUpRepository();
const signUpService = new SignUpService(signUpRepository);

export const SignUpController = {
	async signUp(req: Request, res: Response) {
		try {
			const { success, user, message } = await signUpService.createUser(
				req.body,
			);

			const payload = {
				id: user?.id,
				email: user?.email,
				role: user?.role,
			};

			const token = jwt.sign(payload, authConfig.JWT_PRIVATE_KEY!, {
				algorithm: "RS256",
				expiresIn: "1d",
			});

			res.cookie("leetcode_user", token, {
				sameSite: true,
				httpOnly: true,
			});

			return res.status(201).json({
				message,
				user,
				success,
			});
		} catch (error) {
			res.status(409).json({
				message:
					error instanceof Error ? error.message : "Something went wrong!",
				success: false,
			});
		}
	},
};
