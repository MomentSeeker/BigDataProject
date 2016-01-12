var map = new BMap.Map("container");
map.centerAndZoom("南京", 12);
map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用  
map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor:     BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开 
var localSearch = new BMap.LocalSearch(map);
localSearch.enableAutoViewport(); //允许自动调节窗体大小
var ctrlSca = new window.BMap.ScaleControl({  
                        anchor: BMAP_ANCHOR_BOTTOM_LEFT  
                    });  
map.addControl(ctrlSca);  //向地图中添加比例尺控件

//查询一个地址标注到地图上，并获取这个地址的经纬度
function searchByStationName() {
    map.clearOverlays();//清空原来的标注
    var keyword = document.getElementById("text1").value;
　　 localSearch.setSearchCompleteCallback(function (searchResult) {
       var poi = searchResult.getPoi(0);
       pointA = new BMap.Point(poi.point.lng,poi.point.lat); 
　　　　document.getElementById("result1").value = pointA.lng ;
       document.getElementById("result2").value = pointA.lat ;//获取经度和纬度，将结果显示在文本框中
　　　　map.centerAndZoom(poi.point, 13); 
       var marker = new BMap.Marker(pointA);  // 创建标注，为要查询的地址对应的经纬度
       map.addOverlay(marker);
       var content = document.getElementById("text1").value + "<br/><br/>经度：" + pointA.lng + "<br/>纬度：" + pointA.lat; 
      var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>"); 
      marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); }); 
      marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画     
　　});
　　localSearch.search(keyword);
}

function searchByStationName2() {
    map.clearOverlays();//清空原来的标注
    map.addControl(ctrlSca);  //向地图中添加比例尺控件 
    var keyword = document.getElementById("text2").value;
　　 localSearch.setSearchCompleteCallback(function (searchResult) {
       var poi = searchResult.getPoi(0);
　　　　document.getElementById("result3").value = poi.point.lng + "," + poi.point.lat; //获取经度和纬度，将结果显示在文本框中
　　　　map.centerAndZoom(poi.point, 13); 
       pointB = new BMap.Point(poi.point.lng,poi.point.lat); 
       var marker = new BMap.Marker(pointB);  // 创建标注，为要查询的地址对应的经纬度
       map.addOverlay(marker);
       var content = document.getElementById("text2").value + "<br/><br/>经度：" + pointB.lng + "<br/>纬度：" + pointB.lat; 
       var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>"); 
       marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); }); 
       marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画 
　　});
　　localSearch.search(keyword);
}
 
var target = document.getElementById("button");
target.addEventListener("click", function () { 
        alert('距离是：'+(map.getDistance(pointA,pointB)).toFixed(2)+' 米。'); 
        var polyline = new BMap.Polyline([pointA,pointB], {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5});  //定义折线
	    map.addOverlay(polyline);  //添加折线到地图上
    }); 

//获取轮廓线
function getBoundary(){       		
    var bdary = new BMap.Boundary();		
    var name = document.getElementById("districtName").value;		
    bdary.get(name, function(rs){       //获取行政区域		
        map.clearOverlays();        //清除地图覆盖物       		
        var count = rs.boundaries.length; //行政区域的点有多少个		
        for(var i = 0; i < count; i++){			
            var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物			
            map.addOverlay(ply);  //添加覆盖物			
            map.setViewport(ply.getPath());    //调整视野                                
                                  }  
                                     });   	
}
