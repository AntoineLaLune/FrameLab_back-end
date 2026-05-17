import * as challengesModel from "../model/challenges.js";
import * as participationModel from "../model/participations.js";

export async function checkCurrentChallenges(req, resp, next) {
	const current_challenge = await challengesModel.getCurrentChallenge();
	if (req.body.challenge_id != current_challenge.id) {
		Deno.remove(req.file.path).catch(() => { });
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
		Deno.remove(req.file.path).catch(() => { });
		resp.status(400).json({
			message: "Vous avez déjà participé."
		});
		return;
	} else {
		next();
	}
}
