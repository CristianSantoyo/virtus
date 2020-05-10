const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database');
const helperEncriptar = require('../lib/helperEncriptar');
const credencialAdministrador = "Virtus2020"

passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const filas = await db.query('SELECT * FROM usuario WHERE n_usuario = ?', [username]);    
    if (filas.length > 0){
        const user = filas[0];
        const validPassword = await helperEncriptar.matchPassword(password, user.n_clave);
        
        if (validPassword){
            //done(null, user, req.flash('Bienvenido'));
            user.tipo = "usuario";
            done(null, user);
            console.log("EXITO LPM")
        } else {
            console.log("Contraseña Incorrecta");
            done(null, false, req.flash('errorLogin', 'Error: Contraseña Incorrecta'));
        }
    }else{
        console.log("Usuario Incorrecto");
        return done(null, false, req.flash('errorLogin', 'Error: Nombre de Usuario Incorrecto'));        
    }
}));

passport.use('local.loginAdmin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {    
    const filas = await db.query('SELECT * FROM administrador WHERE n_usuario = ?', [username]);    
    if (filas.length > 0){
        const user = filas[0];
        const validPassword = await helperEncriptar.matchPassword(password, user.n_clave);
        if (validPassword){
            //done(null, user, req.flash('Bienvenido'));
            user.tipo = "administrador";
            done(null, user);
            console.log("EXITO LPM")
        } else {
            console.log("Contraseña Incorrecta");
            done(null, false, req.flash('errorLogin', 'Error: Contraseña Incorrecta'));
        }
    }else{
        console.log("Usuario Incorrecto");
        return done(null, false, req.flash('errorLogin', 'Error: Nombre de Usuario Incorrecto'));        
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const formulario = req.body;    
    console.log(formulario);
    // Registrar Nuevo usuario
    const newUser = {
        n_usuario : username,
        n_clave: password
    };

    // DEFINIMOS UNA NUEVA ID PARA EL NUEVO USUARIO REGISTRADO
    var auxId = 0;
    const aux = await db.query('SELECT k_id FROM usuario');
    //console.log(aux.length);
    for(var i = 0; i < aux.length; i++){
        if (auxId == aux[i].k_id){
            auxId += 1;
        }else{
            break;
        }
    }
    //console.log(auxId);
    //const auxId = aux[aux.length-1].id + 1;
    // POR AHORA LO DEJAREMOS ASI POSTERIORMENTE SE DISEÑARA UN MEJOR CIFRADO O DISEÑO PARA LAS IDS    
    newUser.n_clave = await helperEncriptar.encryptPassword(password);
    //console.log(newUser.n_clave);
    newUser.k_id = auxId;
    newUser.k_cedula_persona = formulario.cedula;
    await db.query('INSERT INTO usuario SET ?', [newUser]);
    
    
    const infoParaDB = {
        k_cedula : formulario.cedula,
        n_nombre : formulario.nombre,
        n_apellido: formulario.apellido,
        o_genero : formulario.selecGenero,
        n_email : formulario.correo,
        n_ha_recibido_formacion: formulario.formacionEtic,
        n_año : formulario.año
    };

    if(formulario.inst == 'Si'){
        const idNuevaInst = await db.query("SELECT k_id FROM institucion_educativa ORDER BY k_id DESC LIMIT 0,1");
        const idInst = idNuevaInst[0].k_id + 1;
        const nuevaInst = {
            k_id : idInst,
            n_nombre : formulario.otroInstitucion
        };
        infoParaDB.fk_id_institucion = idInst;
        await db.query('INSERT INTO institucion_educativa SET ?', [nuevaInst]);

        const idNuevaInsFacultad = await db.query("SELECT k_id FROM facultad ORDER BY k_id DESC LIMIT 0,1");
        const idInsFacultad = idNuevaInsFacultad[0].k_id + 1;
        const nuevaInsFacultad = {
            k_id : idInsFacultad,
            n_nombre : formulario.otroInsFacultad,
            fk_id_institucion : idInst
        };
        infoParaDB.k_id_facultad = idInsFacultad;
        await db.query('INSERT INTO facultad SET ?', [nuevaInsFacultad]);

    }else{
        infoParaDB.fk_id_institucion = formulario.selecInstitucion;
    }

    if(formulario.facultad == 'Si'){
        const idNuevaFacultad = await db.query("SELECT k_id FROM facultad ORDER BY k_id DESC LIMIT 0,1");
        const idFacultad = idNuevaFacultad[0].k_id + 1;
        const nuevaFacultad = {
            k_id : idFacultad,
            n_nombre : formulario.otroFacultad,
            fk_id_institucion : infoParaDB.fk_id_institucion
        };
        infoParaDB.k_id_facultad = idFacultad;
        await db.query('INSERT INTO facultad SET ?', [nuevaFacultad]);
    }else{
        infoParaDB.k_id_facultad = formulario.selecFacultad;
    }

    if(formulario.area == 'Si'){
        const idNuevaArea = await db.query("SELECT k_id FROM area ORDER BY k_id DESC LIMIT 0,1");
        const idArea = idNuevaArea[0].k_id + 1
        const nuevaArea = {
            k_id : idArea,
            n_nombre : formulario.otroArea,
            n_tipo: formulario.teopra
        };
        infoParaDB.k_id_area = idArea;
        await db.query('INSERT INTO area SET ?', [nuevaArea]);
    }else{
        infoParaDB.k_id_area = formulario.selecArea;
    }


    if(formulario.cicl == 'Si'){
        const idNuevoCiclo = await db.query("SELECT k_id FROM ciclo_propedeutico ORDER BY k_id DESC LIMIT 0,1");
        const idCiclo = idNuevoCiclo[0].k_id + 1;
        const nuevoCiclo= {
            k_id : idCiclo,
            n_nombre : formulario.otroCiclo
        };
        console.log(nuevoCiclo);
        infoParaDB.k_id_ciclo = idCiclo;
        await db.query('INSERT INTO ciclo_propedeutico SET ?', [nuevoCiclo]);
    }else{
        infoParaDB.k_id_ciclo = formulario.selecInstitucion;
    }

    //await db.query("UPDATE usuario SET k_cedula_persona='"+infoParaDB.k_cedula+ "' WHERE k_id ='"+idSession+"'");
    //console.log(infoParaDB);
    await db.query("INSERT INTO persona SET ?", infoParaDB);
    //console.log(infoParaDB);
    newUser.tipo = 'usuario'
    return done(null, newUser);
}));

passport.use('local.signupAdmin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    console.log(req.body);

    if (req.body.credencial == credencialAdministrador){
        // Registrar Nuevo Administrador
        const newAdmin = {
            n_usuario : username,
            n_clave: password
        };
        // DEFINIMOS UNA NUEVA ID PARA EL NUEVO USUARIO REGISTRADO
        var auxId = 0;
        const aux = await db.query('SELECT k_id FROM administrador');
        //console.log(aux.length);
        for(var i = 0; i < aux.length; i++){
            if (auxId == aux[i].k_id){
                auxId += 1;
            }else{
                break;
            }
        }
        newAdmin.n_clave = await helperEncriptar.encryptPassword(password);
        //console.log(newAdmin.n_clave);
        newAdmin.k_id = auxId;
        
        await db.query('INSERT INTO administrador SET ?', [newAdmin]);
        newAdmin.tipo = 'administrador';
        return done(null, newAdmin);
    }else{
        console.log("Usuario Incorrecto");
        return done(null, false, req.flash('errorLogin', 'Error: Credencial Incorrecta'));        
    }
    
}));

passport.serializeUser((user, done) =>{
    done(null, user);
});

passport.deserializeUser( async (user, done) => {
   // console.log(user);
    //id = user.k_id;
    
//    console.log(filas);
    done(null, user);
});
