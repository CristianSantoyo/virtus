$(document).ready(function(){   
    
    var total = Number($("#total_M1").val()) + Number($("#total_M2").val()) + Number($("#total_M3").val());
    if (total < 60) {
      $("#imgRes").attr("src","/images/imagenesResultados/graficoExploracion.png");
    }else if (total < 140) {
      $("#imgRes").attr("src","/images/imagenesResultados/graficoIntegracion.png");
    }else {        
      $("#imgRes").attr("src","/images/imagenesResultados/graficoInnovacion.png");
    }
    
    ubicarPunto("#pntTec", $("#tecM").val());
    ubicarPunto("#pntPed", $("#pedM").val());
    ubicarPunto("#pntCom", $("#comM").val());
    ubicarPunto("#pntGes", $("#gesM").val());
    ubicarPunto("#pntInv", $("#invM").val());
    
    c3.generate({
        bindto: '#grafTec',
        data: {
          columns: [
            ['M1',$("#tec_m1").val()],
            ['M2', $("#tec_m2").val()],
            ['M3', $("#tec_m3").val()]
          ],
          type : 'bar',
        }
    });

    c3.generate({
        bindto: '#grafPed',
        data: {
          columns: [
            ['M1', $("#ped_m1").val()],
            ['M2', $("#ped_m2").val()],
            ['M3', $("#ped_m3").val()]
          ],
          type : 'bar',
        }
    });

    c3.generate({
        bindto: '#grafCom',
        data: {
          columns: [
            ['M1', $("#com_m1").val()],
            ['M2', $("#com_m2").val()],
            ['M3', $("#com_m3").val()]
          ],
          type : 'bar',
        }
    });

    c3.generate({
        bindto: '#grafGes',
        data: {
          columns: [
            ['M1', $("#ges_m1").val()],
            ['M2', $("#ges_m2").val()],
            ['M3', $("#ges_m3").val()]
          ],
          type : 'bar',
        }
    });

    c3.generate({
        bindto: '#grafInv',
        data: {
          columns: [
            ['M1', $("#inv_m1").val()],
            ['M2', $("#inv_m2").val()],
            ['M3', $("#inv_m3").val()]
          ],
          type : 'bar',
        }
    });

    $("#btnDescargarPDF").click(function(){

      var doc = new jsPDF('p', 'pt', 'letter');      
      var margins = {top: 75, bottom: 50, left: 75, width: 550};
      
      var tab1 = $('#tabla1')[0];
      var tab2 = $('#tabla2')[0];
      var tab3 = $('#tabla3')[0];
      var tab4 = $('#tabla4')[0];
           
      doc.fromHTML(tab1, 
        margins.left, 
        margins.top, 
        {'width': margins.width }, 
        margins);
      doc.addPage();
      doc.fromHTML(tab2, 
        margins.left, 
        margins.top, 
        {'width': margins.width }, 
        margins);
      doc.addPage();
      doc.fromHTML(tab3, 
        margins.left, 
        margins.top, 
        {'width': margins.width }, 
        margins);
      doc.addPage();
      doc.fromHTML(tab4, 
        margins.left, 
        margins.top, 
        {'width': margins.width }, 
        margins);
            
      
      doc.save("resultadosPDF.pdf");
      /*html2canvas(document.body).then(
        canvas => {
          var img = canvas.toDataURL("image/png");
          //console.log(img);
          doc.addImage(img, "JPEG", 15 , 15);
          doc.addPage();
          doc.save("resultadosPDF.pdf");
      });      */
    });
});

function ubicarPunto(punto, momento){

  $(punto).show("puff", 1000);
  switch(momento){
    case "Explorador":      
      if (punto=="#pntTec"){
        $(punto).animate({
            left: "81px",
            top: "107px"
        });
      } else if (punto=="#pntPed"){
        $(punto).animate({
            left: "230px",
            top: "2px"
        });
      } else if (punto=="#pntCom"){
        $(punto).animate({
            left: "373px",
            top: "107px"
        });
      } else if (punto=="#pntGes"){
        $(punto).animate({
            left: "323px",
            top: "274px"
        });
      } else if (punto=="#pntInv"){
        $(punto).animate({
            left: "130px",
            top: "274px"
        });
      }      
      break;
    case "Integrador":
      if (punto=="#pntTec"){
        $(punto).animate({
            left: "112px",
            top: "124px"
        });
      } else if (punto=="#pntPed"){
        $(punto).animate({
            left: "230px",
            top: "42px"
        });
      } else if (punto=="#pntCom"){
        $(punto).animate({
            left: "343px",
            top: "124px"
        });
      } else if (punto=="#pntGes"){
        $(punto).animate({
            left: "304px",
            top: "254px"
        });
      } else if (punto=="#pntInv"){
        $(punto).animate({
            left: "154px",
            top: "254px"
        });
      }      
      break;
    case "Innovador":
      if (punto=="#pntTec"){
        $(punto).animate({
            left: "148px",
            top: "140px"
        });
      } else if (punto=="#pntPed"){
        $(punto).animate({
            left: "230px",
            top: "84px"
        });
      } else if (punto=="#pntCom"){
        $(punto).animate({
            left: "303px",
            top: "140px"
        });
      } else if (punto=="#pntGes"){
        $(punto).animate({
            left: "278px",
            top: "230px"
        });
      } else if (punto=="#pntInv"){
        $(punto).animate({
            left: "175px",
            top: "230px"
        });
      }      
      break;      
  }
 
}
