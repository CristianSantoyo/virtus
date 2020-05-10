const db = require('../database');
const helpers = {};

helpers.obtenerResultadosCompetencias = async (id) =>{
    const infoBD = await db.query("SELECT * FROM resultadocompetenciastic WHERE k_cedula="+id);

    const resultados = {
        tec : {
            m1 : infoBD[0].v_tecM1,
            m2 : infoBD[0].v_tecM2,
            m3 : infoBD[0].v_tecM3,
            total : infoBD[0].v_tecM1 + infoBD[0].v_tecM2 + infoBD[0].v_tecM3
        },
        ped : {
            m1 : infoBD[0].v_pedM1,
            m2 : infoBD[0].v_pedM2,
            m3 : infoBD[0].v_pedM3,
            total : infoBD[0].v_pedM1 + infoBD[0].v_pedM2 + infoBD[0].v_pedM3
        },
        com : {
            m1 : infoBD[0].v_comM1,
            m2 : infoBD[0].v_comM2,
            m3 : infoBD[0].v_comM3,
            total : infoBD[0].v_comM1 + infoBD[0].v_comM2 + infoBD[0].v_comM3
        },
        ges : {
            m1 : infoBD[0].v_gesM1,
            m2 : infoBD[0].v_gesM2,
            m3 : infoBD[0].v_gesM3,
            total : infoBD[0].v_gesM1 + infoBD[0].v_gesM2 + infoBD[0].v_gesM3
        },
        inv : {
            m1 : infoBD[0].v_invM1,
            m2 : infoBD[0].v_invM2,
            m3 : infoBD[0].v_invM3,
            total : infoBD[0].v_invM1 + infoBD[0].v_invM2 + infoBD[0].v_invM3
        },
        totalMomento : {
            m1 : infoBD[0].v_tecM1 + infoBD[0].v_pedM1 + infoBD[0].v_comM1 + infoBD[0].v_gesM1 + infoBD[0].v_invM1,
            m2 : infoBD[0].v_tecM2 + infoBD[0].v_pedM2 + infoBD[0].v_comM2 + infoBD[0].v_gesM2 + infoBD[0].v_invM2,
            m3 : infoBD[0].v_tecM3 + infoBD[0].v_pedM3 + infoBD[0].v_comM3 + infoBD[0].v_gesM3 + infoBD[0].v_invM3
        }
    };

    resultados.tec.momento = calcularMomento(resultados.tec.total);
    resultados.ped.momento = calcularMomento(resultados.ped.total);
    resultados.com.momento = calcularMomento(resultados.com.total);
    resultados.ges.momento = calcularMomento(resultados.ges.total);
    resultados.inv.momento = calcularMomento(resultados.inv.total);

    resultados.tec.estado = calcularEstado(resultados.tec.momento, "tec");
    resultados.ped.estado = calcularEstado(resultados.ped.momento, "ped");
    resultados.com.estado = calcularEstado(resultados.com.momento, "com");
    resultados.ges.estado = calcularEstado(resultados.ges.momento, "ges");
    resultados.inv.estado = calcularEstado(resultados.inv.momento, "inv");

    return resultados;
}
helpers.obtenerResultadosHerramientas = async (id) => {
    const infoHerr = await db.query("SELECT * FROM resultadoherramientas WHERE k_cedula="+id);
    const infoOtros = await db.query("SELECT * FROM otras_herramientas WHERE k_cedula_resultados="+id);
    const resultados = {
        v_trabajoColaborativo : infoHerr[0].v_trabajoColaborativo,
        v_OVA : infoHerr[0].v_OVA,
        v_video : infoHerr[0].v_video,
        v_audio : infoHerr[0].v_audio,
        v_texto_imagenes : infoHerr[0].v_texto_imagenes,
        v_presentacion : infoHerr[0].v_presentacion,
        v_videoConferencia : infoHerr[0].v_videoConferencia,
        v_comunidades : infoHerr[0].v_comunidades,
        v_bibliografico : infoHerr[0].v_bibliografico,
        v_mapas : infoHerr[0].v_mapas,
        v_lineas : infoHerr[0].v_lineas,
        v_actividades : infoHerr[0].v_actividades,
        v_LMS : infoHerr[0].v_LMS,
        v_comunicacion_gestion : infoHerr[0].v_comunicacion_gestion,
        v_estadistica : infoHerr[0].v_estadistica,
        otro : infoOtros
    };
    return resultados;
}
helpers.obtenerResultadosGenerales = async(criterio, institucion, año) => {
    var datos = [];
    
    switch(criterio){
        case "Búsqueda por Institución":
            const ins = await db.query("SELECT k_id, n_nombre FROM institucion_educativa");        
            for (var i = 0; i < ins.length; i++){
                var dato = {};
                dato.nombre = ins[i].n_nombre;
                var sql = "SELECT R.* "
                + "FROM persona P, institucion_educativa I, resultadocompetenciastic R "
                + "WHERE P.fk_id_institucion = I.k_id AND P.k_cedula=R.k_cedula AND I.k_id='"+ins[i].k_id+"'";                
                if (año != undefined){
                    sql += " AND P.n_año='"+año+"'";
                }
                const infoPuntaje = await db.query(sql);
                dato.puntaje = calcularCompetencias(infoPuntaje);
                datos[i] = dato;
            }
            //console.log(datos);
            return datos;
        case "Búsqueda por Ciclo Propedéutico":
            const cicl = await db.query("SELECT k_id, n_nombre FROM ciclo_propedeutico");        
            for (var i = 0; i < cicl.length; i++){
                var dato = {};
                dato.nombre = cicl[i].n_nombre;
                var sql = "SELECT R.* "
                + "FROM persona P, ciclo_propedeutico C, resultadocompetenciastic R "
                + "WHERE P.k_id_ciclo = C.k_id AND P.k_cedula=R.k_cedula AND C.k_id='"+cicl[i].k_id+"'";
                if (año != undefined){
                    sql += " AND P.n_año='"+año+"'";
                }
                const infoPuntaje = await db.query(sql);
                dato.puntaje = calcularCompetencias(infoPuntaje);
                datos[i] = dato;
            }
            return datos;
        case "Búsqueda por Área de Especialización":
            const area = await db.query("SELECT k_id, n_nombre FROM area");        
            for (var i = 0; i < area.length; i++){
                var dato = {};
                dato.nombre = area[i].n_nombre;
                var sql = "SELECT R.* "
                + "FROM persona P, area A, resultadocompetenciastic R "
                + "WHERE P.k_id_area = A.k_id AND P.k_cedula=R.k_cedula AND A.k_id='"+area[i].k_id+"'";
                if (año != undefined){
                    sql += " AND P.n_año='"+año+"'";
                }
                const infoPuntaje = await db.query(sql);
                dato.puntaje = calcularCompetencias(infoPuntaje);            
                datos[i] = dato;
            }
            return datos;
        case "Búsqueda por Género":
            const genero = ['M', 'F', 'O'];
            for (var i = 0; i < genero.length; i++){
                var dato = {};
                dato.nombre = genero[i];
                var sql = "SELECT R.* "
                + "FROM persona P, resultadocompetenciastic R "
                + "WHERE P.k_cedula=R.k_cedula AND P.o_genero='"+genero[i]+"'";
                if (año != undefined){
                    sql += " AND P.n_año='"+año+"'";
                }
                const infoPuntaje = await db.query(sql);
                dato.puntaje = calcularCompetencias(infoPuntaje);            
                datos[i] = dato;
            }
            return datos;
        case "Búsqueda por Tipo de Asignatura":
            const tipo = ['Teórica', 'Práctica', 'Teórico-Práctica'];
            for (var i = 0; i < tipo.length; i++){
                var dato = {};
                dato.nombre = tipo[i];
                var sql = "SELECT R.* "
                + "FROM persona P, area A, resultadocompetenciastic R "
                + "WHERE P.k_id_area=A.k_id AND P.k_cedula=R.k_cedula AND A.n_tipo='"+tipo[i]+"'";
                if (año != undefined){
                    sql += " AND P.n_año='"+año+"'";
                }
                const infoPuntaje = await db.query(sql);
                dato.puntaje = calcularCompetencias(infoPuntaje);            
                datos[i] = dato;
            }
            return datos;
        case "Búsqueda por Formación en la ETIC":
            const etic = ['Si', 'No'];
            for (var i = 0; i < etic.length; i++){
                var dato = {};
                dato.nombre = etic[i];
                var sql = "SELECT R.* "
                + "FROM persona P, resultadocompetenciastic R "
                + "WHERE P.k_cedula=R.k_cedula AND P.n_ha_recibido_formacion='"+etic[i]+"'";
                if (año != undefined){
                    sql += " AND P.n_año='"+año+"'";
                }
                const infoPuntaje = await db.query(sql);
                dato.puntaje = calcularCompetencias(infoPuntaje);            
                datos[i] = dato;
            }
            return datos;
        case "Búsqueda por Facultad":
            var sql = "SELECT F.* "
                + "FROM facultad F, institucion_educativa I "
                + "WHERE I.k_id=F.fk_id_institucion AND I.n_nombre='"+institucion+"'";            
            const facultades = await db.query(sql);
            for (var i = 0; i < facultades.length; i++){                
                var dato = {};
                dato.nombre = facultades[i].n_nombre;
                sql = "SELECT R.* "
                + "FROM persona P, facultad F, resultadocompetenciastic R "
                + "WHERE P.k_id_facultad = F.k_id AND P.k_cedula=R.k_cedula AND F.k_id='"+facultades[i].k_id+"'";
                if (año != undefined){
                    sql += " AND P.n_año='"+año+"'";
                }
                const infoPuntaje = await db.query(sql);
                dato.puntaje = calcularCompetencias(infoPuntaje);            
                datos[i] = dato;
            }
            return datos;
    }
}

helpers.obtenerConteoHerramientas = async(criterio, institucion, año) => {
    var datos = [];
    switch(criterio){
        case "Búsqueda por Institución":
            const ins = await db.query("SELECT k_id, n_nombre FROM institucion_educativa");        
            for (var i = 0; i < ins.length; i++){                
                var sql = "SELECT R.* "
                + "FROM persona P, institucion_educativa I, resultadoherramientas R "
                + "WHERE P.fk_id_institucion = I.k_id AND P.k_cedula=R.k_cedula AND I.k_id='"+ins[i].k_id+"'";
                if (año != undefined){
                    sql += " AND P.n_año='"+año+"'";
                }
                const infoPuntaje = await db.query(sql);            
                datos[i] = calcularHerramientas(ins[i].n_nombre, infoPuntaje);
            }            
            return datos;
        case "Búsqueda por Ciclo Propedéutico":
            const cicl = await db.query("SELECT k_id, n_nombre FROM ciclo_propedeutico");        
            for (var i = 0; i < cicl.length; i++){
                var sql = "SELECT R.* "
                + "FROM persona P, ciclo_propedeutico C, resultadoherramientas R "
                + "WHERE P.k_id_ciclo = C.k_id AND P.k_cedula=R.k_cedula AND C.k_id='"+cicl[i].k_id+"'";
                if (año != undefined){
                    sql += " AND P.n_año='"+año+"'";
                }
                const infoPuntaje = await db.query(sql);
                console.log(infoPuntaje);
                datos[i] = calcularHerramientas(cicl[i].n_nombre, infoPuntaje);
            }
            return datos;
        case "Búsqueda por Área de Especialización":
            const area = await db.query("SELECT k_id, n_nombre FROM area");        
            for (var i = 0; i < area.length; i++){
                var sql = "SELECT R.* "
                + "FROM persona P, area A, resultadoherramientas R "
                + "WHERE P.k_id_area = A.k_id AND P.k_cedula=R.k_cedula AND A.k_id='"+area[i].k_id+"'";
                if (año != undefined){
                    sql += " AND P.n_año='"+año+"'";
                }
                const infoPuntaje = await db.query(sql);            
                datos[i] = calcularHerramientas(area[i].n_nombre, infoPuntaje);      
            }
            return datos;
        case "Búsqueda por Género":
            const genero = ['M', 'F', 'O'];
            for (var i = 0; i < genero.length; i++){
                var sql = "SELECT R.* "
                + "FROM persona P, resultadoherramientas R "
                + "WHERE P.k_cedula=R.k_cedula AND P.o_genero='"+genero[i]+"'";
                if (año != undefined){
                    sql += " AND P.n_año='"+año+"'";
                }
                const infoPuntaje = await db.query(sql);
                datos[i] = calcularHerramientas(genero[i], infoPuntaje);      
            }
            return datos;
        case "Búsqueda por Tipo de Asignatura":
            const tipo = ['Teórica', 'Práctica', 'Teórico-Práctica'];
            for (var i = 0; i < tipo.length; i++){
                var sql = "SELECT R.* "
                + "FROM persona P, area A, resultadoherramientas R "
                + "WHERE P.k_id_area=A.k_id AND P.k_cedula=R.k_cedula AND A.n_tipo='"+tipo[i]+"'";
                if (año != undefined){
                    sql += " AND P.n_año='"+año+"'";
                }
                const infoPuntaje = await db.query(sql);
                datos[i] = calcularHerramientas(tipo[i], infoPuntaje);      
            }
            return datos;
        case "Búsqueda por Formación en la ETIC":
            const etic = ['Si', 'No'];
            for (var i = 0; i < etic.length; i++){
                var sql = "SELECT R.* "
                + "FROM persona P, resultadoherramientas R "
                + "WHERE P.k_cedula=R.k_cedula AND P.n_ha_recibido_formacion='"+etic[i]+"'";
                if (año != undefined){
                    sql += " AND P.n_año='"+año+"'";
                }
                const infoPuntaje = await db.query(sql);
                datos[i] = calcularHerramientas(etic[i], infoPuntaje);      
            }
            return datos;
        case "Búsqueda por Facultad":
            var sql = "SELECT F.* "
                + "FROM facultad F, institucion_educativa I "
                + "WHERE I.k_id=F.fk_id_institucion AND I.n_nombre='"+institucion+"'";
            const facultades = await db.query(sql);
            for (var i = 0; i < facultades.length; i++){
                sql = "SELECT R.* "
                + "FROM persona P, facultad F, resultadoherramientas R "
                + "WHERE P.k_id_facultad = F.k_id AND P.k_cedula=R.k_cedula AND F.k_id='"+facultades[i].k_id+"'";
                if (año != undefined){
                    sql += " AND P.n_año='"+año+"'";
                }
                const infoPuntaje = await db.query(sql);
                datos[i] = calcularHerramientas(facultades[i].n_nombre, infoPuntaje);      
            }
            return datos;
    }    
}

calcularCompetencias = (infoPuntaje) => {
    if (infoPuntaje.length > 0){
        var auxPuntaje = 0;
        for(var j = 0; j < infoPuntaje.length; j++){
            auxPuntaje += infoPuntaje[j].v_tecM1 + infoPuntaje[j].v_tecM2 + infoPuntaje[j].v_tecM3
                + infoPuntaje[j].v_pedM1 + infoPuntaje[j].v_pedM2 + infoPuntaje[j].v_pedM3
                + infoPuntaje[j].v_comM1 + infoPuntaje[j].v_comM2 + infoPuntaje[j].v_comM3
                + infoPuntaje[j].v_gesM1 + infoPuntaje[j].v_gesM2 + infoPuntaje[j].v_gesM3
                + infoPuntaje[j].v_invM1 + infoPuntaje[j].v_invM2 + infoPuntaje[j].v_invM3;
        }
        return auxPuntaje / infoPuntaje.length;
    }else{
        return 0;
    }
    
}
calcularHerramientas = (nombre, infoPuntaje) => {
    if (infoPuntaje.length > 0){
        var cadena;
        var trabajoA = "", trabajoB = "", trabajoC = "";
        var ova = "";
        var video = "";
        var audio = "";
        var textoImagenes = "";
        var presentacion = "";
        var videoConferencia = "";
        var comunidadesA = "", comunidadesB = "", comunidadesC = "";
        var bibliografico = "";
        var mapas = "";
        var lineas = "";
        var actividades = "";
        var LMS = "";
        var comunicacionGestion = "";
        var estadistica = "";        

        for(var j = 0; j < infoPuntaje.length; j++){

            cadena = infoPuntaje[j].v_trabajoColaborativo;
            trabajoA += cadena.substr(4, (cadena.indexOf('PB:') - 6)) + ", ";
            trabajoB += cadena.substr(cadena.indexOf('PB:') + 3, cadena.indexOf('PC:') - (cadena.indexOf('PB:') + 5  )) + ", ";
            trabajoC += cadena.substr((cadena.indexOf('PC:')) + 4) + ", ";
            ova += infoPuntaje[j].v_OVA + ", ";
            video += infoPuntaje[j].v_video + ", ";
            audio += infoPuntaje[j].v_audio + ", ";
            textoImagenes += infoPuntaje[j].v_texto_imagenes + ", ";
            presentacion += infoPuntaje[j].v_presentacion + ", ";
            videoConferencia += infoPuntaje[j].v_videoConferencia + ", ";
            
            cadena = infoPuntaje[j].v_comunidades;
            comunidadesA += cadena.substr(4, (cadena.indexOf('PB:') - 6)) + ", ";
            comunidadesB += cadena.substr(cadena.indexOf('PB:') + 3, cadena.indexOf('PC:') - (cadena.indexOf('PB:') + 5  )) + ", ";
            comunidadesC += cadena.substr((cadena.indexOf('PC:')) + 4) + ", ";

            bibliografico += infoPuntaje[j].v_bibliografico + ", ";
            mapas += infoPuntaje[j].v_mapas + ", ";
            lineas += infoPuntaje[j].v_lineas + ", ";
            actividades += infoPuntaje[j].v_actividades + ", ";
            LMS += infoPuntaje[j].v_LMS + ", ";
            comunicacionGestion += infoPuntaje[j].v_comunicacion_gestion + ", ";
            estadistica += infoPuntaje[j].v_estadistica + ", ";
        }
        
        puntajes = {
            nombre: nombre,
            punTrabajoA : calcularRepTrabA(trabajoA),
            punTrabajoB : calcularRepTrabB(trabajoB),
            punTrabajoC : calcularRepTrabC(trabajoC),
            punOva : calcularRepOva(ova),
            punVideo : calcularRepVideo(video),
            punAudio : calcularRepAudio(audio),
            punTextoImagenes : calcularRepTextos(textoImagenes),
            punPresentacion : calcularRepNube(presentacion),
            punVideoConferencia : calcularRepVideoConferencias(videoConferencia),
            punComunidadesA : calcularRepComunidadesA(comunidadesA),
            punComunidadesB : calcularRepComunidadesB(comunidadesB),
            punComunidadesC : calcularRepComunidadesC(comunidadesC),
            punBibliografia : calcularRepBibliografia(bibliografico),
            punMapas : calcularRepMapas(mapas),
            punLineas : calcularRepLineas(lineas),
            punActividades : calcularRepActividades(actividades),
            punLMS : calcularRepLMS(LMS),
            punComunicacionGestion : calcularRepGestion(comunicacionGestion),
            punEstadistica : calcularRepEstadisticas(estadistica)
        };        
        return puntajes;
    } else {
        puntajes = {
            nombre: nombre,
            punTrabajoA : calcularRepTrabA(""),
            punTrabajoB : calcularRepTrabB(""),
            punTrabajoC : calcularRepTrabC(""),
            punOva : calcularRepOva(""),
            punVideo : calcularRepVideo(""),
            punAudio : calcularRepAudio(""),
            punTextoImagenes : calcularRepTextos(""),
            punPresentacion : calcularRepNube(""),
            punVideoConferencia : calcularRepVideoConferencias(""),
            punComunidadesA : calcularRepComunidadesA(""),
            punComunidadesB : calcularRepComunidadesB(""),
            punComunidadesC : calcularRepComunidadesC(""),
            punBibliografia : calcularRepBibliografia(""),
            punMapas : calcularRepMapas(""),
            punLineas : calcularRepLineas(""),
            punActividades : calcularRepActividades(""),
            punLMS : calcularRepLMS(""),
            punComunicacionGestion : calcularRepGestion(""),
            punEstadistica : calcularRepEstadisticas("")
        }
        return puntajes;
    }
   
    
}
calcularRepTrabA = (cadena) =>{
    r = {
        googleDrive: contarRepeticonesHerr(cadena, "Google Drive"),
        oneDrive: contarRepeticonesHerr(cadena, "One Drive"),
        dropbox: contarRepeticonesHerr(cadena, "Dropbox"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepTrabB = (cadena) =>{
    return {
        wikiSpaces: contarRepeticonesHerr(cadena, "WikiSpaces"),
        pbWorks: contarRepeticonesHerr(cadena, "PbWorks"),
        wetOaint: contarRepeticonesHerr(cadena, "WetOaint"),
        wikdictionary: contarRepeticonesHerr(cadena, "Wikdictionary"),
        wikipedia: contarRepeticonesHerr(cadena, "Wikipedia"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };
}
calcularRepTrabC = (cadena) =>{
    r = {
        blogger: contarRepeticonesHerr(cadena, "Blogger"),
        wordPress: contarRepeticonesHerr(cadena, "WordPress"),
        wix: contarRepeticonesHerr(cadena, "Wix"),
        typePad: contarRepeticonesHerr(cadena, "TypePad"),
        technorati: contarRepeticonesHerr(cadena, "Technorati"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepOva = (cadena) =>{
    r = {
        exeLearning: contarRepeticonesHerr(cadena, "ExeLearning"),
        reload: contarRepeticonesHerr(cadena, "Reload Scorm"),
        courseLab: contarRepeticonesHerr(cadena, "CourseLab"),
        constructor: contarRepeticonesHerr(cadena, "Constructor"),
        ardora: contarRepeticonesHerr(cadena, "Ardora"),
        udutu: contarRepeticonesHerr(cadena, "Udutu"),
        h5p: contarRepeticonesHerr(cadena, "H5P"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepVideo = (cadena) =>{
    r = {
        screenCast: contarRepeticonesHerr(cadena, "Screencast-O-Matic"),
        movieMaker: contarRepeticonesHerr(cadena, "Movie Maker"),
        youTube: contarRepeticonesHerr(cadena, "YouTube"),
        teacherTube: contarRepeticonesHerr(cadena, "TeacherTube"),
        vimeo: contarRepeticonesHerr(cadena, "Vimeo"),
        blip: contarRepeticonesHerr(cadena, "Blip"),
        ustream: contarRepeticonesHerr(cadena, "Ustream"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepAudio = (cadena) =>{
    r = {
        audacity: contarRepeticonesHerr(cadena, "Audacity"),
        odeo: contarRepeticonesHerr(cadena, "Odeo"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepTextos = (cadena) =>{
    r = {
        canva: contarRepeticonesHerr(cadena, "canva.com"),
        cootext: contarRepeticonesHerr(cadena, "cooltext.com"),
        pixlr: contarRepeticonesHerr(cadena, "pixlr.com"),
        filckr: contarRepeticonesHerr(cadena, "Filckr"),
        photobucket: contarRepeticonesHerr(cadena, "Photobucket"),
        flickrCC: contarRepeticonesHerr(cadena, "FlickrCC"),
        picnik: contarRepeticonesHerr(cadena, "Picnik"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepNube = (cadena) =>{
    r = {
        prezi: contarRepeticonesHerr(cadena, "Prezi"),
        slideshare: contarRepeticonesHerr(cadena, "Slideshare"),
        scribd: contarRepeticonesHerr(cadena, "Scribd"),
        powtoon: contarRepeticonesHerr(cadena, "Powtoon"),
        genially: contarRepeticonesHerr(cadena, "Genially"),
        h5p: contarRepeticonesHerr(cadena, "H5P"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepVideoConferencias = (cadena) =>{
    r = {
        skype: contarRepeticonesHerr(cadena, "Skype"),
        zoom: contarRepeticonesHerr(cadena, "Zoom"),
        skypeEmpresarial: contarRepeticonesHerr(cadena, "Skype Empresarial (Lync)"),
        haungounts: contarRepeticonesHerr(cadena, "Haungounts"),
        webconference: contarRepeticonesHerr(cadena, "Webconference"),
        appear: contarRepeticonesHerr(cadena, "Appear.in"),
        join: contarRepeticonesHerr(cadena, "Join.me"),
        dimdim: contarRepeticonesHerr(cadena, "Dimdim"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepComunidadesA = (cadena) =>{
    r = {
        facebook: contarRepeticonesHerr(cadena, "Facebook"),
        linkedin: contarRepeticonesHerr(cadena, "Linkedin"),
        instagram: contarRepeticonesHerr(cadena, "Instagram"),
        xing: contarRepeticonesHerr(cadena, "Xing"),
        twitter: contarRepeticonesHerr(cadena, "Twitter"),
        googleGroups: contarRepeticonesHerr(cadena, "Google Groups"),
        yahooGroups: contarRepeticonesHerr(cadena, "Yahoo Groups"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepComunidadesB = (cadena) =>{
    r = {
        secondLife: contarRepeticonesHerr(cadena, "Second Life"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };
    return r;
}
calcularRepComunidadesC = (cadena) =>{
    r = {
        delicious: contarRepeticonesHerr(cadena, "Delicious"),
        digg: contarRepeticonesHerr(cadena, "Digg"),
        meneame: contarRepeticonesHerr(cadena, "Meneame"),
        diigo: contarRepeticonesHerr(cadena, "Diigo"),
        bloglines: contarRepeticonesHerr(cadena, "Bloglines"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };
    
    return r;
}
calcularRepBibliografia = (cadena) =>{
    r = {
        zootero: contarRepeticonesHerr(cadena, "Zootero"),
        mendeley: contarRepeticonesHerr(cadena, "Mendeley"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepMapas = (cadena) =>{
    r = {
        cmaptools: contarRepeticonesHerr(cadena, "Cmaptools"),
        freeMind: contarRepeticonesHerr(cadena, "FreeMind"),
        bubb: contarRepeticonesHerr(cadena, "Bubb.us"),
        mindomo: contarRepeticonesHerr(cadena, "Mindomo.com"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepLineas = (cadena) =>{
    r = {
        tiki: contarRepeticonesHerr(cadena, "https://www.tiki_toki.com/"),
        time: contarRepeticonesHerr(cadena, "https://time.graphics/"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepActividades = (cadena) =>{
    r = {
        hotPotatoes: contarRepeticonesHerr(cadena, "Hot Potatoes"),
        ardora: contarRepeticonesHerr(cadena, "Ardora"),
        educaplay: contarRepeticonesHerr(cadena, "Educaplay"),
        h5p: contarRepeticonesHerr(cadena, "H5P"),
        genially: contarRepeticonesHerr(cadena, "Genially"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepLMS = (cadena) =>{
    r = {
        moodle: contarRepeticonesHerr(cadena, "Moodle"),
        claroline: contarRepeticonesHerr(cadena, "Claroline"),
        chamilo: contarRepeticonesHerr(cadena, "Chamilo"),
        aTutor: contarRepeticonesHerr(cadena, "ATutor"),
        edmodo: contarRepeticonesHerr(cadena, "Edmodo"),
        googleScholar: contarRepeticonesHerr(cadena, "Google Scholar"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepGestion = (cadena) =>{
    r = {
        correo: contarRepeticonesHerr(cadena, "Correo electrónico"),
        office: contarRepeticonesHerr(cadena, "Paquetes de oficina"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}
calcularRepEstadisticas = (cadena) =>{
    r = {
        pspp: contarRepeticonesHerr(cadena, "PSPP"),
        r: contarRepeticonesHerr(cadena, "R"),
        calc: contarRepeticonesHerr(cadena, "Calc"),
        spss: contarRepeticonesHerr(cadena, "SPSS"),
        otros: contarRepeticonesHerr(cadena, "Otro")
    };    
    return r;
}

contarRepeticonesHerr = (cadena, herr) => {
    var i = 0;
    var counter = 0;
    while (i != -1){
        var i = cadena.indexOf(herr,i);
        if (i != -1){
            i++;
            counter++;
        }
    }
    return counter;    
}

calcularMomento = (puntaje) => {    
    if (puntaje < 12){
        return "Explorador";
    } else if (puntaje < 26) {
        return "Integrador";
    } else{
        return "Innovador";
    }
}

calcularEstado = (momento, competencia) => {    
    switch (competencia) {
        case "tec":
            if(momento == "Explorador"){
                return "Reconoce un amplio espectro de herramientas tecnológicasy algunas formas de integrarlas a la práctica educativa.";
            } else if(momento == "Integrador"){
                return "Utiliza diversas herramientas tecnológicas en los procesos educativos, de acuerdo a su rol, área de formación, nivel y contexto en el que se desempeña.";
            } else if(momento == "Innovador"){
                return "Aplica el conocimiento de una amplia variedad de tecnologías en el diseño de ambientes de aprendizaje innovadores y para plantear soluciones a problemas identificados en el contexto.";
            }            
        case "ped":
            if(momento == "Explorador"){
                return "Identifica nuevas estrategias y metodologías mediadas por las TIC, como herramienta para su desempeño profesional.";
            } else if(momento == "Integrador"){
                return "Identifica nuevas estrategias y metodologías mediadas por las TIC, como herramienta para su desempeño profesional.";
            } else if(momento == "Innovador"){
                return "Identifica nuevas estrategias y metodologías mediadas por las TIC, como herramienta para su desempeño profesional.";
            }
        case "com":
            if(momento == "Explorador"){
                return "Emplea diversos canales y lenguajes propios de las TIC para comunicarse con la comunidad educativa.";
            } else if(momento == "Integrador"){
                return "Desarrolla estrategias de trabajo colaborativo en el contexto escolar a partir de su participación en redes y comunidades con el uso de las TIC.";
            } else if(momento == "Innovador"){
                return "Desarrolla estrategias de trabajo colaborativo en el contexto escolar a partir de su participación en redes y comunidades con el uso de las TIC.";
            }
        case "ges":
            if(momento == "Explorador"){
                return "Emplea diversos canales y lenguajes propios de las TIC para comunicarse con la comunidad educativa.";
            } else if(momento == "Integrador"){
                return "Integra las TIC en procesos de dinamización de las gestiones directiva, académica, administrativa y comunitaria de su institución.";
            } else if(momento == "Innovador"){
                return "Propone y lidera acciones para optimizar procesos integrados de la gestión escolar.";
            }
        case "inv":
            if(momento == "Explorador"){
                return "Usa las TIC para hacer registro y seguimiento de lo que vive y observa en su práctica, su contexto y el de sus estudiantes.";
            } else if(momento == "Integrador"){
                return "Lidera proyectos de investigación propia y con sus estudiantes.";
            } else if(momento == "Innovador"){
                return "Construye estrategias educativas innovadoras que incluyen la generación colectiva  de conocimientos.";
            }
    }
}

module.exports = helpers;