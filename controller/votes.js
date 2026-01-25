import * as votesModel from "../model/votes.js";

export async function getAllVotes(req, resp) {
		const data = await votesModel.getAllVotes();
		resp.json({
				success: true,
				votes: data
		})
}

export async function getVote(req, resp) {
		const data = await votesModel.getVote(req.params.id);
		resp.json({
				success: true,
				votes: data
		})
}

export async function postVote(req, resp) {
		const data = await votesModel.addVote(req.params.creativity_note, req.params.technical_note, req.params.respect_theme_note, req.params.participation_id, req.params.user_id);
		resp.json({
				success: true,
		})
}

export async function deleteVote(req, resp) {
		const data = await votesModel.removeVote(req.params.id);
		resp.json({
				success: true,
		})
}
