require("dotenv").config();

const express = require("express");

const multer = require("multer");

const router = express.Router();

const upload = multer({ dest: process.env.UPLOADS_FOLDER });

const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");
const fileControllers = require("./controllers/fileControllers");
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const postControllers = require("./controllers/postControllers");
const categoryControllers = require("./controllers/categoryControllers");
const groupControllers = require("./controllers/groupControllers");

// Authentification

router.post("/api/register", hashPassword, userControllers.add);
router.post(
  "/api/login",
  authControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Gestion des users
router.get("/api/users", userControllers.browse);
router.get("/api/users/:id", userControllers.read);
router.post("/api/users", hashPassword, userControllers.add);
router.put("/api/users/:id", userControllers.edit);
router.delete("/api/users/:id", userControllers.destroy);

// appel de mes posts personnel

router.get("/api/myposts/user/:id", postControllers.browseMyPosts);

// Gestion des posts

router.get("/api/posts/limit/:base", verifyToken, postControllers.browse); // Feed de base
router.get(
  "/api/posts/group/:group/limit/:base",
  postControllers.browseByGroup
); // Feed par groupe
router.get(
  "/api/posts/category/:category/limit/:base",
  postControllers.browseByCategory
); // Feed par category

router.get("/api/posts/:id", postControllers.read);
router.post(
  "/api/posts",
  upload.single("picture"),
  fileControllers.fileRename,
  postControllers.add
);
router.put("/api/posts/:id", postControllers.edit);
router.delete("/api/posts/:id", postControllers.destroy);

// Gestion des categories
router.get("/api/categories", categoryControllers.browse);
router.get("/api/categories/:id", categoryControllers.read);
router.post("/api/categories", categoryControllers.add);
router.put("/api/categories/:id", categoryControllers.edit);
router.delete("/api/categories/:id", categoryControllers.destroy);

// Gestion des groupes
router.get("/api/groups", groupControllers.browse);
router.get("/api/groups/:id", groupControllers.read);
router.post("/api/groups", groupControllers.add);
router.put("/api/groups/:id", groupControllers.edit);
router.delete("/api/groups/:id", groupControllers.destroy);

// Gestion des uploads
// route POST pour recevoir un fichier
router.post("/api/avatar", upload.single("avatar"), fileControllers.fileRename);

module.exports = router;
