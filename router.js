import { Router } from "express";

import * as challengesController from "./controller/challenges.js";
import * as participationsController from "./controller/participations.js";
import * as commentsController from "./controller/comments.js";
import * as votesController from "./controller/votes.js";
import * as usersController from "./controller/users.js";
import * as authController from "./controller/auth.js";
import * as submitsUtil from "./utils/submits.js";

import { uploadChallengeImage, uploadParticipationImage } from "./multer.js";

const router = Router();

// ============================================
// AUTH ROUTES
// ============================================

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, firstName, lastName, password]
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/auth/register", authController.authByRegister);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/auth/login", authController.authByLogin);

/**
 * @openapi
 * /auth/verify:
 *   get:
 *     summary: Verify user session
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session verified
 *       401:
 *         description: Invalid session
 */
router.get("/auth/verify", authController.authVerify);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/auth/logout", authController.authBySession, authController.authLogout);

/**
 * @openapi
 * /auth/session:
 *   get:
 *     summary: Get current session user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *       401:
 *         description: Not authenticated
 */
router.get("/auth/session", authController.authBySession, usersController.getUserLoged);

// ============================================
// CHALLENGES ROUTES
// ============================================

/**
 * @openapi
 * /challenges/current:
 *   get:
 *     summary: Get current challenge
 *     tags: [Challenges]
 *     responses:
 *       200:
 *         description: Current active challenge
 */
router.get("/challenges/current", challengesController.getCurrentChallenge);

/**
 * @openapi
 * /challenges/archives:
 *   get:
 *     summary: Get archived challenges
 *     tags: [Challenges]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *       - in: query
 *         name: rand
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of archived challenges
 */
router.get("/challenges/archives", challengesController.getArchivesChallenges);

/**
 * @openapi
 * /challenges/{id}:
 *   get:
 *     summary: Get challenge by ID
 *     tags: [Challenges]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Challenge details
 *       404:
 *         description: Challenge not found
 */
router.get("/challenges/:id", challengesController.getChallenge);

/**
 * @openapi
 * /challenges:
 *   post:
 *     summary: Create new challenge
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, description, photoUrl, startDate, endDate]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               photoUrl:
 *                 type: string
 *                 format: binary
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Challenge created
 *       400:
 *         description: Invalid input
 */
router.post("/challenges",
	authController.authBySession,
	usersController.isUserAdmin,
	uploadChallengeImage.single("photoUrl"),
	challengesController.postChallenge
);

/**
 * @openapi
 * /challenges/{id}:
 *   delete:
 *     summary: Delete challenge
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Challenge deleted
 *       404:
 *         description: Challenge not found
 */
router.delete("/challenges/:id",
	authController.authBySession,
	usersController.isUserAdmin,
	challengesController.deleteChallenge
);

// ============================================
// PARTICIPATIONS ROUTES
// ============================================

/**
 * @openapi
 * /participations:
 *   get:
 *     summary: Get participations
 *     tags: [Participations]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: challenge_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *       - in: query
 *         name: created
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: rand
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of participations
 */
router.get("/participations", participationsController.getParticipations);

/**
 * @openapi
 * /participations/{id}:
 *   get:
 *     summary: Get participation by ID
 *     tags: [Participations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Participation details
 *       404:
 *         description: Participation not found
 */
router.get("/participations/:id", participationsController.getParticipation);

/**
 * @openapi
 * /participations:
 *   post:
 *     summary: Create participation
 *     tags: [Participations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [image, challenge_id]
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               challenge_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Participation created
 *       400:
 *         description: Invalid input
 */
router.post("/participations",
	authController.authBySession,
	uploadParticipationImage.single("file"),
	submitsUtil.checkCurrentChallenges, // Multer is needed for the req to be present
	submitsUtil.checkDoubleSubmit,
	participationsController.postParticipation
);

/**
 * @openapi
 * /participations/{id}:
 *   delete:
 *     summary: Delete participation
 *     tags: [Participations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Participation deleted
 *       404:
 *         description: Participation not found
 */
router.delete("/participations/:id",
	authController.authBySession,
	participationsController.deleteParticipation
);

// ============================================
// COMMENTS ROUTES
// ============================================

/**
 * @openapi
 * /comments:
 *   get:
 *     summary: Get comments
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: participation_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *       - in: query
 *         name: created
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: rand
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get("/comments", commentsController.getComments);

/**
 * @openapi
 * /comments/{id}:
 *   get:
 *     summary: Get comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment details
 *       404:
 *         description: Comment not found
 */
router.get("/comments/:id", commentsController.getComment);

/**
 * @openapi
 * /comments:
 *   post:
 *     summary: Create comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content, user_id, participation_id]
 *             properties:
 *               content:
 *                 type: string
 *               user_id:
 *                 type: integer
 *               participation_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comment created
 *       400:
 *         description: Invalid input
 */
router.post("/comments",
	authController.authBySession,
	commentsController.postComment
);

/**
 * @openapi
 * /comments/{id}:
 *   delete:
 *     summary: Delete comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment deleted
 *       404:
 *         description: Comment not found
 */
router.delete("/comments/:id",
	authController.authBySession,
	commentsController.deleteComment
);

// ============================================
// VOTES ROUTES
// ============================================

/**
 * @openapi
 * /votes:
 *   get:
 *     summary: Get votes
 *     tags: [Votes]
 *     parameters:
 *       - in: query
 *         name: participation_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *       - in: query
 *         name: rand
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of votes
 */
router.get("/votes", votesController.postVote);

/**
 * @openapi
 * /votes/{id}:
 *   get:
 *     summary: Get vote by ID
 *     tags: [Votes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vote details
 *       404:
 *         description: Vote not found
 */
router.get("/votes/:id", votesController.postVote);

/**
 * @openapi
 * /votes:
 *   post:
 *     summary: Create vote
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [creativity_note, technical_note, respect_theme_note, participation_id, user_id]
 *             properties:
 *               creativity_note:
 *                 type: integer
 *               technical_note:
 *                 type: integer
 *               respect_theme_note:
 *                 type: integer
 *               participation_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Vote created
 *       400:
 *         description: Invalid input
 */
router.post("/votes",
	authController.authBySession,
	votesController.postVote
);

/**
 * @openapi
 * /votes/{id}:
 *   delete:
 *     summary: Delete vote
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vote deleted
 *       404:
 *         description: Vote not found
 */
router.delete("/votes/:id",
	authController.authBySession,
	votesController.deleteVote
);

// ============================================
// USERS ROUTES
// ============================================

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get("/users/:id", usersController.getUser);

/**
 * @openapi
 * /users/edit:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Invalid input
 */
router.put("/users/edit",
	authController.authBySession,
	usersController.putUser
);

/**
 * @openapi
 * /users/edit-password:
 *   put:
 *     summary: Update user with password change
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password, newPassword, email, firstName, lastName]
 *             properties:
 *               password:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Invalid input
 */
router.put("/users/edit-password",
	authController.authBySession,
	usersController.putUserWithPassword
);

export default router;
