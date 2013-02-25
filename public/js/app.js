var http,scope;
var formatterNum,
    formatterEur,
    formatterPerct,
    formatterArrow;
var keySheet='';
try{
keySheet=/[?&]+key=([^&]+)/.exec(location.href)[1];
}catch(e) {}
if(keySheet==''){setTimeout(function (){document.body.innerHTML="Error en la key de la hoja "+keySheet},200);throw 'Aborta ejecucion';}

function MainCtrl($scope,$http){
    scope=$scope;
    http=$http;

    http.jsonp('https://spreadsheets.google.com/feeds/cells/'+keySheet+'/od4/public/basic?alt=json-in-script&callback=JSON_CALLBACK')
    .success(function (data,s,h,c){
        var array= _.map(data.feed.entry,function(v){return v.content.$t;});
        scope.datos=array;
//            console.log(array);
    }).error(function (){console.log(arguments[0]);});
}
function init(){

    formatterNum=new google.visualization.NumberFormat({fractionDigits:0,decimalSymbol:',',groupingSymbol:'.'});
    formatterEur=new google.visualization.NumberFormat({fractionDigits:0,decimalSymbol:',',groupingSymbol:'.',suffix:' €'});
    formatterPerct=new google.visualization.NumberFormat({decimalSymbol:',',groupingSymbol:'.',suffix:'%'});
    formatterArrow=new google.visualization.ArrowFormat();
    //CHART1 INGRESOS y GASTOS totales
    var chart1=new google.visualization.ChartWrapper({
        chartType:'ColumnChart',
        containerId:'ingresosGastosChart',
        options:{
            animation:{duration:500,easing:'in'},
            vAxis:{minValue:0},
            theme:'maximized',
            isStacked:true,title:'Ingresos y Gastos netos',
            legend:{position:'none'}
        }

    });
    var query1=new google.visualization.Query('https://docs.google.com/spreadsheet/pub?key='+keySheet+'&single=true&gid=0');
    query1.send(function (response){
        var dataT=response.getDataTable();
        formatterEur.format(dataT,1);formatterEur.format(dataT,2);
        chart1.setDataTable(dataT);
        chart1.draw();
    });

    //CHART2 ACTIVOS TOTALES
    var chart2=new google.visualization.ChartWrapper({
        chartType:'ColumnChart',
        containerId:'activosTotalesChart',
        options:{
            legend:{position:'none'},
            title:'Activos Totales',
            vAxis:{textPosition:'none',minValue:0,maxValue:100},
            hAxis:{textPosition:'none'}
        }
        , dataTable:[['Eje','Datos'],['Activos',100]]

    });
    chart2.draw();


//    CHART3 Horizonte Temporal Patrimonial
    var chart3 = new google.visualization.ChartWrapper({
        chartType:'PieChart',
        containerId:'patrimonialChart',
        options:{
            title:'Horizonte temporal patrimonial',
            chartArea: {width: '80%', height: '80%'},
            is3D:true
        }
    });
    var query3=new google.visualization.Query('https://docs.google.com/spreadsheet/pub?key='+keySheet+'&single=true&gid=1');
    query3.send(function (response){
        var dataT=response.getDataTable();
//        fformatterEur.format(dataT,2);
        chart3.setDataTable(dataT);
        chart3.draw();
    });

    //    CHART4 PEnsión de jubilación
    var chart4 = new google.visualization.ChartWrapper({
        chartType:'ColumnChart',
        containerId:'pensionChart',
        options:{
            animation:{duration:500,easing:'in'},
            vAxis:{minValue:0},
            theme:'maximized',
            isStacked:true,title:'Pensión de jubilación',
            legend:{position:'none'}
        }
    });
    var query4=new google.visualization.Query('https://docs.google.com/spreadsheet/pub?key='+keySheet+'&single=true&gid=3');
    query4.send(function (response){
        var dataT=response.getDataTable();
        formatterEur.format(dataT,1);formatterEur.format(dataT,2);
        chart4.setDataTable(dataT);
        chart4.draw();
    });

    //    CHART5 PEnsión de invalidez
    var chart5 = new google.visualization.ChartWrapper({
        chartType:'ColumnChart',
        containerId:'pensionInvalidezChart',
        options:{
            animation:{duration:500,easing:'in'},
            vAxis:{minValue:0},
            theme:'maximized',
            isStacked:true,title:'Pensión de invalidez',
            legend:{position:'none'}
        }
    });
    var query5=new google.visualization.Query('https://docs.google.com/spreadsheet/pub?key='+keySheet+'&single=true&gid=4');
    query5.send(function (response){
        var dataT=response.getDataTable();
        formatterEur.format(dataT,1);formatterEur.format(dataT,2);
        chart5.setDataTable(dataT);
        chart5.draw();
    });

    //    CHART6 PEnsión de viudedad
    var chart6 = new google.visualization.ChartWrapper({
        chartType:'ColumnChart',
        containerId:'pensionViudedadChart',
        options:{
            animation:{duration:500,easing:'in'},
            vAxis:{minValue:0},
            theme:'maximized',
            isStacked:true,title:'Pensión de viudedad',
            legend:{position:'none'}
        }
    });
    var query6=new google.visualization.Query('https://docs.google.com/spreadsheet/pub?key='+keySheet+'&single=true&gid=5');
    query6.send(function (response){
        var dataT=response.getDataTable();
        formatterEur.format(dataT,1);formatterEur.format(dataT,2);
        chart6.setDataTable(dataT);
        chart6.draw();
    });



}

