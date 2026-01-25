import bcrypt from "bcrypt";

import * as usersModel from "../model/users.js";
import * as usersUtils from "../utils/users.js";

export async function getUser(req, resp) {
		const data = await usersModel.getUser(req.id);
		resp.json(data);
}

export async function getUserByEmail(req, resp) {
		const data = await usersModel.getUserByEmail(req.email);
		resp.json(data);
}

export async function putUser(req, resp) {
	// Check Password Is Correct
	const passwordIsValid = await usersUtils.checkEmailIsNotUsed(req.body.password, req.body.email);
	if (!passwordIsValid.success) {return resp.json(passwordIsValid);} // Return l'erreur ainsi que le message qui vient avec

	// Check Email Is Not Used
	const emailSlotFree = await usersUtils.checkEmailIsNotUsed(req.body.newEmail);
	if (!emailSlotFree.success) {return resp.json(emailSlotFree);}

	// Verify Email Format
	const emailVerifFormResp = await usersUtils.verifyEmailFormat(req.body.newEmail);
	if (!emailVerifFormResp.success) {return resp.json(emailVerifFormResp);}

	// Verify Nom Format
	const lastNameVerifFormResp = await usersUtils.verifyNameFormat(req.body.newLastName);
	if (!lastNameVerifFormResp.success) {return resp.json(lastNameVerifFormResp);}

	// Verify Prénom Format
	const firstNameVerifFormResp = await usersUtils.verifyNameFormat(req.body.newFirstName);
	if (!firstNameVerifFormResp.success) {return resp.json(firstNameVerifFormResp);}

	const pwsHash = await bcrypt.hash(req.body.password || req.body.password, 12) // Chiffre le mot de passe
	const data = await usersModel.updateUser(
		req.body.newEmail._rawValue || req.body.newEmail,
		req.body.newLastName._rawValue || req.body.newLastName,
		req.body.newFirstName._rawValue || req.body.newFirstName,
		req.body.email._rawValue || req.body.email
	);

	resp.json({
		success: true
	})
}

export async function putUserWithPassword(req, resp) {
	// Check Password Is Correct
	const passwordIsValid = await usersUtils.checkEmailIsNotUsed(req.body.password, req.body.email);
	if (!passwordIsValid.success) {return resp.json(passwordIsValid);} // Return l'erreur ainsi que le message qui vient avec

	// Check Email Is Not Used
	const emailSlotFree = await usersUtils.checkEmailIsNotUsed(req.body.newEmail);
	if (!emailSlotFree.success) {return resp.json(emailSlotFree);}

	// Verify Password Format
	const newPasswordVerifFormResp = await usersUtils.verifyPasswordFormat(req.body.newPassword);
	if (!newPasswordVerifFormResp.success) {return resp.json(newPasswordVerifFormResp);}

	// Verify Email Format
	const emailVerifFormResp = await usersUtils.verifyEmailFormat(req.body.newEmail);
	if (!emailVerifFormResp.success) {return resp.json(emailVerifFormResp);}

	// Verify Nom Format
	const lastNameVerifFormResp = await usersUtils.verifyNameFormat(req.body.newLastName);
	if (!lastNameVerifFormResp.success) {return resp.json(lastNameVerifFormResp);}

	// Verify Prénom Format
	const firstNameVerifFormResp = await usersUtils.verifyNameFormat(req.body.newFirstName);
	if (!firstNameVerifFormResp.success) {return resp.json(firstNameVerifFormResp);}

	const pwsHash = await bcrypt.hash(req.body.newPassword, 12) // Chiffre le mot de passe
	const data = await usersModel.uptadeUserWithPassword(
		req.body.newEmail,
		req.body.newLastName,
		req.body.newFirstName,
		pwsHash,
		req.body.email
	);

	resp.json({
		success: true
	})
}

export async function isUserAdmin(req, resp, next) {
	const userData = await usersModel.getUserByEmail(req.email);
	if (!userData.is_admin) {
		return {
			success: false,
			message: "L'utilisateur require les droit d'administrateur."
		};
	}
	next();
}