//jshint esversion: 8
const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require('passport');
require('../../config/passport')(passport);

//imported variables

const {registerEvent, addTeamMember, removeTeamMember, unregisterEvent, changePasswordHandler,contactUsTwoHandler,contactUsOneHandler} = require('../../controllers/main/user');

router.post("/contactUs",[
    check("contactUserName")
    .isLength({ min: 4 })
    .withMessage("name should be at least 3 char")
    .isAlpha()
    .withMessage("Name should only contains A-Z"),
    check("contactEmail", "Please provide a valid email").isEmail(),
    ],contactUsOneHandler,contactUsTwoHandler);

router.post("/register/:eventId", passport.authenticate('jwt',{session: false}), registerEvent);

router.post("/addTeamMember/:teamId", passport.authenticate('jwt', {session: false}), addTeamMember);

router.post("/removeTeamMember/:teamId/:memberId", passport.authenticate('jwt', {session: false}), removeTeamMember);

router.post("/unregister/:teamId", passport.authenticate('jwt', {session: false}), unregisterEvent);

router.post("/changePassword",passport.authenticate('jwt',{session: false}),changePasswordHandler);

module.exports = router;