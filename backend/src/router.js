const express = require("express");

const router = express.Router();

const { hashPassword, verifyPassword } = require("./services/auth");

const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");

// Authentification

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

module.exports = router;
