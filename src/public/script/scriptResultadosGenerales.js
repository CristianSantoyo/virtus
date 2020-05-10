$(document).ready(function(){
    
    $("#selecCriterio").click(function() {
        if ($("#selecCriterio").val() == "Búsqueda por Facultad"){
            mostrar("#selecFacultad");
        }else{
            esconder("#selecFacultad");
        }
    });
    $("#añoSi").click(() => {
        mostrar("#selecAño");
    });

    $("#añoNo").click(() => {
        esconder("#selecAño");
    });
    // GRAFICAR COMPETENCIAS      
    c3.generate({
        bindto: '#grafica',
        data: {
          columns: construirDatosDonut('nom', 'pun'),
          type : 'donut',
        },
        donut: {
            title: "TIC"
        }
    });
    // GRAFICAR HERRAMIENTAS
    c3.generate({
        bindto: '#grafTrabajoA',
        data: {
            x : 'x',
            columns: construirDatos('nomTrabajoA', 'nomHerrTrabajoA', 'punHerrTrabajoA')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafTrabajoB',
        data: {
            x : 'x',
            columns: construirDatos('nomTrabajoB', 'nomHerrTrabajoB', 'punHerrTrabajoB')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafTrabajoC',
        data: {
            x : 'x',
            columns: construirDatos('nomTrabajoC', 'nomHerrTrabajoC', 'punHerrTrabajoC')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafOva',
        data: {
            x : 'x',
            columns: construirDatos('nomOva', 'nomHerrOva', 'punHerrOva')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafVideo',
        data: {
            x : 'x',
            columns: construirDatos('nomVideo', 'nomHerrVideo', 'punHerrVideo')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafAudio',
        data: {
            x : 'x',
            columns: construirDatos('nomAudio', 'nomHerrAudio', 'punHerrAudio')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafTextoImagenes',
        data: {
            x : 'x',
            columns: construirDatos('nomTextoImagenes', 'nomHerrTextoImagenes', 'punHerrTextoImagenes')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafPresentacion',
        data: {
            x : 'x',
            columns: construirDatos('nomPresentacion', 'nomHerrPresentacion', 'punHerrPresentacion')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafVideoConferencia',
        data: {
            x : 'x',
            columns: construirDatos('nomVideoConferencia', 'nomHerrVideoConferencia', 'punHerrVideoConferencia')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafComunidadesA',
        data: {
            x : 'x',
            columns: construirDatos('nomComunidadesA', 'nomHerrComunidadesA', 'punHerrComunidadesA')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafComunidadesB',
        data: {
            x : 'x',
            columns: construirDatos('nomComunidadesB', 'nomHerrComunidadesB', 'punHerrComunidadesB')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafComunidadesC',
        data: {
            x : 'x',
            columns: construirDatos('nomComunidadesC', 'nomHerrComunidadesC', 'punHerrComunidadesC')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafBibliografia',
        data: {
            x : 'x',
            columns: construirDatos('nomBibliografia', 'nomHerrBibliografia', 'punHerrBibliografia')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafMapas',
        data: {
            x : 'x',
            columns: construirDatos('nomMapas', 'nomHerrMapas', 'punHerrMapas')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafLineas',
        data: {
            x : 'x',
            columns: construirDatos('nomLineas', 'nomHerrLineas', 'punHerrLineas')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafActividades',
        data: {
            x : 'x',
            columns: construirDatos('nomActividades', 'nomHerrActividades', 'punHerrActividades')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafLMS',
        data: {
            x : 'x',
            columns: construirDatos('nomLMS', 'nomHerrLMS', 'punHerrLMS')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafComunicacionGestion',
        data: {
            x : 'x',
            columns: construirDatos('nomComunicacionGestion', 'nomHerrComunicacionGestion', 'punHerrComunicacionGestion')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
    c3.generate({
        bindto: '#grafEstadistica',
        data: {
            x : 'x',
            columns: construirDatos('nomEstadistica', 'nomHerrEstadistica', 'punHerrEstadistica')
        },
        axis: {
            x: {
                type: 'category'
            }
        }
    });
});

function mostrar(elemento){
    $(elemento).show("blind", 500);
}

function esconder(elemento){
    $(elemento).hide("blind", 500);
}

construirDatos = function(codNom, codNomHerr, codPun){
    var nom = [];
    var nomHerr = [];
    var pun = [];
    var i = 0;
    $("." + codNom).each(function(){
        nom[i] = $(this).text();
        i++;
    });
    i = 1;
    nomHerr[0] = 'x';
    $("." + codNomHerr).each(function(){
        nomHerr[i] = $(this).text();
        i++;
    });
    i = 0
    $("." + codPun).each(function(){
        pun[i] = $(this).text();
        i++;
    });
    var columnas = [];
    columnas[0] = nomHerr;
    t = pun.length / nom.length;
    n = pun.length / (nomHerr.length-1)
    for (var j = 0; j < nom.length; j++){
        a = [nom[j]];
        b = []
        for (k = 0; k < t; k++){
            b[k] = pun[k*n + j];
        }
        columnas[j+1] = a.concat(b);
    }
    //console.log(columnas);
    return columnas;
}

construirDatosDonut = function(codNom, codPun){
    var nom = [];
    var pun = [];
    var i = 0;
    $("." + codNom).each(function(){
        nom[i] = $(this).text();
        i++;
    });
    i = 0
    $("." + codPun).each(function(){
        pun[i] = $(this).text();
        i++;
    });    
    var columnas = [];
    for (var j = 0; j < nom.length; j++){
        columnas[j] = [nom[j], pun[j]];
    }
    return columnas;
}