const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");

const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const postControllers = require("./controllers/postControllers");
const categoryControllers = require("./controllers/categoryControllers");
const groupControllers = require("./controllers/groupControllers");
const commentControllers = require("./controllers/commentControllers");

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
router.delete("/api/users/:id", verifyToken, userControllers.destroy);

// appel de mes posts personnel

router.get("/api/myposts/limit/:base", postControllers.browseMyPosts);

// Gestion des posts

router.get("/api/posts/limit/:base", postControllers.browse);
router.get("/api/posts/:id", postControllers.read);
router.post("/api/posts", postControllers.add);
router.put("/api/posts/:id", postControllers.edit);
router.delete("/api/posts/:id", postControllers.destroy);

// Gestion des categories
router.get("/api/categories", categoryControllers.browse);
router.get("/api/categories/:id", categoryControllers.read);
router.post("/api/categories", categoryControllers.add);
router.put("/api/categories/:id", categoryControllers.edit);
router.delete("/api/categories/:id", verifyToken, categoryControllers.destroy);

// Gestion des groupes
router.get("/api/groups", groupControllers.browse);
router.get("/api/groups/:id", groupControllers.read);
router.post("/api/groups", groupControllers.add);
router.put("/api/groups/:id", groupControllers.edit);
router.delete("/api/groups/:id", verifyToken, groupControllers.destroy);

// Gestion des commentaires
router.get("/api/posts/:id/comments", commentControllers.browse);
router.post("/api/posts/:id/comments", commentControllers.add);
router.delete(
  "/api/posts/:id/comments/:comment_id",
  verifyToken,
  commentControllers.destroy
);

module.exports = router;
