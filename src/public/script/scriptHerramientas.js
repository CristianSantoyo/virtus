$(document).ready(function(){
    
    $("#encuestaHerramientas").show("drop", 1000);
    
    $(".otros").on( 'change', function() {
        if( $(this).is(':checked') ) {
            mostrarTxt("#pnl" + this.id);
        } else {
            esconderTxt("#pnl" + this.id);
        }
    });

    $("#reiniciar").click(function() {
        $('.otros').each(function() {
            esconderTxt("#pnl"+this.id);
        });
    });
});

function mostrarTxt(radio){    
    $(radio).show("drop", 500);
}

function esconderTxt(radio){
    $(radio).hide("drop", 300);
}

function obtenerResultadosEncuesta2(){
    var result = $("input[type='checkbox']");
    
    var b = true;
    var tabla = "<table id='tab2' border='2px'>";    
    tabla += '<tr>';
    tabla += '<th>Tipo de Herramienta</th>';
    tabla += '<th>Herramienta</th>';    
    tabla += '</tr>';
    
    
    
    for (var i = 0; i < result.length; i++){
                
        var fila = result[i].id.split('-');       
        
        if (b){
            tabla += "<tr><td>" + determinarEnunciado(fila[1], fila[2]) + "</td><td><ul>";
            b = false;
        }
        
        if(result[i].checked == true){

            if (result[i].value == "Otros"){
                var text = "";

                if (fila[1] == '1' || fila[1] == '8'){
                    text = $("#p-" + fila[1] + "-" + fila[2] + "-cuales").val();
                    
                }else{
                    text = $("p-" + fila[1] + "-cuales").val();
                }

                tabla += "<li>" + text + "</li></ul></td></tr>";
            }else{
                tabla += "<li>" + result[i].value + "</li>";
            }           
        }
        if (result[i].value == "Otros"){
            b = true;
        }
    }

    $("#tablaEncuesta1").html(tabla);
}

function determinarEnunciado(f1, f2){

    switch (f1){
        case "1":
            switch(f2){
                case "a":
                    return "Herramientas de trabajo colaborativo: a. Para documentos colaborativos:";
                case "b":
                    return "Herramientas de trabajo colaborativo: b. Para la generación de conocimiento:";
                case "c":
                    return "Herramientas de trabajo colaborativo: c. Para la creación de sitios web o blogs educativos:";
            }
            break;
        case "2":
            return "Herramientas para la creación de Objetos Virtuales de Aprendizaje (OVA)";
        case "3":
            return "Herramientas para el manejo de video";
        case "4":
            return "Herramienta para el manejo de audio";
        case "5":
            return "Herramientas para el manejo de textos e imágenes";
        case "6":
            return "Herramientas para presentaciones en la nube";
        case "7":
            return "Herramientas para videoconferencias y reuniones online";
        case "8":
            switch(f2){
                case "a":
                    return "Herramientas para comunidades: a. Redes sociales";
                case "b":
                    return "Herramientas para comunidades: b. Mundos Virtuales";
                case "c":
                    return "Herramientas para comunidades: c. BooksMarks y agregadores RSS:";
            }
            break;
        case "9":
            return "Herramientas para tratamiento bibliográfico";
        case "10":
            return "Herramientas para la creación de mapas mentales";
        case "11":
            return "Herramientas para la creación de líneas de tiempo";
        case "12":
            return "Herramientas para la creación de actividades digitales lúdicas";
        case "13":
            return "Sistemas administradores de aprendizaje (LMS)";
        case "14":
            return "Herramientas para comunicación y gestión";
        case "15":
            return "Herramientas estadísticas";
        
    }
    
        
    

}