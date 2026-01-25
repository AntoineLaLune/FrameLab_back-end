import * as challengesModel from "../model/challenges.js";

export async function getAllChallenges(req, resp) {
	const data = await challengesModel.getAllChallenges();
	resp.json({
		success: true,
		challenges: data
	})
}

export async function getChallengeById(req, resp) {
	const data = await challengesModel.getChallengeById(req.params.id);
	resp.json({
		success: true,
		challenge: data
	})
}

export async function getLastChallenge(req, resp) {		
	const data = await challengesModel.getLastChallenge();
	resp.json({
		success: true,
		challenge: data
	})
}

export async function getArchiveChallenge(req, resp) {		
	const data = await challengesModel.getArchiveChallenge();
	resp.json({
		success: true,
		challenge: data
	})
}

export async function postChallenge(req, resp) {
	const data = await challengesModel.addChallenge(req.body.title, req.body.description, "/challenges/"+req.file.filename, req.body.startDate, req.body.endDate, req.body.creatorId);
	resp.json({
		success: true,
	})
}

export async function deleteChallenge(req, resp) {
	const data = await challengesModel.removeChallenge(req.params.id);
	resp.json({
		success: true,
	})
}
