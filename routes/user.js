const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users.js");

// Routes for user registration (signup)
router
  .route("/signup")
  .get(userController.renderSignupForm) // Render the signup form
  .post(wrapAsync(userController.signup)); // Handle user registration

// Routes for user login
router
  .route("/login")
  .get(userController.renderLoginForm) // Render the login form
  .post(
    saveRedirectUrl, // Save the intended redirect URL before authentication
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login", // Redirect to login page on failure
    }),
    userController.login // Handle user login
  );

// Route for user logout
router.get("/logout", userController.logout); // Handle user logout

module.exports = router;
