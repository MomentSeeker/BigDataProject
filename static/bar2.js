//bar
require.config({
    paths:{ 
      'echarts' : '../static/echarts',
      'echarts/chart/line' : '../static/chart/line',
      'echarts/chart/bar' : '../static/chart/bar'
    }
  });
require(
[
  'echarts',
  'echarts/chart/line',// 使用柱状图就加载bar模块，按需加载
  'echarts/chart/bar'
],
     DrawEChart
);
var myChart;
var colorList1;
var colorList2;
function DrawEChart(ec) {
  // 基于准备好的dom，初始化echarts图表
  myChart = ec.init(document.getElementById('bar2')); 
  
  var option = {
    title : {
        text: '土地成交价格柱状图',
        subtext: '横坐标按距离从远到近'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:[
            '起始价（元）','成交价（元）'           
        ]
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    grid: {y2:150},
    xAxis : [
        {
            type : 'category',
            name : '土地'+'\n'+'编号',
            axisLabel: {show:true,
                       formatter:function(val){
                            //return val.split(".").join("\n");
                           return val;
                       },
                        interval:0,
                        rotate:40
                        
        },
             
            data : ['NO.2015G26', 'NO.2015G27', 'NO.2015G29', 'NO.2015G34', 'NO.2015G35', 'NO.2015G41', 'NO.2015G42', 'NO.2015G45', 'NO.2015G50', 'NO.2015G53', 'NO.2015G55', 'NO.2015G56', 'NO.2015G57', 'NO.2015G58', 'NO.2015G60', 'No.宁2015GY27', 'No.宁2015GY28', 'NO.宁六（2012）GY025', 'NO.宁六（2012）GY028', 'NO.宁六（2014）GY021']
        },
        {
            type : 'category',
            axisTick: {show:false},
            axisLabel: {show:false},
            splitArea: {show:false},
            splitLine: {show:false},
            data : ['NO.2015G26', 'NO.2015G27', 'NO.2015G29', 'NO.2015G34', 'NO.2015G35', 'NO.2015G41', 'NO.2015G42', 'NO.2015G45', 'NO.2015G50', 'NO.2015G53', 'NO.2015G55', 'NO.2015G56', 'NO.2015G57', 'NO.2015G58', 'NO.2015G60', 'No.宁2015GY27', 'No.宁2015GY28', 'NO.宁六（2012）GY025', 'NO.宁六（2012）GY028', 'NO.宁六（2014）GY021']
        }
    ],
    yAxis : [
        {
            type : 'value',
            name : '每平方米均价（元）',
            axisLabel:{formatter:'{value} '}
        }
    ],
    series : [
        {
            name:'起始价（元）',
            type:'bar',
            itemStyle: {normal: {color:function(params) {
                        // build a color map as your need.
                        
                        return colorList1[params.dataIndex]
                    }, label:{show:false,textStyle:{color:'#E87C25'}}}},
            data:[22659.13, 9584.49, 27631.78, 34514.43, 12719.69, 14988.36, 6334.09, 3369.31, 13570.14, 12210.33, 14179.65, 21918.58, 28653.30, 6557.77, 4600.37, 600.12, 499.32, 207.12, 204.13, 287.73]
        },
        {
            name:'成交价（元）',
            type:'bar',
            xAxisIndex:1,
            itemStyle: {normal: {color:function(params) {
                        // build a color map as your need.
                        
                        return colorList2[params.dataIndex]
                    }, label:{show:false,textStyle:{color:'#E87C25'}}}},
            data:[32971.94, 9656.02, 40116.02, 50175.43, 18443.56, 21814.19, 6334.09, 3369.31, 19722.41, 17734.06, 20597.81, 31894.91, 41797.03, 8055.07, 6740.08, 600.13, 499.33, 207.12, 204.14, 287.73]

        },
        
    ]
};
  
    $(function() {
    $('a#touch').bind('click', function() {
      $.getJSON($SCRIPT_ROOT + '/_add_bar', {
        a: $('#result1').val(),
        b: $('#result2').val(),
        now: new Date().getTime()
      }, function(data) {
          $('#result').text(data.length);
        if(data){
        colorList1 =data[0].data; 
        colorList2 = data[1].data;

              }          
      });
      return false;
    });
});
    
  // 为echarts对象加载数据 
//myChart.setOption(option); 
     $(function() {
    $('a#touch').bind('click', function() {
      $.getJSON($SCRIPT_ROOT + '/_add_all', {
        a: $('#result1').val(),
        b: $('#result2').val(),
        now: new Date().getTime()
      }, function(data) {
          $('#result').text(data.length);
        if(data){
        option.xAxis[0].data = [data[0].land_name,data[1].land_name,data[2].land_name,data[3].land_name,data[4].land_name,data[5].land_name,data[6].land_name,data[7].land_name,data[8].land_name,data[9].land_name,data[10].land_name,data[11].land_name,data[12].land_name,data[13].land_name,data[14].land_name,data[15].land_name,data[16].land_name,data[17].land_name,data[18].land_name,data[19].land_name];
        option.xAxis[1].data = [data[0].land_name,data[1].land_name,data[2].land_name,data[3].land_name,data[4].land_name,data[5].land_name,data[6].land_name,data[7].land_name,data[8].land_name,data[9].land_name,data[10].land_name,data[11].land_name,data[12].land_name,data[13].land_name,data[14].land_name,data[15].land_name,data[16].land_name,data[17].land_name,data[18].land_name,data[19].land_name];
        option.series[0].data = [data[0].bid_price_average,data[1].bid_price_average,data[2].bid_price_average,data[3].bid_price_average,data[4].bid_price_average,data[5].bid_price_average,data[6].bid_price_average,data[7].bid_price_average,data[8].bid_price_average,data[9].bid_price_average,data[10].bid_price_average,data[11].bid_price_average,data[12].bid_price_average,data[13].bid_price_average,data[14].bid_price_average,data[15].bid_price_average,data[16].bid_price_average,data[17].bid_price_average,data[18].bid_price_average,data[19].bid_price_average];
        option.series[1].data = [data[0].deal_price_average,data[1].deal_price_average,data[2].deal_price_average,data[3].deal_price_average,data[4].deal_price_average,data[5].deal_price_average,data[6].deal_price_average,data[7].deal_price_average,data[8].deal_price_average,data[9].deal_price_average,data[10].deal_price_average,data[11].deal_price_average,data[12].deal_price_average,data[13].deal_price_average,data[14].deal_price_average,data[15].deal_price_average,data[16].deal_price_average,data[17].deal_price_average,data[18].deal_price_average,data[19].deal_price_average];
        //option.series[2].data = data.Amount;
        myChart.setOption(option);
    }             
          
      });
      return false;
    });
});
}
