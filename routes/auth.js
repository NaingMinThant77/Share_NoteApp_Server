const express = require("express");
const router = express.Router();
const { body } = require("express-validator")

const authController = require("../controllers/auth")
const User = require("../models/user")

// POST / register
router.post("/register", [
    body("username").trim().isLength({ min: 3 }).withMessage("Username is too short!").isLength({ max: 20 }).withMessage("Username is too long!").custom(async (value) => {
        const userDoc = await User.findOne({ username: value });
        if (userDoc) {
            throw new Error("Username is already existed.");
        }
    }),
    body("email").isEmail().withMessage("Please enter a valid email!").custom(async (value) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
            throw new Error("Email is already existed.");
        }
    }),
    body("password").trim().isLength({ min: 4 }).withMessage("Password is too short!")], authController.register)


// POST / login
router.post("/login", [body("email").isEmail().withMessage("Please enter a valid email!"),
body("password").trim().isLength({ min: 4 }).withMessage("Password is too short!")], authController.login)

// GET / status
router.get("/status", authController.checkStatus)

module.exports = router;