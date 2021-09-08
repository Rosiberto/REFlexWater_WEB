var idarray = [], chartData = [],
      media, minimo, maximo;
  
  function xP(){
    var request1 = $.ajax({
      type: "GET",
      url: "api/v1/entitie/key/Pump",
      dataType: "json",      
    });
    $.when(request1).done(function(result1){
      
        for (j in result1){
          idarray.push(result1[j].id);          
          
          Min(result1[j].id);
          Med(result1[j].id);
          Max(result1[j].id);
                    
          criaCard(minimo,media,maximo);
          
          console.log("min med max: "+minimo + " - "+ media +" - "+maximo);
          Bruto(result1[j].id);
        }
        //console.log("idarray: "+idarray);        
    });  
  }
  
  
  function Min(id){
    var request2 = $.ajax({
      type: "GET",
      url:  "api/v1/min/"+ id +"/Pump/Flow/day",
      dataType: "json",      
      async: false,
    });
    $.when(request2).done(function(result2){
      
        console.log("min result: "+result2);    
        minimo = result2;
        
        return minimo;
    }); 
  }
  
  function Med(id){
    var request3 = $.ajax({
      type: "GET",
      url:  "api/v1/avg/"+ id +"/Pump/Flow/day",
      dataType: "json",
      async: false,
    });
    $.when(request3).done(function(result3){
      
        console.log("med result: "+result3);  
        
        media = result3;
        
        return media;
    }); 
  }
  
  function Max(id){
    var request4 = $.ajax({
      type: "GET",
      url:  "api/v1/max/"+ id +"/Pump/Flow/day",
      dataType: "json",
      async: false,
    });
    $.when(request4).done(function(result4){
      
        console.log("max result: "+result4);
        
        maximo = result4;
        
        return maximo;
    }); 
  }
  
  function Bruto(id){
  
    var request5 = $.ajax({
            type: "GET",
            url:  "api/v1/raw/"+ id +"/Pump/Flow/0",
            dataType: "json",            
            async: false,
    });
    $.when(request5).done(function(result5){
                         
        for (var i in result5){
          chartData.push([moment(result5[i].recvTime, moment.defaultFormat).toDate(),result5[i].attrValue]);
          
          g = new Dygraph(document.getElementById("rowGraphPump"+id),chartData,{ylabel: 'Flow (l/s)', labels: ['Tempo','Vazão']
                    , title: 'Consumo do Dia', rollPeriod: 1, drawPoints: true});
        
          //console.log(id+" i: "+i);
        }
        //console.log(id +" bruto result: "+chartData);
        chartData.length = 0;
    }); 
  }
  
  
  
  
  function criaCard(min, med, max){
     
    var divCol, divCard, divCardHeader, divCardBody, 
             divRowHeader, divColHeader, divChart, 
             divChartPump, divCardFooter, divRowFooter, 
             divColMaxFooter, divColMedFooter, divColMinFooter, 
             divMinFooter, divMedFooter, divMaxFooter;
             
    divCol = document.createElement("div");
    divCol.setAttribute('class','col-md-6');

    divCard = document.createElement("div");
    divCard.setAttribute('class', 'card');
		
    divCardHeader = document.createElement("div");
    divCardHeader.setAttribute('class', 'card-header');
    divCardHeader.innerHTML="<h5 class='card-title'><strong>Bomba - "+idarray[j]+"</strong></h5>";

    divCardBody = document.createElement("div");
    divCardBody.setAttribute('class', 'card-body');

    divRowHeader = document.createElement("div");
    divRowHeader.setAttribute('class', 'row');

    divColHeader = document.createElement("div");
    divColHeader.setAttribute('class', 'col-md-12');

    divChart = document.createElement("div");
    divChart.setAttribute('class', 'chart');
              
    divChartPump = document.createElement("div");
    divChartPump.setAttribute('id', 'rowGraphPump'+idarray[j]);
    divChartPump.setAttribute('style','height: 180px');
	
    divCardFooter = document.createElement("div");
    divCardFooter.setAttribute('class', 'card-footer');
	
    divRowFooter = document.createElement("div");
    divRowFooter.setAttribute('class', 'row');

    divColMinFooter = document.createElement("div");
    divColMinFooter.setAttribute('class', 'col-sm-4 col-8');          
    
    divColMedFooter = document.createElement("div");
    divColMedFooter.setAttribute('class', 'col-sm-4 col-8');

    divColMaxFooter = document.createElement("div");
    divColMaxFooter.setAttribute('class', 'col-sm-4 col-8');

    divMinFooter = document.createElement("div");
    divMinFooter.setAttribute('class', 'description-block border-right');    
    divMinFooter.innerHTML="<h5 class='description-header'>"+min+"</h5><span class='description-text'>VALOR MIN.</span>";
                
    divMedFooter = document.createElement("div");
    divMedFooter.setAttribute('class', 'description-block border-right');
    divMedFooter.innerHTML="<h5 class='description-header'>"+med+"</h5><span class='description-text'>VALOR MÉD.</span>";
	              
    divMaxFooter = document.createElement("div");
    divMaxFooter.setAttribute('class', 'description-block');
    divMaxFooter.innerHTML="<h5 class='description-header'>"+max+"</h5><span class='description-text'>VALOR MÁX.</span>";
		
    divColMinFooter.appendChild(divMinFooter);
    divColMedFooter.appendChild(divMedFooter);
    divColMaxFooter.appendChild(divMaxFooter);
          
    divRowFooter.appendChild(divColMinFooter);
    divRowFooter.appendChild(divColMedFooter);
    divRowFooter.appendChild(divColMaxFooter);          
          
    divCardFooter.appendChild(divRowFooter);
	
    divChart.appendChild(divChartPump);
    divColHeader.appendChild(divChart);
    divRowHeader.appendChild(divColHeader);
	
    divCardBody.appendChild(divRowHeader);
	
    divCard.appendChild(divCardHeader);
    divCard.appendChild(divCardBody);
    divCard.appendChild(divCardFooter);
	
    divCol.appendChild(divCard);
                                 
    document.getElementById("rowPump").appendChild(divCol);     
              
  }