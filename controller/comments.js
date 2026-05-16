import * as commentsModel from "../model/comments.js";

// GET
// export async function getAllComments(req, resp) {
// 	const data = await commentsModel.getAllComments();
// 	resp.json({
// 		success: true,
// 		comments: data,
// 	});
// }
export async function getComments(req, resp) {
    const data = await commentsModel.getComments(req?.query?.user_id, req?.query?.participation_id, req?.query?.limit, req?.query?.offset, req?.query?.created, req?.query?.rand);
    resp.json({
        success: true,
        comments: data,
    });
}
export async function getComment(req, resp) {
	const data = await commentsModel.getComment(req.params.id);
	resp.json({
		success: true,
		comments: data,
	});
}

// POST
export async function postComment(req, resp) {
	const data = await commentsModel.addComment(
		req.params.content,
		req.params.user_id,
		req.params.participation_id,
	);
	resp.json({
		success: true,
		message: "Votre commentaire a bien était envoyé."
	});
}

// DEL
export async function deleteComment(req, resp) {
	const data = await commentsModel.removeComment(req.params.id);
	resp.json({
		success: true,
	});
}
