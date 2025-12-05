import { Router } from "express";

import * as challengesController from "./controller/challenges.js";
import * as participationsController from "./controller/participations.js";
import * as commentsController from "./controller/comments.js";
import * as votesController from "./controller/votes.js";


const router = Router();

/**
 *  @openapi
 *  /challenges/{challengeId}:
 *    get:
 *      summary: Find challenge by ID.
 *      description: Returns a single challenge.
 *      operationId: getChallengeById
 *    tags:
 *      - challenge
 *    parameters:
 *      - name: challengeId
 *        in: path
 *        description: ID of challenge to return
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      200:
 *        description: successful operation
 *      400:
 *        description: Invalid ID supplied
 *      404:
 *        description: Pet not found
 *      default:
 *        description: Unexpected error
 *      
 */
router.get("/challenges", challengesController.getAllChallenges); // ALL

/**
 *  @openapi
 *  /challenges/{challengeId}:
 *    get:
 *      summary: Find challenge by ID.
 *      description: Returns a single challenge.
 *      operationId: getChallengeById
 *    tags:
 *      - challenge
 *    parameters:
 *      - name: challengeId
 *        in: path
 *        description: ID of challenge to return
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      200:
 *        description: successful operation
 *      400:
 *        description: Invalid ID supplied
 *      404:
 *        description: Pet not found
 *      default:
 *        description: Unexpected error
 *      
 */
router.get("/challenges/:id", challengesController.getChallenge); // ALL

router.get("/participations", participationsController.getAllParticipations); // ALL
router.get("/participations/:id", participationsController.getParticipation); // ALL
router.get("/comments", commentsController.getAllComments); // ALL
router.get("/comments/:id", commentsController.getComment); // ALL
router.get("/votes", votesController.getAllVotes); // ALL
router.get("/votes/:id", votesController.getVote); // ALL
// router.post("/challenges/:id", challengesController.updateChallenge); // ADMIN ONLY
// router.post("/participations/:id", participationsController.updateParticipation); // USER
// router.post("/comments/:id", commentsController.updateComment); // USER
// router.post("/votes/:id", votesController.updateVote); // USER
//router.delete("/challenges/:id", challengesController.removeChallenge); // ADMIN ONLY
//router.delete("/participations/:id", participationsController.removeParticipation); // USER
// router.delete("/comments/:id", commentsController.removeComment); // USER
// router.delete("/votes/:id", votesController.removeVote); // USER
//router.put("/challenges/:id", challengesController.updateChallenge); // ADMIN ONLY
//router.put("/participations/:id", participationsController.updateParticipation); // USER
//router.put("/comments/:id", commentsController.updateComment); // USER
//router.put("/votes/:id", votesController.updateVote); // USER

export default router;