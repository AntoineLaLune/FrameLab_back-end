import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as usersModel from "../model/users.js";
import * as usersUtils from "../utils/users.js";

export async function authByLogin(req, resp) {
	// Verify email format
	const emailVerifFormResp = await usersUtils.verifyEmailFormat(req.body.email);
	if (!emailVerifFormResp.success) {return resp.json(emailVerifFormResp);}

	// Check email exist
	const emailSlotFree = await usersUtils.checkEmailExist(req.body.email);
	if (!emailSlotFree.success) {return resp.json(emailSlotFree);} // Return l'erreur ainsi que le message qui vient avec

	// Check password is correct
	const passwordIsValid = await usersUtils.checkPassword(req.body.password, req.body.email);
	if (!passwordIsValid.success) {return resp.json(passwordIsValid);}

	const userData = await usersModel.getUserByEmail(req.body.email);
	const token = jwt.sign({ id: userData.id }, process.env.SECRET_KEY, { expiresIn: "2 days" }); // Renvoie le token valide pour 2 jours
	resp.cookie("session", token, { maxAge: 1000 * 60 * 60 * 24 * 2 });
	resp.json({
		success: true,
		userData: userData
	});
}


export async function authBySession(req, resp, next) {
	if (!req.header("Authorization") && !req.cookies.session) { // Vérifie si le token est présent dans les cookies ou dans les header Authorization
		return resp.status(401).json({
			success: false,
			message: "Session non reçus."
		});
	}

	let token
	if (req.cookies.session) { // Prend le token depuis les cookies ou depuis les header Authorization
		token = req.cookies.session;
	} else { token = req.header("Authorization").split(" ")[1]; }

	let tokenData
	try { // Vérifie si le token est valide à partir de la clé secrète
		tokenData = jwt.verify(token, process.env.SECRET_KEY);
	} catch (err) {
		return resp.status(401).json({
			success: false,
			message: "Session invalide."
		});
	}

	const userData = await usersModel.getUser(tokenData.id);
	if (!userData) { // Vérifie si l'user lié au token existe toujours
		return resp.status(401).json({
			success: false,
			message: "L'utilisateur n'est pas trouvé."
		});
	}

	// Prépare les objets pour le controller suivant
	req.email = userData.email;
	next();
}

export async function authByRegister(req, resp) {
	// Verify email Format
	const emailVerifFormResp = await usersUtils.verifyEmailFormat(req.body.email);
	if (!emailVerifFormResp.success) {return resp.json(emailVerifFormResp);}

	// Verify password Format
	const PasswordVerifFormResp = await usersUtils.verifyPasswordFormat(req.body.password);
	if (!PasswordVerifFormResp.success) {return resp.json(PasswordVerifFormResp);}

	// Verify last name format
	const lastNameVerifFormResp = await usersUtils.verifyNameFormat(req.body.lastName);
	if (!lastNameVerifFormResp.success) {return resp.json(lastNameVerifFormResp);}

	// Verify first name format
	const firstNameVerifFormResp = await usersUtils.verifyNameFormat(req.body.firstName);
	if (!firstNameVerifFormResp.success) {return resp.json(firstNameVerifFormResp);}
	
	// Create the user
	const pwsHash = await bcrypt.hash(req.body.password, 12)
	await usersModel.createUser(req.body.email, req.body.lastName, req.body.firstName, pwsHash);

	const userData = await usersModel.getUserByEmail(req.body.email);
	const token = jwt.sign({ id: userData.id }, process.env.SECRET_KEY, { expiresIn: "2 days" }); // Renvoie le token valide pour 2 jours
	resp.cookie("session", token, { maxAge: 1000 * 60 * 60 * 24 * 2 });
	resp.json({
		success: true,
		userData: userData
	});
}
