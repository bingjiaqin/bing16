<h1 align="center">基于安卓+某app的自动位置记录脚本</h1>

- author：QINBINGJIA

- time：2019.03

- 代码：[https://github.com/bingjiaqin/Auto-Get-the-Position-of-BlueX](https://github.com/bingjiaqin/Auto-Get-the-Position-of-BlueX)

## README

总体思想：  
记录某app上距离固定三点的距离，通过求三个圆的交点求确定坐标

基本步骤：  
1.当前距离上次记录的时间达到阈值dT  
2.匹配对象  
3.确定该对象当前是否在线  
4.记录当前距离，判断与上次距离差是否达到阈值dX  
5.更换查找位置  
6.记录新的距离  
7.重复5、6一次  
8.附加：坐标计算得到实际位置、通过数据库匹配地点名称  

功能函数：  
1.区域划分  
2.匹配对象  
3.距离记录  
4.修改查询位置  
5.附加：计算实际位置

功能实现（基于截图、区域rgb色彩匹配、图像识别）：  
1.区域划分：  
字典存储各模块对应的x, y位置--objective  
各元素的位置--position  
2.匹配对象：  
if_objective()  
3.距离记录：  
get_dis()  
4.修改查询信息：  
save_msg()  
5.获取当前的ip并匹配实际经纬度：  
get_ip.py  
get_location.py  
6.发送信息：  
send_msg

地图库地址：[GeoLite2 Free Downloadable Databases](http://dev.maxmind.com/geoip/geoip2/geolite2)  
该部分程序参考自：[Python获取IP的地理位置：经纬度，国家，区域，城市](https://www.jianshu.com/p/eb756fc2d3b8)

## 具体代码

[见github仓库](https://github.com/bingjiaqin/Auto-Get-the-Position-of-BlueX)