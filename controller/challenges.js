import * as challengesModel from "../model/challenges.js";

// GET
// export async function getAllChallenges(req, resp) {
// 	const data = await challengesModel.getAllChallenges(req?.query?.rand);
// 	resp.json({
// 		success: true,
// 		challenges: data,
// 	});
// }

export async function getChallenge(req, resp) {
	const data = await challengesModel.getChallenge(req.params.id);
	resp.json({
		success: true,
		challenge: data,
	});
}
export async function getCurrentChallenge(req, resp) {
	const data = await challengesModel.getCurrentChallenge();
	resp.json({
		success: true,
		challenge: data,
	});
}
export async function getArchivesChallenges(req, resp) {
	const data = await challengesModel.getArchivesChallenges(req?.query?.limit, req?.query?.offset, req?.query?.rand);
	resp.json({
		success: true,
		challenges: data,
	});
}

// POST
export async function postChallenge(req, resp) {
	await challengesModel.addChallenge(
		req.body.title,
		req.body.description,
		"/challenges/" + req.file.filename,
		req.body.startDate,
		req.body.endDate,
		req.body.creatorId,
	);
	resp.json({
		success: true,
		message: "Le challenge a bien était envoyé."
	});
}

// DEL
export async function deleteChallenge(req, resp) {
	await challengesModel.removeChallenge(req.params.id);
	resp.json({
		success: true,
	});
}
