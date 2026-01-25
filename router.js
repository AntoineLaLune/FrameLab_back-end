import { Router } from "express";

import * as challengesController from "./controller/challenges.js";
import * as participationsController from "./controller/participations.js";
import * as commentsController from "./controller/comments.js";
import * as votesController from "./controller/votes.js";
import * as usersController from "./controller/users.js";
import * as authController from "./controller/auth.js";

import * as multer from "./multer.js";


const router = Router();

router.get("/challenges", challengesController.getAllChallenges); // ALL

router.post("/create_challenge", authController.authBySession, usersController.isUserAdmin, multer.uploadChallengeImage.single("photoUrl"), challengesController.postChallenge); // ALL

router.get("/challenges/:id", challengesController.getChallengeById);
router.get("/challenge/current", challengesController.getLastChallenge);
router.get("/challenge/archive", challengesController.getArchiveChallenge);

router.get("/participations", participationsController.getAllParticipations); // ALL
router.get("/participations/:id", participationsController.getParticipation); // ALL

router.post("/create_participation", authController.authBySession, usersController.isUserAdmin, multer.uploadParticipationImage.single("photoUrl"), participationsController.postParticipation); // ALL

router.get("/comments", commentsController.getAllComments); // ALL
router.get("/comments/:id", commentsController.getComment); // ALL
router.get("/votes", votesController.getAllVotes); // ALL
router.get("/votes/:id", votesController.getVote); // ALL

router.post("/auth/register", authController.authByRegister);
router.post("/auth/login", authController.authByLogin);
router.put("/users/edit", authController.authBySession, usersController.putUser);
router.put("/users/edit_with_password", authController.authBySession, usersController.putUserWithPassword);

router.get("/auth/session", authController.authBySession, usersController.getUserByEmail);

export default router;
