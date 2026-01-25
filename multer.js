import multer from "multer";
import path from "path";

const acceptedFormat = [ "png", "jpeg", "jpg", "webp" ];


const challenge_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/challenges');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

export const uploadChallengeImage = multer({ storage : challenge_storage, limits : { fileSize : 1000000 }, fileFilter : function(req, file, cb) {
    // Check format
    const filetypes = /jpeg|jpg|png|webp|gif/; // regex
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Seul ces formats d'images sont supportés : jpeg, jpg, png, gif)");
    }
    }
})

const participation_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/participations');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

export const uploadParticipationImage = multer({ storage : participation_storage, limits : { fileSize : 1000000 }, fileFilter : function(req, file, cb) {
    // Check format
    const filetypes = /jpeg|jpg|png|webp|gif/; // regex
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Seul ces formats d'images sont supportés : jpeg, jpg, png, gif)");
    }
    }
})
