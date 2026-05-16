import * as challengesModel from "../model/challenges.js";
import * as participationModel from "../model/participations.js";
import fs from "fs";  // File System from Node.js

export async function checkCurrentChallenges(req, resp, next) {
	const current_challenge = await challengesModel.getCurrentChallenge();
	if (req.body.challenge_id != current_challenge.id) {
		fs.unlink(req.file.path, () => {}); // Multer remove the image
		resp.status(400).json({
			message: "Votre projet ne cible pas le challenge actuel."
		});
		return;
	} else {
		next();
	}
}

export async function checkDoubleSubmit(req, resp, next) {
	const current_challenge = await challengesModel.getCurrentChallenge();
	const participation = await participationModel.getParticipations(req.user.id, current_challenge.id);
	if (participation.length == 1) {
		fs.unlink(req.file.path, () => {});
		resp.status(400).json({
			message: "Vous avez déjà participé."
		});
		return;
	} else {
		next();
	}
}
