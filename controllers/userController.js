import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/avatars/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000000 },
}).single("image");

export { storage, upload };
