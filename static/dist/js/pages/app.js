$('document').ready(function () {
  actionCountTank();
  actionCountPump();
  actionCountReservoir();
  actionCountValves();
  getDataTank();
  getDataReservoir();
  getDataPump();
  getDataValve();  
});

function getDataTank(){
	$.ajax({
        type: "GET",
        url: "api/v1/entitie/key/Tank",
        dataType: "json",
        success: function (data) {
			
			var idarray 		= [];
            var attribute1array = [];
			var attribute2array = [];

		//	var dataHora = new Date();
		//	var data_hora = dataHora.getDate()+"-"+(dataHora.getMonth()+1) +"-"+dataHora.getFullYear()+" / "+dataHora.getHours()+":"+dataHora.getMinutes();
		//	console.log(data_hora);
		
		
			for (var i in data) {
				idarray.push(data[i].id);
				attribute1array.push(data[i].Head);
				attribute2array.push(data[i].Pressure);
			}			
			graficoTank(idarray,attribute1array,attribute2array);
		
        },
		complete:function(data){
			setTimeout(getDataTank,30000);//15min = 900000 30seg = 30000
		}
    });
}

function getDataPump(){
	$.ajax({
        type: "GET",
        url: "api/v1/entitie/key/Pump",
        dataType: "json",
        success: function (data) {
			
            var idarray 		= [];
            var attribute1array = [];
			
			for (var i in data) {
				idarray.push(data[i].id);
				attribute1array.push(data[i].Flow);				
			}				
			graficoPump(idarray,attribute1array);
        },
		complete:function(data){
			setTimeout(getDataPump,30000);////15min30s = 930000
		}
    });
}

function getDataReservoir(){
	$.ajax({
        type: "GET",
        url: "api/v1/entitie/key/Reservoir",
        dataType: "json",
        success: function (data) {
			
            var idarray 		= [];
            var attribute1array = [];
			var attribute2array = [];
			
			for (var i in data) {
				idarray.push(data[i].id);
				attribute1array.push(data[i].Head);
				attribute2array.push(data[i].Pressure);
			}			
			graficoReservoir(idarray,attribute1array,attribute2array);
        },
		complete:function(data){
			setTimeout(getDataReservoir,30000);//15min55s = 955000
		}
    });
}

function getDataValve(){
	$.ajax({
        type: "GET",
        url: "api/v1/entitie/key/Valve",
        dataType: "json",
        success: function (data) {
			
            var idarray 		= [];
            var attribute1array = [];
			
			for (var i in data) {
				idarray.push(data[i].id);
				attribute1array.push(data[i].Flow);				
			}			
			graficoValve(idarray,attribute1array);
        },
		complete:function(data){
			setTimeout(getDataValve,30000);//15min55s = 955000
		}
    });
}

function graficoTank(id, attribute1, attribute2) {

    var ctx = document.getElementById('headChartTank').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: id,
            datasets: [
				{
					barPercentage: 0.3,
					data: attribute1,
					backgroundColor:['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)'],
					borderColor:['rgb(255, 99, 132)','rgb(255, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'],
					borderWidth:1
				}],
			order: 1
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
						min: 0
                    }
                }],
				yAxes: [{
				    ticks: {
                        beginAtZero: true,
						min: 0
					}
				}],
            },
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Nível (m³)'
			},
			gridLines:{
				display: false
			}
        }
    });
	
	var ctx1 = document.getElementById('pressureChartTank').getContext('2d');
    var chart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: id,
            datasets: [{
				barPercentage: 0.3,
				data: attribute2,
                backgroundColor:['rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(201, 203, 207, 0.2)'],
				borderColor:['rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(255, 99, 132)','rgb(255, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(201, 203, 207)'],
				borderWidth:1                
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
						min: 0
                    }
                }],
				yAxes: [{
				    ticks: {
                        beginAtZero: true,
						min: 0
					}
				}],
            },
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Pressão (mca)'
			}
        }
    });	
}

function graficoPump(id, attribute1) {
	
	var ctx2 = document.getElementById('flowChartPump').getContext('2d');
    var chart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: id,
            datasets: [{
				barPercentage: 0.4,
				data: attribute1,
                backgroundColor:['rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)','rgba(201, 203, 207, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)'],
				borderColor:['rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(201, 203, 207)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(255, 99, 132)','rgb(255, 159, 64)'],
				borderWidth:1                
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
						min: 0
                    }
                }],
				yAxes: [{
				    ticks: {
                        beginAtZero: true,
						min: 0
					}
				}],
            },
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Vazão (lps)'
			}
        }
    });
}

function graficoValve(id, attribute1) {
	
	var ctx2 = document.getElementById('flowChartValve').getContext('2d');
    var chart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: id,
            datasets: [{
				barPercentage: 0.4,
				data: attribute1,
                backgroundColor:['rgba(162, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)','rgba(201, 203, 207, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)'],
				borderColor:['rgb(162, 205, 86)','rgb(75, 192, 192)','rgb(201, 203, 207)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(255, 99, 132)','rgb(255, 159, 64)'],
				borderWidth:1          
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
						min: 0
                    }
                }],
				yAxes: [{
				    ticks: {
                        beginAtZero: true,
						min: 0
					}
				}],
            },
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Vazão (lps)'
			}
        }
    });
}

function graficoReservoir(id, attribute1, attribute2) {

    var ctx = document.getElementById('headChartReservoir').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: id,
            datasets: [
				{
					barPercentage: 0.3,
					data: attribute1,
					backgroundColor:['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)'],
					borderColor:['rgb(255, 99, 132)','rgb(255, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'],
					borderWidth:1
				}],
			order: 1
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
						min: 0
                    }
                }],
				yAxes: [{
				    ticks: {
                        beginAtZero: true,
						min: 0
					}
				}],
            },
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Nível (m³)'
			},
			gridLines:{
				display: false
			}
        }
    });
	
	var ctx1 = document.getElementById('pressureChartReservoir').getContext('2d');
    var chart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: id,
            datasets: [{
				barPercentage: 0.3,
				data: attribute2,
                backgroundColor:['rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(201, 203, 207, 0.2)'],
				borderColor:['rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(255, 99, 132)','rgb(255, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(201, 203, 207)'],
				borderWidth:1                
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
						min: 0
                    }
                }],
				yAxes: [{
				    ticks: {
                        beginAtZero: true,
						min: 0
					}
				}],
            },
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Pressão (mca)'
			}
        }
    });	
}

function actionCountTank() {
	
	$.ajax({
        type: "GET",
        url:  "/api/v1/count/Tank",
        dataType: "json",
        success: function (data) {
        	var txt1   = "",
        		count1 = 0;
        	
        	count1 = data;
			
			txt1 += "<span class='info-box-text'>Tanques</span>"
			txt1 += "<span class='info-box-number'>"
			txt1 += "<span>"+ count1 + "</span>"
			txt1 += "</span>"
		
			document.getElementById('numberTanks').innerHTML = txt1;
		},
		complete:function(data){
			setTimeout(actionCountTank,30000);//15min = 900000
		}
    });
}

function actionCountPump() {
	
	$.ajax({
        type: "GET",
        url:  "/api/v1/count/Pump",
        dataType: "json",
        success: function (data) {
        	var txt2   = "",
        		count2 = 0;
        	
        	count2 = data;
			
        	txt2 += "<span class='info-box-text'>Bombas</span>"
        	txt2 += "<span class='info-box-number'>"
        	txt2 += "<span>"+ count2 + "</span>"
        	txt2 += "</span>"
        		
        	document.getElementById('numberPumps').innerHTML = txt2;
	    },
		complete:function(data){
			setTimeout(actionCountPump,30000);//15min = 900000
		}
    });
}

function actionCountReservoir() {
	
	$.ajax({
        type: "GET",
        url:  "/api/v1/count/Reservoir",
        dataType: "json",
        success: function (data) {
        	var txt3 = "",
        		count3 = 0;
        	
        	count3 = data;
        	
        	txt3 += "<span class='info-box-text'>Reservatórios</span>"
        	txt3 += "<span class='info-box-number'>"
        	txt3 += "<span>"+ count3 + "</span>"
        	txt3 += "</span>"
        		
        	document.getElementById('numberReservoir').innerHTML = txt3;
		},
		complete:function(data){
			setTimeout(actionCountReservoir,30000);//15min = 900000
		}
    });
}

function actionCountValves() {
	
	$.ajax({
        type: "GET",
        url:  "/api/v1/count/Valve",
        dataType: "json",
        success: function (data) {
        	var txt1   = "",
        		count1 = 0;
        	
        	count1 = data;
			
			txt1 += "<span class='info-box-text'>Válvulas</span>"
			txt1 += "<span class='info-box-number'>"
			txt1 += "<span>"+ count1 + "</span>"
			txt1 += "</span>"
		
			document.getElementById('numberValves').innerHTML = txt1;
		},
		complete:function(data){
			setTimeout(actionCountValves,30000);//15min = 900000
		}
    });
}