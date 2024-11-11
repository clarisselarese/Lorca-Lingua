const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.filename + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// setting file limits and validations
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter: (req, file, cb) => {
    const filetypes = "/pdf|doc|docx|jpg|jpeg|png";
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (extname) {
      return cb(null, true);
    } else {
      cb("Error: Only PDF, DOC, DOCX, JPG, JPEG, and PNG files are allowed");
    }
  },
});

app.use(express.static(__dirname));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// single file upload
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send(`No file uploaded.`);
  }
  res.send(`file uploaded: ${req.file.filename}`);
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});