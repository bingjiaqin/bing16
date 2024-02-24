<h1 align="center">激光SLAM</h1>

* author：QINBINGJIA

参考b站视频[激光SLAM](https://www.bilibili.com/video/av83815679?t=2225)及论文绪论部分的整理。

## 激光SLAM流程

2020.02.15：

SLAM要解决同时定位和建图的问题，SLAM的概念在1986年被R. C. Smith和P. Cheeseman提出。按照不同框架划分可以分为基于贝叶斯滤波器的方法、基于图优化的方法。

*   基于图优化的方法（Graph-based SLAM）：分为前端和后端两部分，前端进行构图构建节点间的空间约束关系；后端优化误差项。
*   基于滤波器的方法（Filter-based SLAM）：与基于图优化的方法相比，只估计当前的位置。例如GMapping算法。其流程包括状态预测（里程计预测）、测量预测、进行检测（真实测量）、数据关联、状态更新和地图更新。

## 2D激光SLAM

传感器主要采用IMU（计算角度）、Wheel Odometry（计算距离）、Lidar。地图类型包括覆盖栅格地图、点云地图。

帧间匹配算法包括：ICP（点对点）、PI-ICP（点对线）、NDT（高斯分布的方法求匹配）、CSM（Correlation Scan Match，相关的方法求匹配）。

回环检测方法分为：Scan-to-Scan、Scan-to-Map、Map-to-Map方法。其中激光SLAM的Scan-to-Scan用于匹配的特征较少。

## 3D激光SLAM

传感器主要采用IMU、里程计、Lidar。地图类型包括点云地图、机器人轨迹 or PosGraph。

帧间匹配算法包括：Point-to-Plant ICP、NDT（定位）、Feature-based Method（提取特征点描述来匹配，如LOAM包括Line Point和Plant Point，霸榜已久）。

具体算法：

*   LOAM：纯激光、匀速假设、无回环。
*   V-LOAM：视觉激光融合、漂移匀速假设、无回环。
*   VELO：视觉激光融合、无运动畸变假设、有回环。

数据预处理：激光雷达运动畸变去除、不同系统之间的时间同步。

与视觉信息的融合：3D Lidar提供深度信息，视觉辅助运动畸变去除、视觉辅助回环检测、视觉提供精确里程信息。

激光SLAM存在的问题：退化环境、地图的动态更新、全局定位、动态环境定位。

站内相关参考文章如下：

*   激光SLAM
*   [ROS平台简易教程](ROSLearning.html)
*   [A-LOAM安装测试](A-LOAMTest.html)
*   [LOAM学习](LOAMLearning.html)
*   [Livox-LOAM学习](LivoxLOAMLearning.html)
