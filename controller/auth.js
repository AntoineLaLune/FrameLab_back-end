import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as usersModel from "../model/users.js";
import * as usersUtils from "../utils/users.js";

export async function authByLogin(req, resp) {
	// Verify format
	const emailVerifFormResp = await usersUtils.verifyEmailFormat(req.body.email);
	if (!emailVerifFormResp.success) {return resp.status(401).json(emailVerifFormResp);}

	// Verify exist
	const emailSlotFree = await usersUtils.checkEmailExist(req.body.email);
	if (!emailSlotFree.success) {return resp.status(401).json(emailSlotFree);} // Return l'erreur ainsi que le message qui vient avec

	// Verify correct
	const passwordIsValid = await usersUtils.checkPassword(req.body.password, req.body.email);
	if (!passwordIsValid.success) {return resp.status(401).json(passwordIsValid);}

	const data = await usersModel.getUserByEmail(req.body.email);
	// Return the token, valid for 30 days
	const token = jwt.sign({ id: data.id }, process.env.SECRET_KEY, { expiresIn: "30d" });
	resp.cookie("session", token, { maxAge: 1000 * 60 * 60 * 24 * 2 });
	resp.json({
		success: true,
		data: data
	});
}


export async function authBySession(req, resp, next) {
	// Verify if token exist in the cookies or header authorization
	if (!req.header("Authorization") && !req.cookies.session) {
		return resp.status(401).json({
			success: false,
			message: "Session non reçus."
		});
	}

	let token
	// Get the token
	if (req.cookies.session) {
		token = req.cookies.session;
	} else { token = req.header("Authorization").split(" ")[1]; }

	let tokenData
	// Verify if the token is valid with the secret key
	try {
		tokenData = jwt.verify(token, process.env.SECRET_KEY);
	} catch (err) {
		return resp.status(401).json({
			success: false,
			message: "Session invalide."
		});
	}

	// Verify if the user link to the token still exist
	const data = await usersModel.getUser(tokenData.id);
	if (!data) {
		return resp.status(401).json({
			success: false,
			message: "L'utilisateur n'est pas trouvé."
		});
	}

	// Prepare object of the next constroller
	req.user = data;
	next();
}

export async function authByRegister(req, resp) {
	// Verify formats
	const emailVerifFormResp = await usersUtils.verifyEmailFormat(req.body.email);
	if (!emailVerifFormResp.success) {return resp.json(emailVerifFormResp);}

	const PasswordVerifFormResp = await usersUtils.verifyPasswordFormat(req.body.password);
	if (!PasswordVerifFormResp.success) {return resp.json(PasswordVerifFormResp);}

	const lastNameVerifFormResp = await usersUtils.verifyNameFormat(req.body.lastName);
	if (!lastNameVerifFormResp.success) {return resp.json(lastNameVerifFormResp);}

	const firstNameVerifFormResp = await usersUtils.verifyNameFormat(req.body.firstName);
	if (!firstNameVerifFormResp.success) {return resp.json(firstNameVerifFormResp);}

	// Create the user
	const pwsHash = await bcrypt.hash(req.body.password, 12)
	await usersModel.createUser(req.body.email, req.body.lastName, req.body.firstName, pwsHash);

	const data = await usersModel.getUserByEmail(req.body.email);
	// Create a token, valid for 1 hour
	jwt.sign({ id: data.id }, process.env.SECRET_KEY, { expiresIn: "1h" });
	resp.json({
		success: true,
	});
}

export async function authVerify(req, resp) {
	let token;
	// Get the token
	if (req.query.token) {
		token = req.query.token
	} else {
		return resp.status(401).json({
			success: false,
			message: "Le token est introuvable."
		});
	}

	let tokenData
	// Verify if the token is valid with the secret key
	try {
		tokenData = jwt.verify(token, process.env.SECRET_KEY);
	} catch (err) {
		resp.status(401).json({
			success: false,
			message: "Session invalide."
		});
		return;
	}

	// Verify if the user link to the token still exist
	const data = await usersModel.getUser(tokenData.id);
	if (!data) {
		return resp.status(401).json({
			success: false,
			message: "L'utilisateur n'est pas trouvé."
		});
	}

	// Return the token, valid for 30 days
	token = jwt.sign({ id: data.id }, process.env.SECRET_KEY, { expiresIn: "30d" });
	resp.cookie("session", token, { maxAge: 1000 * 60 * 60 * 24 * 30 });
	resp.json({
		success: true,
		data: data
	});
}

export function authLogout(req, resp) {
	res.clearCookie('session').json({
		success: true,
	});
}
