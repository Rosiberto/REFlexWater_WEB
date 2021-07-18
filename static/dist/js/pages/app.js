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
					backgroundColor:['rgba(112, 122, 132, 0.2)','rgba(251, 215, 96, 0.2)','rgba(79, 137, 255, 0.2)','rgba(211, 213, 217, 0.2)','rgba(66, 163, 243, 0.2)','rgba(58, 168, 253, 0.2)','rgba(113, 202, 225, 0.2)','rgba(22, 22, 222, 0.2)','rgba(55, 59, 64, 0.2)','rgba(24, 49, 54, 0.2)','rgba(145, 10, 24,0.2)','rgba(75, 19, 92, 0.2)','rgba(215, 189, 224, 0.2)','rgba(88, 88, 254, 0.2)','rgba(96, 16, 206, 0.2)','rgba(20, 120, 231, 0.2)','rgba(92, 93, 149, 0.2)','rgba(155, 55, 255, 0.2)','rgba(15, 109, 199, 0.2)','rgba(251, 199, 172, 0.2)'
],
					borderColor:['rgba(112, 122, 132, 0.2)','rgba(251, 215, 96, 0.2)','rgba(79, 137, 255, 0.2)','rgba(211, 213, 217, 0.2)','rgba(66, 163, 243, 0.2)','rgba(58, 168, 253, 0.2)','rgba(113, 202, 225, 0.2)','rgba(22, 22, 222, 0.2)','rgba(55, 59, 64, 0.2)','rgba(24, 49, 54, 0.2)','rgba(145, 10, 24,0.2)','rgba(75, 19, 92, 0.2)','rgba(215, 189, 224, 0.2)','rgba(88, 88, 254, 0.2)','rgba(96, 16, 206, 0.2)','rgba(20, 120, 231, 0.2)','rgba(92, 93, 149, 0.2)','rgba(155, 55, 255, 0.2)','rgba(15, 109, 199, 0.2)','rgba(251, 199, 172, 0.2)'
],
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
                backgroundColor:['rgba(110, 120, 130, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 107, 247, 0.2)','rgba(201, 203, 207, 0.2)','rgba(33, 133, 233, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(122, 22, 222, 0.2)','rgba(255, 159, 64, 0.2)','rgba(245, 149, 54, 0.2)','rgba(45, 109, 254, 0.2)','rgba(75, 192, 192, 0.2)','rgba(15, 89, 124, 0.2)','rgba(88, 188, 249, 0.2)','rgba(90, 10, 200, 0.2)','rgba(2, 102, 212, 0.2)','rgba(29, 39, 49, 0.2)','rgba(55, 155, 255, 0.2)','rgba(105, 209, 169, 0.2)','rgba(255, 99, 132, 0.2)'
],
				borderColor:['rgba(110, 120, 130, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 107, 247, 0.2)','rgba(201, 203, 207, 0.2)','rgba(33, 133, 233, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(122, 22, 222, 0.2)','rgba(255, 159, 64, 0.2)','rgba(245, 149, 54, 0.2)','rgba(45, 109, 254, 0.2)','rgba(75, 192, 192, 0.2)','rgba(15, 89, 124, 0.2)','rgba(88, 188, 249, 0.2)','rgba(90, 10, 200, 0.2)','rgba(2, 102, 212, 0.2)','rgba(29, 39, 49, 0.2)','rgba(55, 155, 255, 0.2)','rgba(105, 209, 169, 0.2)','rgba(255, 99, 132, 0.2)'
],
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
                backgroundColor:['rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)','rgba(201, 203, 207, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(245, 149, 54, 0.2)','rgba(45, 109, 254, 0.2)','rgba(15, 89, 124, 0.2)','rgba(105, 209, 169, 0.2)','rgba(33, 133, 233, 0.2)','rgba(88, 188, 249, 0.2)','rgba(122, 22, 222, 0.2)','rgba(90, 10, 200, 0.2)','rgba(110, 120, 130, 0.2)','rgba(75, 107, 247, 0.2)','rgba(2, 102, 212, 0.2)','rgba(29, 39, 49, 0.2)','rgba(55, 155, 255, 0.2)'],
				borderColor:['rgba(255, 205, 86)', 'rgba(75, 192, 192)','rgba(201, 203, 207)','rgba(54, 162, 235)','rgba(153, 102, 255)','rgba(255, 99, 132)','rgba(255, 159, 64)','rgba(245, 149, 54)','rgba(45, 109, 254)','rgba(15, 89, 124)','rgba(105, 209, 169)','rgba(33, 133, 233)','rgba(88, 188, 249)','rgba(122, 22, 222)','rgba(90, 10, 200, 0.2)','rgba(110, 120, 130)','rgba(75, 107, 247)','rgba(2, 102, 212 )','rgba(29, 39, 49)','rgba(55, 155, 255)'],
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
                backgroundColor:['rgba(153, 102, 255, 0.2)','rgba(251, 215, 96, 0.2)','rgba(255, 159, 64, 0.2)','rgba(211, 213, 217, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 99, 132, 0.2)','rgba(75, 192, 192, 0.2)','rgba(75, 19, 92, 0.2)','rgba(55, 59, 64, 0.2)','rgba(24, 49, 54, 0.2)','rgba(20, 120, 231, 0.2)','rgba(22, 22, 222, 0.2)','rgba(251, 199, 172, 0.2)','rgba(162, 205, 86, 0.2)','rgba(155, 55, 255, 0.2)','rgba(201, 203, 207, 0.2)','rgba(145, 10, 24,0.2)','rgba(15, 109, 199, 0.2)','rgba(96, 16, 206, 0.2)','rgba(215, 189, 224, 0.2)'],
				borderColor:['rgba(153, 102, 255, 0.2)','rgba(251, 215, 96, 0.2)','rgba(255, 159, 64, 0.2)','rgba(211, 213, 217, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 99, 132, 0.2)','rgba(75, 192, 192, 0.2)','rgba(75, 19, 92, 0.2)','rgba(55, 59, 64, 0.2)','rgba(24, 49, 54, 0.2)','rgba(20, 120, 231, 0.2)','rgba(22, 22, 222, 0.2)','rgba(251, 199, 172, 0.2)','rgba(162, 205, 86, 0.2)','rgba(155, 55, 255, 0.2)','rgba(201, 203, 207, 0.2)','rgba(145, 10, 24,0.2)','rgba(15, 109, 199, 0.2)','rgba(96, 16, 206, 0.2)','rgba(215, 189, 224, 0.2)'],
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
					backgroundColor:['rgba(88, 188, 249, 0.2)','rgba(255, 205, 86, 0.2)','rgba(29, 39, 49, 0.2)', 'rgba(75, 192, 192, 0.2)','rgba(201, 203, 207, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(245, 149, 54, 0.2)','rgba(45, 109, 254, 0.2)','rgba(110, 120, 130, 0.2)','rgba(15, 89, 124, 0.2)','rgba(105, 209, 169, 0.2)','rgba(33, 133, 233, 0.2)','rgba(122, 22, 222, 0.2)','rgba(90, 10, 200, 0.2)','rgba(75, 107, 247, 0.2)','rgba(2, 102, 212, 0.2)','rgba(55, 155, 255, 0.2)'],
					borderColor:['rgba(88, 188, 249, 0.2)','rgba(255, 205, 86, 0.2)','rgba(29, 39, 49, 0.2)', 'rgba(75, 192, 192, 0.2)','rgba(201, 203, 207, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(245, 149, 54, 0.2)','rgba(45, 109, 254, 0.2)','rgba(110, 120, 130, 0.2)','rgba(15, 89, 124, 0.2)','rgba(105, 209, 169, 0.2)','rgba(33, 133, 233, 0.2)','rgba(122, 22, 222, 0.2)','rgba(90, 10, 200, 0.2)','rgba(75, 107, 247, 0.2)','rgba(2, 102, 212, 0.2)','rgba(55, 155, 255, 0.2)'],
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
                backgroundColor:['rgba(155, 55, 255, 0.2)','rgba(153, 102, 255, 0.2)','rgba(251, 215, 96, 0.2)','rgba(255, 159, 64, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 99, 132, 0.2)','rgba(162, 205, 86, 0.2)','rgba(201, 203, 207, 0.2)','rgba(75, 192, 192, 0.2)','rgba(75, 19, 92, 0.2)','rgba(55, 59, 64, 0.2)','rgba(24, 49, 54, 0.2)','rgba(20, 120, 231, 0.2)','rgba(22, 22, 222, 0.2)','rgba(251, 199, 172, 0.2)','rgba(145, 10, 24,0.2)','rgba(15, 109, 199, 0.2)','rgba(96, 16, 206, 0.2)','rgba(215, 189, 224, 0.2)','rgba(211, 213, 217, 0.2)'],
				borderColor:['rgba(155, 55, 255, 0.2)','rgba(153, 102, 255, 0.2)','rgba(251, 215, 96, 0.2)','rgba(255, 159, 64, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 99, 132, 0.2)','rgba(162, 205, 86, 0.2)','rgba(201, 203, 207, 0.2)','rgba(75, 192, 192, 0.2)','rgba(75, 19, 92, 0.2)','rgba(55, 59, 64, 0.2)','rgba(24, 49, 54, 0.2)','rgba(20, 120, 231, 0.2)','rgba(22, 22, 222, 0.2)','rgba(251, 199, 172, 0.2)','rgba(145, 10, 24,0.2)','rgba(15, 109, 199, 0.2)','rgba(96, 16, 206, 0.2)','rgba(215, 189, 224, 0.2)','rgba(211, 213, 217, 0.2)'],
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