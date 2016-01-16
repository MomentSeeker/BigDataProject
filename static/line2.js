//line
  // 路径配置
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
    DrawEChart3
);
var myChart3;
    function DrawEChart3(ec) {
  // 基于准备好的dom，初始化echarts图表
  myChart3 = ec.init(document.getElementById('line2')); 
  
  var option = {
    color: ['#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
            '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0',
            '#1e90ff','#ff6347','#7b68ee','#00fa9a','#ffd700',
            '#6699FF','#ff6666','#3cb371','#b8860b','#30e0e0'],
     
    title : {
        text: '土地用地类型分析图',
        
    },
    tooltip : {
        trigger: 'axis'
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    legend: {
        data:['起始价','成交价','数量']
    },
    xAxis : [
        {
            type : 'category',
            data : ['商住','工业','住宅','其他']
        },
	{
	    type : 'category',
	    axisLine: {show:false},
	    axisTick: {show:false},
            axisLabel: {show:false},
            splitArea: {show:false},
            splitLine: {show:false},
	    data : ['商住','工业','住宅','其他']
	}
    ],
    yAxis : [
        {
            type : 'value',
            name : '每平米均价（元）',
            axisLabel : {
                formatter: '{value} '
            }
        },
        {
            type : 'value',
            name : '土地数量',
            axisLabel : {
                formatter: '{value} '
            }
        }
    ],
    series : [

        {
            name:'起始价',
            type:'bar',
	    itemStyle: {normal: {color:'rgba(232,124,37,1)', label:{show:false,textStyle:{color:'#ffd700'},position: 'insideTop'}}},
            data:[]
        },
        {
            name:'成交价',
            type:'bar',
	        xAxisIndex:1,
	        itemStyle: {normal: {color:'rgba(232,124,37,0.5)', label:{show:false,textStyle:{color:'#E87C25'}}}},
            data:[]
        },
        {
            name:'数量',
            type:'line',
	        yAxisIndex:1,
            itemStyle: {normal: {color:'#7b68ee', label:{show:true}}},
	        data:[7, 5, 6, 2]
        }
    ]
};
        //myChart3.setOption(option); 

 $(function() {
    $('a#touch').bind('click', function() {
      $.getJSON($SCRIPT_ROOT + '/_add_line', {
        a: $('#result1').val(),
        b: $('#result2').val(),
        now: new Date().getTime()
      }, function(data) {
          $('#result').text(data.length);
        if(data){
        option.series[0].data =data[1].data; 
        option.series[1].data = data[5].data; 
        option.series[2].data = data[0].data;
        myChart3.setOption(option);
              }
              
          
      });
      return false;
    });
});
}
    
      /*$.ajax({
                type: "post",
                async: false, //同步执行
                url: "/Ajax/GetChartData.aspx?type=getData&count=12",
                dataType: "json", //返回数据形式为json
                success: function (result) {
                    if (result) {                        
                        //将返回的category和series对象赋值给options对象内的category和series
                        //因为xAxis是一个数组 这里需要是xAxis[i]的形式
                        options.xAxis[0].data = result.category;
                        options.series = result.series;
                        options.legend.data = result.legend;
                        myChart.hideLoading();
                        myChart.setOption(options);
                    }
                },
                error: function (errorMsg) {
                    alert("不好意思，大爷，图表请求数据失败啦!");
                }
            });*/