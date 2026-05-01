import * as challengesModel from "../model/challenges.js";

export async function checkCurrentChallenges(req, resp) {
	const current_challenge_id = await challengesModel.getCurrentChallenge().id;
	if ((req.params.challenge_id =! current_challenge_id) || (req.body.challenge_id =! current_challenge_id)) {
		resp.status(400);
		resp.json({
			message: "Votre projet ne cible pas le challenge actuel."
		});
	} else {
		resp.next();
	}
}
