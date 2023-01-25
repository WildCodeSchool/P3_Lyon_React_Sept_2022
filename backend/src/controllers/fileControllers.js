/* eslint-disable import/newline-after-import */
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const uploadFolder = process.env.UPLOADS_FOLDER;
const fileRename = (req, res, next) => {
  if (req.file) {
    // On récupère le nom du fichier
    const { originalname } = req.file;

    // On récupère le nom du fichier
    const { filename } = req.file;

    //
    const renamedFile = `${uuidv4()}-${originalname}`;
    // On utilise la fonction rename de fs pour renommer le fichier
    fs.rename(
      `${uploadFolder}${filename}`,
      `${uploadFolder}${renamedFile}`,
      (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          req.renamedFile = renamedFile;
          next();
        }
      }
    );
  } else {
    req.renamedFile = null;
    next();
  }
};

module.exports = {
  fileRename,
};
