const db = require('../database');
const helpers = {};
const helperEncriptar = require('./helperEncriptar');

helpers.llenarFormularioHerramientas = async(cedula, formulario) => {
    
    var infoParaDB = {}    
    // P 2------------------------------
    infoParaDB.v_OVA = limpiarDatosHerramientas(
        formulario.p_2_1
        + ", " + formulario.p_2_2
        + ", " + formulario.p_2_3
        + ", " + formulario.p_2_4
        + ", " + formulario.p_2_5
        + ", " + formulario.p_2_6
        + ", " + formulario.p_2_7
        +", §");
    //P 3-----------------------------
    infoParaDB.v_video = limpiarDatosHerramientas(
        formulario.p_3_1
        + ", " + formulario.p_3_2
        + ", " + formulario.p_3_3
        + ", " + formulario.p_3_4
        + ", " + formulario.p_3_5
        + ", " + formulario.p_3_6
        + ", " + formulario.p_3_7
        + ", " + formulario.p_3_8
        +", §");
    //P 4---------------------------
    infoParaDB.v_audio = limpiarDatosHerramientas(
        formulario.p_4_1
        + ", " + formulario.p_4_2
        +", §");
    //P 5-----------------------------
    infoParaDB.v_texto_imagenes = limpiarDatosHerramientas(
        formulario.p_5_1
        + ", " + formulario.p_5_2
        + ", " + formulario.p_5_3
        + ", " + formulario.p_5_4
        + ", " + formulario.p_5_5
        + ", " + formulario.p_5_6
        + ", " + formulario.p_5_7
        +", §");
    //P 6-----------------------------
    infoParaDB.v_presentacion = limpiarDatosHerramientas(
        formulario.p_6_1
        + ", " + formulario.p_6_2
        + ", " + formulario.p_6_3
        + ", " + formulario.p_6_4
        + ", " + formulario.p_6_5
        + ", " + formulario.p_6_6
        +", §");
    //P 7-----------------------------
    infoParaDB.v_videoConferencia = limpiarDatosHerramientas(
        formulario.p_7_1
        + ", " + formulario.p_7_2
        + ", " + formulario.p_7_3
        + ", " + formulario.p_7_4
        + ", " + formulario.p_7_5
        + ", " + formulario.p_7_6
        + ", " + formulario.p_7_7
        + ", " + formulario.p_7_8
        +", §");    
    //P 9------------------------------
    infoParaDB.v_bibliografico = limpiarDatosHerramientas(
        formulario.p_9_1
        + ", " + formulario.p_9_2
        +", §");
    //P 10------------------------------
    infoParaDB.v_mapas = limpiarDatosHerramientas(
        formulario.p_10_1
        + ", " + formulario.p_10_2
        + ", " + formulario.p_10_3
        + ", " + formulario.p_10_4
        + ", §");
    //P 11-------------------------------
    infoParaDB.v_lineas = limpiarDatosHerramientas(
        formulario.p_11_1
        + ", " + formulario.p_11_2
        +", §");
    //P 12-------------------------------
    infoParaDB.v_actividades = limpiarDatosHerramientas(
        formulario.p_12_1
        + ", " + formulario.p_12_2
        + ", " + formulario.p_12_3
        + ", " + formulario.p_12_4
        + ", " + formulario.p_12_5
        +", §");
    //P 13-------------------------------
    infoParaDB.v_LMS = limpiarDatosHerramientas(
        formulario.p_13_1
        + ", " + formulario.p_13_2
        + ", " + formulario.p_13_3
        + ", " + formulario.p_13_4
        + ", " + formulario.p_13_5
        + ", " + formulario.p_13_6
        +", §");
    //P 14-------------------------------
    infoParaDB.v_comunicacion_gestion = limpiarDatosHerramientas(
        formulario.p_14_1
        + ", " + formulario.p_14_2
        +", §");
    //P 15-------------------------------
    infoParaDB.v_estadistica = limpiarDatosHerramientas(
        formulario.p_15_1
        + ", " + formulario.p_15_2
        + ", " + formulario.p_15_3
        + ", " + formulario.p_15_4
        +", §");   
    
    infoParaDB.k_cedula = cedula;
    
    //P 1-----------------------------    
    aux = "PA: " + formulario.p_1_a_1
            + ", " + formulario.p_1_a_2
            + ", " + formulario.p_1_a_3;
    if(formulario.p_1_a_otros == 'on'){   
        aux += ", Otro";
        await analizarNuevasHerramientas('Documentos colaborativos', cedula, formulario.p_1_a_cuales);
    }
    aux += ", PB: " + formulario.p_1_b_1
    + ", " + formulario.p_1_b_2
    + ", " + formulario.p_1_b_3
    + ", " + formulario.p_1_b_4
    + ", " +  formulario.p_1_b_5;
    if(formulario.p_1_b_otros == 'on'){
        aux += ", Otro";
        await analizarNuevasHerramientas('Generación de conocimiento', cedula, formulario.p_1_b_cuales);
    }
    aux += ", PC: " + formulario.p_1_c_1
            + ", " + formulario.p_1_c_2
            + ", " + formulario.p_1_c_3
            + ", " + formulario.p_1_c_4
            + ", " + formulario.p_1_c_5
            
    
    if(formulario.p_1_c_otros == 'on'){
        aux += ", Otro";
        await analizarNuevasHerramientas('Creación de sitios web o blogs educativos', cedula, formulario.p_1_c_cuales);
    }
    aux += ", §";
    infoParaDB.v_trabajoColaborativo = limpiarDatosHerramientas(aux);
    
    
    if(formulario.p_2_otros == 'on'){
        infoParaDB.v_OVA += ", Otro";
        await analizarNuevasHerramientas('Creación de objetos virtuales de aprendizaje', cedula, formulario.p_2_cuales);
    }   
    if(formulario.p_3_otros == 'on'){
        infoParaDB.v_video += ", Otro";
        await analizarNuevasHerramientas('Manejo de video', cedula, formulario.p_3_cuales);
    }
    if(formulario.p_4_otros == 'on'){
        infoParaDB.v_audio += ", Otro";
        await analizarNuevasHerramientas('Manejo de audio', cedula, formulario.p_4_cuales);
    }
    if(formulario.p_5_otros == 'on'){
        infoParaDB.v_texto_imagenes += ", Otro";
        await analizarNuevasHerramientas('Manejo de textos e imágenes', cedula, formulario.p_5_cuales);
    }
    if(formulario.p_6_otros == 'on'){
        infoParaDB.v_presentacion += ", Otro";
        await analizarNuevasHerramientas('Presentaciones en la nube', cedula, formulario.p_6_cuales);
    }
    if(formulario.p_7_otros == 'on'){
        infoParaDB.v_videoConferencia += ", Otro";
        await analizarNuevasHerramientas('Videoconferencias y reuniones online', cedula, formulario.p_7_cuales);
    }


    //P 8------------------------------
    aux = "PA: " + formulario.p_8_a_1
            + ", " + formulario.p_8_a_2
            + ", " + formulario.p_8_a_3
            + ", " + formulario.p_8_a_4
            + ", " + formulario.p_8_a_5
            + ", " + formulario.p_8_a_6
            + ", " + formulario.p_8_a_7;
    
    if(formulario.p_8_a_otros == 'on'){
        aux += ", Otro";
        await analizarNuevasHerramientas('Redes sociales', cedula, formulario.p_8_a_cuales);
    }
    aux +=  ", PB: " + formulario.p_8_b_1;
    if(formulario.p_8_b_otros == 'on'){
        aux += ", Otro";
        await analizarNuevasHerramientas('Mundos Virtuales', cedula, formulario.p_8_b_cuales);
    }
    aux += ", PC: " + formulario.p_8_c_1
            + ", " + formulario.p_8_c_2
            + ", " + formulario.p_8_c_3
            + ", " + formulario.p_8_c_4
            + ", " + formulario.p_8_c_5
    if(formulario.p_8_c_otros == 'on'){
        aux += ", Otro";
        await analizarNuevasHerramientas('BooksMarks y agregadores RSS', cedula, formulario.p_8_c_cuales);
    }
    aux += ", §";
    infoParaDB.v_comunidades = limpiarDatosHerramientas(aux);


    if(formulario.p_9_otros == 'on'){
        infoParaDB.v_bibliografico += ", Otro";
        await analizarNuevasHerramientas('Tratamiento bibliográfico', cedula, formulario.p_9_cuales);
    }
    if(formulario.p_10_otros == 'on'){
        infoParaDB.v_mapas += ", Otro";
        await analizarNuevasHerramientas('Creación de mapas mentales', cedula, formulario.p_10_cuales);
    }
    if(formulario.p_11_otros == 'on'){
        infoParaDB.v_lineas += ", Otro";
        await analizarNuevasHerramientas('Creación de líneas de tiempo', cedula, formulario.p_11_cuales);
    }
    if(formulario.p_12_otros == 'on'){
        infoParaDB.v_actividades += ", Otro";
        await analizarNuevasHerramientas('Actividades digitales lúdicas', cedula, formulario.p_12_cuales);
    }
    if(formulario.p_13_otros == 'on'){
        infoParaDB.v_LMS += ", Otro";
        await analizarNuevasHerramientas('Sistemas administradores de aprendizaje', cedula, formulario.p_13_cuales);
    }
    if(formulario.p_14_otros == 'on'){
        infoParaDB.v_comunicacion_gestion += ", Otro";
        await analizarNuevasHerramientas('Comunicación y gestión', cedula, formulario.p_14_cuales);
    }
    if(formulario.p_15_otros == 'on'){
        infoParaDB.v_estadistica += ", Otro";
        await analizarNuevasHerramientas('Estadísticas', cedula, formulario.p_15_cuales);
    }
    await insertarHerramientas(infoParaDB);
}
helpers.llenarFormularioCompetencias = async(cedula, formulario) => {    
    const infoParaDB = {
        v_tecM1 : calcularPuntajes([formulario.tec_radio_1, formulario.tec_radio_2, formulario.tec_radio_3]),
        v_tecM2 : calcularPuntajes([formulario.tec_radio_4, formulario.tec_radio_5, formulario.tec_radio_6]),
        v_tecM3 : calcularPuntajes([formulario.tec_radio_7, formulario.tec_radio_8, formulario.tec_radio_9]),
        v_pedM1 : calcularPuntajes([formulario.ped_radio_1, formulario.ped_radio_2, formulario.ped_radio_3]),
        v_pedM2 : calcularPuntajes([formulario.ped_radio_4, formulario.ped_radio_5, formulario.ped_radio_6]),
        v_pedM3 : calcularPuntajes([formulario.ped_radio_7, formulario.ped_radio_8, formulario.ped_radio_9]),
        v_comM1 : calcularPuntajes([formulario.com_radio_1, formulario.com_radio_2, formulario.com_radio_3]),
        v_comM2 : calcularPuntajes([formulario.com_radio_4, formulario.com_radio_5, formulario.com_radio_6]),
        v_comM3 : calcularPuntajes([formulario.com_radio_7, formulario.com_radio_8, formulario.com_radio_9]),
        v_gesM1 : calcularPuntajes([formulario.ges_radio_1, formulario.ges_radio_2, formulario.ges_radio_3]),
        v_gesM2 : calcularPuntajes([formulario.ges_radio_4, formulario.ges_radio_5, formulario.ges_radio_6]),
        v_gesM3 : calcularPuntajes([formulario.ges_radio_7, formulario.ges_radio_8, formulario.ges_radio_9]),
        v_invM1 : calcularPuntajes([formulario.inv_radio_1, formulario.inv_radio_2, formulario.inv_radio_3]),
        v_invM2 : calcularPuntajes([formulario.inv_radio_4, formulario.inv_radio_5, formulario.inv_radio_6]),
        v_invM3 : calcularPuntajes([formulario.inv_radio_7, formulario.inv_radio_8, formulario.inv_radio_9])
    };
    infoParaDB.k_cedula = cedula;
    //console.log(infoParaDB);
    insertarCompetencias(infoParaDB);
    await db.query("SELECT * FROM resultadocompetenciastic WHERE k_cedula="+cedula);    
}
helpers.registrarDocente = async(formulario) => {
    // Registrar Nuevo usuario
    const docente = {
        n_usuario : formulario.username
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
    docente.n_clave = await helperEncriptar.encryptPassword(formulario.password);
    //console.log(docente.n_clave);
    docente.k_id = auxId;
    docente.k_cedula_persona = formulario.cedula;
    await db.query('INSERT INTO usuario SET ?', [docente]);
    
    
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
}
helpers.actualizarDatosDocente = async (cedula, formulario, reqFile) => {
    //const {cedula} = req.params; 
    //const formulario = req.body;
    const infoParaDB = {
        k_cedula : formulario.cedula,
        n_nombre : formulario.nombre,
        n_apellido: formulario.apellido,
        o_genero : formulario.selecGenero,
        n_email : formulario.correo,
        n_ha_recibido_formacion: formulario.formacionEtic,
        n_año : formulario.año
    };
    
    if (reqFile != null){
        infoParaDB.n_imagen = reqFile.inputFileImg.name;
    }

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

    if (reqFile){
        var file = reqFile.inputFileImg;
        if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
            file.mv("src/public/images/imagenesSubidas/" + file.name, (err) =>{
                if(err){
                    console.log("Error mandando la imagen, alv");
                    console.log(err);
                }else{
                    console.log("Imagen subida satisfacotriamente");
                    //await db.query("UPDATE persona (n_imagen) WHERE k_cedula =" + id + " VALUES (" + file.name + ")");
                }
            });
        }
    }
    console.log(cedula);
    await db.query("UPDATE persona SET ? WHERE k_cedula = ?", [infoParaDB, cedula]);
    await db.query("UPDATE usuario SET k_cedula_persona="+infoParaDB.k_cedula+" WHERE k_cedula_persona ='"+cedula+"'");
}
helpers.eliminarDocente = async (cedula) => {
    await db.query("DELETE FROM otras_herramientas WHERE k_cedula_resultados ='"+cedula+"'");
    await db.query("DELETE FROM resultadocompetenciastic WHERE k_cedula ='"+cedula+"'");
    await db.query("DELETE FROM resultadoherramientas WHERE k_cedula ='"+cedula+"'");    
    await db.query("DELETE FROM persona WHERE k_cedula ='"+cedula+"'");
    await db.query("DELETE FROM usuario WHERE k_cedula_persona ='"+cedula+"'");
}

limpiarDatosHerramientas = (cadena) => {
    var aux = cadena.replace(new RegExp("undefined, ","g") , "");
    var aux2 = aux.replace(", §" , "");
    return aux2.replace("§" , "");
}
insertarHerramientas = async (info) => {    
    const res = await db.query("SELECT * FROM resultadoherramientas WHERE k_cedula='"+info.k_cedula+"'");    
    if(res.length > 0){
        await db.query("UPDATE resultadoherramientas SET ? WHERE k_cedula ='"+info.k_cedula+"'", [info]);
    }else{        
        await db.query("INSERT INTO resultadoherramientas SET ?", [info]);
    }    
}
analizarNuevasHerramientas = async (tipo, id, valor) => {
    const res = await db.query("SELECT * FROM otras_herramientas WHERE v_tipo='"+tipo+"' AND k_cedula_resultados="+id);
    if(res.length > 0){
        await db.query("UPDATE otras_herramientas SET v_valor='"+valor+"'WHERE v_tipo='"+tipo+"' AND k_cedula_resultados="+id);
    } else {
        const idNueva = await db.query("SELECT k_id FROM otras_herramientas ORDER BY k_id DESC LIMIT 0,1");
        var idAux = 0;
        if (idNueva.length > 0){
            idAux = idNueva[0].k_id + 1;
        }
        const info = {
            k_id : idAux,
            v_valor : valor,
            v_tipo : tipo,
            k_cedula_resultados : id
        };
        await db.query("INSERT INTO otras_herramientas SET ?", [info]);
    }
}
insertarCompetencias = async (info) => {    
    const res = await db.query("SELECT * FROM resultadocompetenciastic WHERE k_cedula='"+info.k_cedula+"'");    
    if(res.length > 0){
        await db.query("UPDATE resultadocompetenciastic SET ? WHERE k_cedula ='"+info.k_cedula+"'", [info]);
    }else{        
        await db.query("INSERT INTO resultadocompetenciastic SET ?", [info]);
    }    
}
calcularPuntajes = (datosFormulario) => {
    var puntajeTotal = 0;
    for(var i = 0; i < datosFormulario.length; i++){
        if (datosFormulario[i] == "MuyFrecuentemente"){
            puntajeTotal += 4;
        }else if (datosFormulario[i] == "Frecuente") {
            puntajeTotal += 3;
        }else if (datosFormulario[i] == "Ocasionalmente") {
            puntajeTotal += 2;
        }else if (datosFormulario[i] == "Raramente") {
            puntajeTotal += 1;
        }
    }    
    return puntajeTotal;
}

module.exports = helpers;