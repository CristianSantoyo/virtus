$(document).ready(function(){
    
    $("#perfil-normal").show("blind", 1000);
    $("#perfil-editar").show("puff", 1000);

    $("#btnInputFile").click(() => {
        $("#inputFileImg").click();        
    });

    $("#inputFileImg").change(() =>{
        const file =  $("#inputFileImg").val();
        if(file){
            $("#spanInputFile").text(file);
            $("#spanInputFile").show("fade", 500);
        }else{            
            $("#spanInputFile").hide("fade", 500);
        }        
    });

    $("#inst-otra-si").click(() => {
        mostrar("#txtInstitucion");
    });

    $("#inst-otra-no").click(() => {
        esconder("#txtInstitucion");
    });

    $("#facultad-otra-si").click(() => {
        mostrar("#txtFacultad");
    });

    $("#facultad-otra-no").click(() => {
        esconder("#txtFacultad");
    });

    $("#area-otra-si").click(() => {
        mostrar("#txtArea");
    });

    $("#area-otra-no").click(() => {
        esconder("#txtArea");
    });

    $("#cicl-otra-si").click(() => {
        mostrar("#txtCiclo");
    });

    $("#cicl-otra-no").click(() => {
        esconder("#txtCiclo");
    });
    
    $("#selecInstitucion").click(() => {
        $("#selecFacultad option").each(function(){
            $(this).show();
        });
        var indexInstitucion = $("#selecInstitucion").val();        
        $("#selecFacultad").val(null);

        if (indexInstitucion != null){
            mostrar("#divFacultad");
            
            $("#selecFacultad option").each(function() {                
                if ( $(this).hasClass(indexInstitucion) == false) {
                    $(this).hide();
                }
            });
        }else{
            esconder("#divFacultad");
        }        
    });

    modificarSelect();
 });

function mostrar(elemento){    
    $(elemento).show("drop", 500);
}

function esconder(elemento){
    $(elemento).hide("drop", 300);
}

function modificarSelect(){
    //Codigo para modificar los select del formulario de edicion
    var aux = $("#auxGenero").val();
    if (aux == "F"){
        $("#selecGenero").val("Femenino");
    } else if (aux == "M") {
        $("#selecGenero").val("Masculino");
    } else if (aux == "O"){
        $("#selecGenero").val("Otro");
    }    
}