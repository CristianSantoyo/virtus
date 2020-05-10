const express = require('express');
const db = require('../database');
const router = express.Router();
const {isLoggedIn, isAdmin} = require("../lib/auth");
const helperFormulario = require('../lib/helperFormularios');
const helperResultados = require('../lib/helperResultados');
//Dirección para Administrador
//GET
router.get('/homeAdmin', isLoggedIn, isAdmin, isAdmin, async (req, res) => {
    var usuarios = await db.query("SELECT * FROM persona");
    const instituciones = await db.query("SELECT n_nombre FROM institucion_educativa");
    const años = await db.query("SELECT n_año FROM persona GROUP BY n_año ASC");
    for (i = 0; i < usuarios.length; i++){
        const result = await db.query("SELECT R.k_cedula FROM resultadoherramientas R, resultadocompetenciastic T WHERE R.k_cedula = T.k_cedula AND R.k_cedula='"+usuarios[i].k_cedula+"'");
        if (result.length > 0){
            usuarios[i].isEncuestaHecha = true;
        } else {
            usuarios[i].isEncuestaHecha = false;
        }
    }
    //console.log(usuarios);
    res.render('templates/admin/homeAdmin', {usuarios, instituciones, años});
});

router.get('/agregarDocente', isLoggedIn, isAdmin, async (req, res) => {
    
    const instituciones = await db.query("SELECT * FROM institucion_educativa");
    const ciclos = await db.query("SELECT * FROM ciclo_propedeutico");
    const areas = await db.query("SELECT * FROM area");
    const facultades = await db.query("SELECT * FROM facultad");    
    res.render('templates/admin/agregarDocente', {instituciones, ciclos, areas, facultades});
});

router.get('/verPerfilAdmin/:cedula', isLoggedIn, isAdmin, async (req, res) => {
    const {cedula} = req.params;
    const result = await db.query("SELECT * FROM persona WHERE k_cedula ='"+cedula+"'");    
    const institucion = await db.query("SELECT n_nombre FROM institucion_educativa WHERE k_id = ?", [result[0].fk_id_institucion]);
    const facultad = await db.query("SELECT n_nombre FROM facultad WHERE k_id = ?", [result[0].k_id_facultad]);
    const area = await db.query("SELECT * FROM area WHERE k_id = ?", [result[0].k_id_area]);
    const ciclo = await db.query("SELECT n_nombre FROM ciclo_propedeutico WHERE k_id = ?", [result[0].k_id_ciclo]);
    res.render('templates/admin/verPerfilAdmin', { result: result[0], institucion: institucion[0], facultad: facultad[0], area: area[0], ciclo: ciclo[0] });
});

router.get('/editarPerfilAdmin/:cedula', isLoggedIn, isAdmin, async (req, res) => {
    const {cedula} = req.params;    
    const info = await db.query("SELECT * FROM persona WHERE k_cedula ='"+cedula+"'");    
    const instituciones = await db.query("SELECT * FROM institucion_educativa");
    const facultades = await db.query("SELECT * FROM facultad");
    const ciclos = await db.query("SELECT * FROM ciclo_propedeutico");
    const areas = await db.query("SELECT * FROM area");
    
    res.render('templates/admin/editarPerfilAdmin', { info: info[0], instituciones, facultades, ciclos, areas });
});

router.get('/llenarEncHerrAdmin/:cedula', isLoggedIn, isAdmin, (req, res) => {
    const {cedula} = req.params; 
    res.render('templates/admin/encuestaHerrAdmin', {cedula});
});

router.get('/llenarEncComAdmin/:cedula', isLoggedIn, isAdmin, (req, res) => {
    const {cedula} = req.params; 
    res.render('templates/admin/encuestaComAdmin', {cedula});
});

router.get('/verResultados/:cedula', isLoggedIn, isAdmin, async (req, res) => {
    const {cedula} = req.params;
    const resultadosCom = await helperResultados.obtenerResultadosCompetencias(cedula);
    const resultadosHer = await helperResultados.obtenerResultadosHerramientas(cedula);
    res.render('templates/admin/resultadosDocente', {cedula, resultadosCom, resultadosHer});
});


router.get('/resultadosbusqueda/:descripcion', isLoggedIn, isAdmin, async (req, res) => {
    const tipo = req.params;
    const resultados = await helperResultados.obtenerResultadosGenerales(tipo.descripcion);
    const resHerr = await helperResultados.obtenerConteoHerramientas(tipo.descripcion);
    const instituciones = await db.query("SELECT n_nombre FROM institucion_educativa");
    const años = await db.query("SELECT n_año FROM persona GROUP BY n_año ASC");
    //console.log(años);
    //console.log(resHerr);
    res.render('templates/admin/resultadosbusqueda', {tipo, resultados, resHerr, instituciones, años});
});

router.get('/resultadosbusqueda/:descripcion/:institucion', isLoggedIn, isAdmin, async (req, res) => {
    const tipo = req.params;
    const resultados = await helperResultados.obtenerResultadosGenerales(tipo.descripcion, tipo.institucion);
    const resHerr = await helperResultados.obtenerConteoHerramientas(tipo.descripcion, tipo.institucion);
    const instituciones = await db.query("SELECT n_nombre FROM institucion_educativa");
    const años = await db.query("SELECT n_año FROM persona GROUP BY n_año ASC");    
    res.render('templates/admin/resultadosbusqueda', {tipo, resultados, resHerr, instituciones, años});
});

router.get('/resbusquedaAno/:descripcion/:ano', isLoggedIn, isAdmin, async (req, res) => {
    const tipo = req.params;
    const resultados = await helperResultados.obtenerResultadosGenerales(tipo.descripcion, tipo.institucion, tipo.ano);
    const resHerr = await helperResultados.obtenerConteoHerramientas(tipo.descripcion, tipo.institucion, tipo.ano);
    const instituciones = await db.query("SELECT n_nombre FROM institucion_educativa");
    const años = await db.query("SELECT n_año FROM persona GROUP BY n_año ASC");
    res.render('templates/admin/resultadosbusqueda', {tipo, resultados, resHerr, instituciones, años});
});

router.get('/resbusquedaAno/:descripcion/:ano/:institucion', isLoggedIn, isAdmin, async (req, res) => {
    const tipo = req.params;
    const resultados = await helperResultados.obtenerResultadosGenerales(tipo.descripcion, tipo.institucion, tipo.ano);
    const resHerr = await helperResultados.obtenerConteoHerramientas(tipo.descripcion, tipo.institucion, tipo.ano);
    const instituciones = await db.query("SELECT n_nombre FROM institucion_educativa");
    const años = await db.query("SELECT n_año FROM persona GROUP BY n_año ASC");    
    res.render('templates/admin/resultadosbusqueda', {tipo, resultados, resHerr, instituciones, años});
});

//POST
router.post('/resultadosbusqueda', isLoggedIn, isAdmin, (req, res) => {
    const tipoBusqueda = req.body.selecCriterio;
    const isAños = req.body.año;    
    if (tipoBusqueda == "Búsqueda por Facultad"){
        const institucion = req.body.selecFacultad;
        const año = req.body.selecAño;
        if (isAños == "Si"){
            res.redirect('/resbusquedaAno/'+tipoBusqueda+'/'+año+'/'+institucion);
        } else {
            res.redirect('/resultadosbusqueda/'+tipoBusqueda+'/'+institucion);
        }        
    }else {
        const año = req.body.selecAño;
        if (isAños == "Si"){
            res.redirect('/resbusquedaAno/'+tipoBusqueda+'/'+año);
        } else {
            res.redirect('/resultadosbusqueda/'+tipoBusqueda);
        }        
    }
});

router.post('/registrarDocente', isLoggedIn, isAdmin, async(req, res) => {
    const formulario = req.body;
    await helperFormulario.registrarDocente(formulario);
    //console.log(infoParaDB);
    res.redirect("/homeAdmin");
});

router.post('/editarPerfilAdmin/:cedula', isLoggedIn, isAdmin, async(req, res) => {
    const {cedula} = req.params; 
    const formulario = req.body;
    await helperFormulario.actualizarDatosDocente(cedula, formulario, req.files);
    res.redirect('/homeAdmin');
});

router.post('/llenarEncHerrAdmin/:cedula', isLoggedIn, isAdmin, async (req, res) => {
    const {cedula} = req.params;     
    const formulario = req.body;
    await helperFormulario.llenarFormularioHerramientas(cedula, formulario);
    res.redirect('/homeAdmin');
});

router.post('/llenarEncComAdmin/:cedula', isLoggedIn, isAdmin, async (req, res) => {
    const {cedula} = req.params;
    const formulario = req.body;
    await helperFormulario.llenarFormularioCompetencias(cedula, formulario);
    res.redirect('/homeAdmin');
});

router.post('/eliminarDocente/:cedula', isLoggedIn, isAdmin, async (req, res) => {
    const {cedula} = req.params;
    await helperFormulario.eliminarDocente(cedula);
    res.redirect('/homeAdmin');
});
module.exports = router;