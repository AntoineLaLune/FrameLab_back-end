import bcrypt from "bcrypt";

import * as usersModel from "../model/users.js";

export async function checkPassword(password, email) {
	const userPassword = await usersModel.getUserPasswordByEmail(email);
	const validPassword = await bcrypt.compare(password, userPassword.password); // Vérifie si le mot de passe est correct
	if (!validPassword) {
		return {
			success: false,
			message: "Le mot de passe est invalide."
		};
	} else {
		return {
			success: true,
		};
	}
}

export async function checkEmailIsNotUsed(email) {
	const userData = await usersModel.getUserByEmail(email);
	if (userData) {
		return {
			success: false,
			message: "L'adresse email est déjà utilisé."
		};
	} else {
		return {
			success: true,
		};
	}
}

export async function checkEmailExist(email) {
	const userData = await usersModel.getUserByEmail(email);
	if (!userData) {
		return {
			success: false,
			message: "L'adresse email n'existe pas."
		};
	} else {
		return {
			success: true,
		};
	}
}

export async function verifyPasswordFormat(password) {
	const regexPassord = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.,]).{8,}$/;
	if (!regexPassord.test(password)) {
		return {
			success: false,
			message: "Le mot de passe doit faire au moins 8 caractères de long et inclure une majuscule, un minuscule, un chiffre, et un caractère speciale (#?!@$%^&*-.,)"
		};
	} else {
		return {
			success: true,
		};
	}
}

export async function verifyEmailFormat(email) {
	const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; 
	if (!regexEmail.test(email)) {
		return {
			success: false,
			message: "Le format de l'adresse email est invalide."
		};
	} else {
		return {
			success: true,
		};
	}
}

export async function verifyNameFormat(name) {
	if (name == null || name == "") {
		return {
			success: false,
			message: "Veuillez remplir votre prénom / nom de famille"
		};
	} else {
		return {
			success: true,
		};
	}
}
