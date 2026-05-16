import * as votesModel from "../model/votes.js";

// GET
// export async function getAllVotes(req, resp) {
// 	const data = await votesModel.getAllVotes();
// 	resp.json({
// 		success: true,
// 		votes: data,
// 	});
// }
// export async function getVotes(req, resp) {
//  const data = await votesModel.getVotes(req.params.id);
//  resp.json({
//   success: true,
//   votes: data,
//  });
// }
// export async function getVote(req, resp) {
// 	const data = await votesModel.getVote(req.params.id);
// 	resp.json({
// 		success: true,
// 		votes: data,
// 	});
// }

// POST
export async function postVote(req, resp) {
	// @TODO Get participation
	if (req.user.id) {

	}
	const data = await votesModel.addVote(
		req.params.creativity_note,
		req.params.technical_note,
		req.params.respect_theme_note,
		req.params.participation_id,
		req.params.user_id,
	);
	resp.json({
		success: true,
		message: "Votre vote a bien était envoyé."
	});
}

// DEL
export async function deleteVote(req, resp) {
	const data = await votesModel.removeVote(req.params.id);
	resp.json({
		success: true,
	});
}
