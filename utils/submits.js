import * as challengesModel from "../model/challenges.js";

export async function checkCurrentChallenges(req, resp, next) {
	const current_challenge = await challengesModel.getCurrentChallenge();
	if (req.body.challenge_id == !current_challenge.id) {
		resp.status(400);
		resp.json({
			message: "Votre projet ne cible pas le challenge actuel."
		});
	} else {
		next();
	}
}
