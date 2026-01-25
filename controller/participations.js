import * as participationsModel from "../model/participations.js";

export async function getAllParticipations(req, resp) {
		const data = await participationsModel.getAllParticipations();
		resp.json({
				success: true,
				participations: data
		})
}

export async function getParticipation(req, resp) {
		const data = await participationsModel.getParticipation(req.params.id);
		resp.json({
				success: true,
				participations: data
		})
}

export async function deleteParticipation(req, resp) {
		const data = await participationsModel.removeParticipation(req.params.id);
		resp.json({
				success: true,
		})
}

export async function postParticipation(params) {
		const data = await participationsModel.addParticipation(req.params.photo_url, req.params.challenge_id, req.params.user_id);
		resp.json({
				success: true,
				participations: data
		})
}
