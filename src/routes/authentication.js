const express = require('express');
const router = express.Router();
const db = require('../database');
const passport = require('passport');
const {isNotLoggedIn} = require("../lib/auth");


router.get('/signup', isNotLoggedIn, async (req, res) => {
    const instituciones = await db.query("SELECT * FROM institucion_educativa");
    const ciclos = await db.query("SELECT * FROM ciclo_propedeutico");
    const areas = await db.query("SELECT * FROM area");
    const facultades = await db.query("SELECT * FROM facultad");
    res.render('templates/login/signup', {instituciones, ciclos, areas, facultades});
});

router.get('/loginAdmin', isNotLoggedIn, (req, res) => {
    res.render('templates/login/loginAdmin');
});

router.get('/signupAdmin', isNotLoggedIn, (req, res) => {
    res.render('templates/login/signupAdmin');
});

// Cerrar sesion
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect("/");
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
}));

router.post('/loginUsuario', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});



router.post('/loginAdmin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.loginAdmin', {
        successRedirect: '/homeAdmin',
        failureRedirect: '/loginAdmin',
        failureFlash: true
    })(req, res, next);
});



router.post('/signupAdmin', isNotLoggedIn, passport.authenticate('local.signupAdmin', {
        successRedirect: '/homeAdmin',
        failureRedirect: '/signupAdmin',
        failureFlash: true
}));





module.exports = router;