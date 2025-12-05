import * as commentsModel from "../model/comments.js";

export async function getAllComments(req, resp) {
    const data = await commentsModel.getAllComments();
    resp.json(data)
}

export async function getComment(req, resp) {
    const data = await commentsModel.getComment(req.params.id);
    resp.json(data)
}
