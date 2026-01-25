import * as commentsModel from "../model/comments.js";

export async function getAllComments(req, resp) {
		const data = await commentsModel.getAllComments();
		resp.json({
				success: true,
				comments: data
		})
}

export async function getComment(req, resp) {
		const data = await commentsModel.getComment(req.params.id);
		resp.json({
				success: true,
				comments: data
		})
}

export async function postComment(req, resp) {
		const data = await commentsModel.addComment(req.params.content, req.params.user_id, req.params.participation_id);
		resp.json({
				success: true,
		})
}

export async function deleteComment(req, resp) {
		const data = await commentsModel.removeComment(req.params.id);
		resp.json({
				success: true,
		})
}
