const express = require('express');
const db = require('../database');
const router = express.Router();
const helperFormularios = require('../lib/helperFormularios');
const helperResultados = require('../lib/helperResultados');
const {isLoggedIn, isNotLoggedIn, isUser} = require("../lib/auth");
// GET
router.get('/', isNotLoggedIn, (req, res) => {
    res.render('templates/inicio');
});

//Dirección para Usuario
router.get('/home', isLoggedIn, isUser, async (req, res) => {
    const cedula = req.session.passport.user.k_cedula_persona;
    const result = await db.query("SELECT R.k_cedula FROM resultadoherramientas R, resultadocompetenciastic T WHERE R.k_cedula = T.k_cedula AND R.k_cedula='"+cedula+"'");
    var r = {
        isEncuestaHecha : false
    }   
    if (result.length > 0){
        r.isEncuestaHecha = true;
    }
    res.render('templates/usuario/home', r);
});

router.get('/encuestaHerramientas', isLoggedIn, isUser, async (req, res) => {    
    res.render('templates/usuario/encuestaHerramientas');
});

router.get('/encuestaCompetencias', isLoggedIn, isUser, async (req, res) => {
    res.render('templates/usuario/encuestaCompetencias');
});

router.get('/resultados', isLoggedIn, isUser, async (req, res) => {
    const cedula = req.session.passport.user.k_cedula_persona;
    const resultadosCom = await helperResultados.obtenerResultadosCompetencias(cedula);
    const resultadosHer = await helperResultados.obtenerResultadosHerramientas(cedula);    
    res.render('templates/usuario/resultados', {resultadosCom, resultadosHer});   
});

router.get('/error', (req, res) => {
    //res.status(400);
    res.render('templates/error404');
});

router.post('/encuestaHerramientas/', isLoggedIn, isUser, async (req, res) => {    
    const cedula = req.session.passport.user.k_cedula_persona;
    const formulario = req.body;
    await helperFormularios.llenarFormularioHerramientas(cedula, formulario);
    //console.log(infoParaDB);    
    res.redirect("/home");
});

router.post('/encuestaCompetencias/', isLoggedIn, isUser, async (req, res) => {
    const cedula = req.session.passport.user.k_cedula_persona;
    const formulario = req.body;
    await helperFormularios.llenarFormularioCompetencias(cedula, formulario);  
    res.redirect('/home');
});


module.exports = router;
