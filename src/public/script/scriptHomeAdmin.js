$(document).ready(function(){
    $("#btnDocentesRegistrados").click(function() {
        
        esconder("#busquedaResultados");
        mostrar("#docentesRegistrados");
    });
    $("#btnAnalizarResultados").click(function() {
        esconder("#docentesRegistrados");
        mostrar("#busquedaResultados");
    });

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

    $("#selecCriterio").click(function() {        
        if ($("#selecCriterio").val() == "Búsqueda por Facultad"){
            mostrar("#selecFacultad");
        }else{
            esconder("#selecFacultad");
        }
    });
});

function mostrar(elemento){
    $(elemento).show("blind", 500);
}

function esconder(elemento){
    $(elemento).hide("blind", 500);
}