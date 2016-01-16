//scattter
// 路径配置
require.config({
    paths:{ 
      'echarts' : '../static/echarts',
      'echarts/chart/line' : '../static/chart/line',
      'echarts/chart/bar' : '../static/chart/bar',
      'echarts/chart/scatter' : '../static/chart/scatter' 
    }
  });
require(
[
  'echarts',
  'echarts/chart/line',// 使用柱状图就加载bar模块，按需加载
  'echarts/chart/bar',
  'echarts/chart/scatter'
    
], 
    DrawEChart2
);
var myChart2;
function DrawEChart2(ec) {
    // 基于准备好的dom，初始化echarts图表
  myChart2 = ec.init(document.getElementById('scatter2')); 
  
  var option = {
    title : {
        text : '土地时间坐标散点图',
    },
    tooltip : {
        trigger: 'axis',
        axisPointer:{
            show: true,
            type : 'cross',
            lineStyle: {
                type : 'dashed',
                width : 1
            }
        }
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    dataZoom: {
        show: true,
        start : 30,
        end : 70
    },
    legend : {
        data : ['商住','工业','住宅','其他']
    },
      //symbolList: ['circle'],
    grid: {
        y2: 80
    },
    xAxis : [
        {
            type : 'time',
            splitNumber:10
        }
    ],
    yAxis : [
        {
            type : 'value',
            name : '每平方米均价(元)',
            axisLabel:{formatter:'{value} '}
        }
    ],
    animation: false,
    series : [
        {
            name:'商住',
            type:'scatter',
            tooltip : {
                trigger: 'axis',
                formatter : function (params) {
                    var date = new Date(params.value[0]);
                    return params.seriesName 
                           + ' （'
                           + date.getFullYear() + '-'
                           + (date.getMonth() + 1) + '-'
                           + date.getDate() + ' '
                           + date.getHours() + ':'
                           + date.getMinutes()
                           +  '）<br/>'
                           + params.value[1] + ', ' 
                           + params.value[2];
                },
                axisPointer:{
                    type : 'cross',
                    lineStyle: {
                        type : 'dashed',
                        width : 1
                    }
                }
            },
            symbolSize: function (value){
                	mysize = 15;
                return mysize;
            },
            data: [[new Date(2015,11,10),2700.105517,53072],[new Date(2014,4, 30),673,3182],[new Date(2013,11,24),5600,41909],[new Date(2013,11,24),905,30623],[new Date(2013,11,24),1328,41625],[new Date(2013,8,19),331.8584071,5424],[new Date(2013,3,19),4050.668587,63866]]
        },
        {
            name:'工业',
            type:'scatter',
            tooltip : {
                trigger: 'axis',
                formatter : function (params) {
                    var date = new Date(params.value[0]);
                    return params.seriesName 
                           + ' （'
                           + date.getFullYear() + '-'
                           + (date.getMonth() + 1) + '-'
                           + date.getDate() + ' '
                           + date.getHours() + ':'
                           + date.getMinutes()
                           +  '）<br/>'
                           + params.value[1] + ', ' 
                           + params.value[2];
                },
                axisPointer:{
                    type : 'cross',
                    lineStyle: {
                        type : 'dashed',
                        width : 1
                    }
                }
            },
            symbolSize: function (value){
                	mysize = 15;
                return mysize;
            },
            data: [[new Date(2015, 3, 7),384 ,33290.44],[new Date(2015,3,6),200.4008016,998],[new Date(2013,11,23),280,38795],[new Date(2013,5,6),96,97078],[new Date(2012,6,20),264,21636],[new Date(2011,6,16),215.9140384,10051]]
        },
        {
            name:'住宅',
            type:'scatter',
            tooltip : {
                trigger: 'axis',
                formatter : function (params) {
                    var date = new Date(params.value[0]);
                    return params.seriesName 
                           + ' （'
                           + date.getFullYear() + '-'
                           + (date.getMonth() + 1) + '-'
                           + date.getDate() + ' '
                           + date.getHours() + ':'
                           + date.getMinutes()
                           +  '）<br/>'
                           + params.value[1] + ', ' 
                           + params.value[2];
                },
                axisPointer:{
                    type : 'cross',
                    lineStyle: {
                        type : 'dashed',
                        width : 1
                    }
                }
            },
            symbolSize: function (value){
                	mysize = 15;
                return mysize;
            },
            data: [[new Date(2015, 3, 7),1905.359747 ,54163],[new Date(2013,11,23),390.0000182,27397.65],[new Date(2012,8,17),2698.922583,6506.30]]
        },
        {
            name:'其他',
            type:'scatter',
            tooltip : {
                trigger: 'axis',
                formatter : function (params) {
                    var date = new Date(params.value[0]);
                    return params.seriesName 
                           + ' （'
                           + date.getFullYear() + '-'
                           + (date.getMonth() + 1) + '-'
                           + date.getDate() + ' '
                           + date.getHours() + ':'
                           + date.getMinutes()
                           +  '）<br/>'
                           + params.value[1] + ', ' 
                           + params.value[2];
                },
                axisPointer:{
                    type : 'cross',
                    lineStyle: {
                        type : 'dashed',
                        width : 1
                    }
                }
            },
            symbolSize: function (value){
                	mysize = 15;
                return mysize;
            },
            data: [[new Date(2015,11,9),238 ,86]]
        },
    ]
};
  // 为echarts对象加载数据 
  //myChart2.setOption(option); 
     $(function() {
    $('a#touch').bind('click', function() {
      $.getJSON($SCRIPT_ROOT + '/_add_scatter', {
        a: $('#result1').val(),
        b: $('#result2').val(),
        now: new Date().getTime()
      }, function(data) {
          $('#result').text(data.length);
        if(data){
            for (var i =0;i<data.commerce.length;i++){
            option.series[0].data[i] = [new Date(data.commerce[i][0]),data.commerce[i][1],data.commerce[i][2]];
          }
        for (var i =0;i<data.industry.length;i++){
            option.series[1].data[i] = [new Date(data.industry[i][0]),data.industry[i][1],data.industry[i][2]];
          }
        for (var i =0;i<data.house.length;i++){
            option.series[2].data[i] = [new Date(data.house[i][0]),data.house[i][1],data.house[i][2]];
          }
        for (var i =0;i<data.others.length;i++){
            option.series[3].data[i] = [new Date(data.others[i][0]),data.others[i][1],data.others[i][2]];
          }
        
        myChart2.setOption(option);
              }
              
          
      });
      return false;
    });
});
}