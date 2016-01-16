//发送经纬度信息给后台，并接收后台数据到前端  
  $(function() {
    $('a#touch').bind('click', function() {
      $.getJSON($SCRIPT_ROOT + '/_add_all', {
        a: $('#result1').val(),
        b: $('#result2').val(),
        now: new Date().getTime()
      }, function(data) {
        //$('#result').text(data.length);
		var point = new Array(); //存放标注点经纬信息的数组  
        var marker = new Array(); //存放标注点对象的数组  
        var info = new Array(); //存放提示信息窗口对象的数组  
        for (var i = 0; i < data.length; i++) {  
            point[i] = new window.BMap.Point(data[i].X1,data[i].Y1); //循环生成新的地图点  
            marker[i] = new window.BMap.Marker(point[i]); //按照地图点坐标生成标记  
            map.addOverlay(marker[i]);  
            marker[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画  
            var label = new window.BMap.Label(data[i].id, { offset: new window.BMap.Size(20, -10) });  
            marker[i].setLabel(label);  
            info[i] = new window.BMap.InfoWindow("<p style=’font-size:12px;lineheight:1.8em;’>" + data[i].id + "</br>成交地块编号：" + data[i].land_id + "</br> 出让面积：" + data[i].size +"</br> 规划用途：" + data[i].purpose +"</br> 竞得单位：" + data[i].bid_company +"</br> 成交价格（万元）：" + data[i].deal_price +"</br> 成交时间：" + data[i].deal_time+"</br> 容积率：" + data[i].FAR +"</br> 绿化率：" + data[i].FR + "</br></p>"); // 创建信息窗口对象
		}
            //标注地块注释信息
			marker[0].addEventListener("mouseover", function () {
                this.openInfoWindow(info[0]);
            });
			marker[1].addEventListener("mouseover", function () {
                this.openInfoWindow(info[1]);
            });
			marker[2].addEventListener("mouseover", function () {
                this.openInfoWindow(info[2]);
            });
			marker[3].addEventListener("mouseover", function () {
                this.openInfoWindow(info[3]);
            });
			marker[4].addEventListener("mouseover", function () {
                this.openInfoWindow(info[4]);
            });
			marker[5].addEventListener("mouseover", function () {
                this.openInfoWindow(info[5]);
            });			
			marker[6].addEventListener("mouseover", function () {
                this.openInfoWindow(info[6]);
            });
			marker[7].addEventListener("mouseover", function () {
                this.openInfoWindow(info[7]);
            });
			marker[8].addEventListener("mouseover", function () {
                this.openInfoWindow(info[8]);
            });
			marker[9].addEventListener("mouseover", function () {
                this.openInfoWindow(info[9]);
            });
			marker[10].addEventListener("mouseover", function () {
                this.openInfoWindow(info[10]);
            });
			marker[11].addEventListener("mouseover", function () {
                this.openInfoWindow(info[11]);
            });
			marker[12].addEventListener("mouseover", function () {
                this.openInfoWindow(info[12]);
            });
			marker[13].addEventListener("mouseover", function () {
                this.openInfoWindow(info[13]);
            });
			marker[14].addEventListener("mouseover", function () {
                this.openInfoWindow(info[14]);
            });
			marker[15].addEventListener("mouseover", function () {
                this.openInfoWindow(info[15]);
            });			
			marker[16].addEventListener("mouseover", function () {
                this.openInfoWindow(info[16]);
            });
			marker[17].addEventListener("mouseover", function () {
                this.openInfoWindow(info[17]);
            });
			marker[18].addEventListener("mouseover", function () {
                this.openInfoWindow(info[18]);
            });
			marker[19].addEventListener("mouseover", function () {
                this.openInfoWindow(info[19]);
            });

	});
      return false;
    });
  });