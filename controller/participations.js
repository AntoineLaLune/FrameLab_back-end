import * as participationsModel from "../model/participations.js";

// GET
export async function getParticipations(req, resp) {
	const data = await participationsModel.getParticipations(req?.query?.user_id, req?.query?.challenge_id, req?.query?.limit, req?.query?.offset, req?.query?.created, req?.query?.rand);
	resp.json({
		success: true,
		participations: data,
	});
}
export async function getParticipation(req, resp) {
	const data = await participationsModel.getParticipation(req.params.id);
	resp.json({
		success: true,
		participations: data
	});
}

// POST
export async function postParticipation(req, resp) {
	const data = await participationsModel.addParticipation("/participations/" + req.file.filename, req.body.challenge_id, req.user.id);
	resp.json({
		success: true,
		participations: data
	});
}

// DEL
export async function deleteParticipation(req, resp) {
	await participationsModel.removeParticipation(req.params.id);
	resp.json({
		success: true
	});
}
