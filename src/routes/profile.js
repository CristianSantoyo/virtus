const express = require('express');
const db = require('../database');
const router = express.Router();
const {isLoggedIn, isUser} = require("../lib/auth");
const helperFormulario = require('../lib/helperFormularios');

router.get('/', isLoggedIn, isUser, async (req, res) => {
    
    const cedula = req.session.passport.user.k_cedula_persona;
    
    const result = await db.query("SELECT * FROM persona WHERE k_cedula ='"+cedula+"'");
    const institucion = await db.query("SELECT n_nombre FROM institucion_educativa WHERE k_id = ?", [result[0].fk_id_institucion]);
    const facultad = await db.query("SELECT n_nombre FROM facultad WHERE k_id = ?", [result[0].k_id_facultad]);
    const area = await db.query("SELECT * FROM area WHERE k_id = ?", [result[0].k_id_area]);
    const ciclo = await db.query("SELECT n_nombre FROM ciclo_propedeutico WHERE k_id = ?", [result[0].k_id_ciclo]);
    
    //console.log(area);
    res.render('templates/usuario/profile/profile', { result: result[0], institucion: institucion[0], facultad: facultad[0], area: area[0], ciclo: ciclo[0] });
});



router.get('/editar/',  isLoggedIn, isUser, async (req, res) => {
    
    const cedula = req.session.passport.user.k_cedula_persona;

    const info = await db.query("SELECT * FROM persona WHERE k_cedula ='"+cedula+"'");    
    const instituciones = await db.query("SELECT * FROM institucion_educativa");
    const facultades = await db.query("SELECT * FROM facultad");
    const ciclos = await db.query("SELECT * FROM ciclo_propedeutico");
    const areas = await db.query("SELECT * FROM area");
    
    res.render('templates/usuario/profile/profileEdit', { info: info[0], instituciones, facultades, ciclos, areas });
});

router.post('/editar/:id',  isLoggedIn, isUser, async (req, res) => {
    const {id} = req.params;
    const formulario = req.body;
    await helperFormulario.actualizarDatosDocente(id, formulario, req.files);
    res.redirect('/perfil');
});


module.exports = router;