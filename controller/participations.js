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
    resp.json(data)
}
