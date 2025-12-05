import * as votesModel from "../model/votes.js";

export async function getAllVotes(req, resp) {
    const data = await votesModel.getAllVotes();
    resp.json(data)
}

export async function getVote(req, resp) {
    const data = await votesModel.getVote(req.params.id);
    resp.json(data)
}

//    resp.send(data);
