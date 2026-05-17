import multer from "multer";
import * as path from "@std/path";

const challenge_storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, './uploads/challenges');
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

export const uploadChallengeImage = multer({ storage : challenge_storage, limits : { fileSize : 1000000 }, fileFilter : function(_req, file, cb) {
    // Check format
    const filetypes = /jpeg|jpg|png|webp|gif/; // regex
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype) || file.mimetype === "image/*";

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Seul ces formats d'images sont supportés : jpeg, jpg, png, gif)");
    }
}})

const participation_storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, './uploads/participations');
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

export const uploadParticipationImage = multer({ storage : participation_storage, limits : { fileSize : 1000000 }, fileFilter : function(_req, file, cb) {
    // Check format
    const filetypes = /jpeg|jpg|png|webp|gif/; // regex
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype) || file.mimetype === "image/*";

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb("Seul ces formats d'images sont supportés : jpeg, jpg, png, gif)");
	}
}})
