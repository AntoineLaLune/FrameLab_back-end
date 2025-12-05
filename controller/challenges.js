import * as challengesModel from "../model/challenges.js";

export async function getAllChallenges(req, resp) {
    const data = await challengesModel.getAllChallenges();
    resp.json(data)
}

export async function getChallenge(req, resp) {
    const data = await challengesModel.getChallenge(req.params.id);
    resp.json(data)
}
