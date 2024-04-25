<h1 align="center">A-LOAM安装测试</h1>

- author：QINBINGJIA

## 安装

2019.11.16：

在两次尝试未成功安装后，开始了第三次尝试，基于新安装的Ubuntu16.04。官方文档在[A-LOAM](https://github.com/HKUST-Aerial-Robotics/A-LOAM)，主要参考[LOAM的编译安装运行](https://blog.csdn.net/weixin_43211438/article/details/87818526)。

1. 安装ROS环境，具体可以参考之前的内容[ROS平台简易教程](ROSLearning.html)，选用[ROS Kinetic Kame](http://wiki.ros.org/kinetic/Installation/Ubuntu)。

``` bash
udo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654

sudo apt-get update
sudo apt-get install ros-kinetic-desktop-full

sudo rosdep init
rosdep update

echo "source /opt/ros/kinetic/setup.bash" >> ~/.bashrc
source ~/.bashrc

sudo apt install python-rosinstall python-rosinstall-generator python-wstool build-essential	

mkdir -p ~/catkin_ws/src
cd catkin_ws/src
catkin_init_workspace
cd ~/catkin_ws/
catkin_make
```

2. 安装Ceres，主要参考[Ceres安装文档](http://ceres-solver.org/installation.html)。

首先下载[Source Code](https://github.com/ceres-solver/ceres-solver)，下载压缩包似乎更快些，也可以直接git clone：

git clone https://github.com/ceres-solver/ceres-solver

期间可以同时进行下一步操作，安装依赖。

``` bash
# CMake，默认已装
sudo apt-get install cmake
# google-glog + gflags
sudo apt-get install libgoogle-glog-dev
# BLAS & LAPACK
sudo apt-get install libatlas-base-dev
# Eigen3，默认已装
sudo apt-get install libeigen3-dev
# SuiteSparse and CXSparse (optional)
# - If you want to build Ceres as a *static* library (the default)
#   you can use the SuiteSparse package in the main Ubuntu package
#   repository:
sudo apt-get install libsuitesparse-dev
# - However, if you want to build Ceres as a *shared* library, you must
#   add the following PPA
sudo add-apt-repository ppa:bzindovic/suitesparse-bugfix-1319687
sudo apt-get update
sudo apt-get install libsuitesparse-dev
```

下载好Source Code后，解压，安装。

``` bash
tar zxf ceres-solver-1.14.0.tar.gz
mkdir ceres-bin
cd ceres-bin
cmake ../ceres-solver-1.14.0
make -j3 # 可根据cpu线程调整数字，线程数：grep 'processor' /proc/cpuinfo | sort -u | wc -l

make test
# Optionally install Ceres, it can also be exported using CMake which
# allows Ceres to be used without requiring installation, see the documentation
# for the EXPORT_BUILD_DIR option for more information.
sudo make install
```

测试一下吧：

``` bash
bin/simple_bundle_adjuster ../ceres-solver-1.14.0/data/problem-16-22106-pre.txt
```

正常的样子如下（这一段成功的样例是官网上copy下来的...：

``` bash
iter      cost      cost_change  |gradient|   |step|    tr_ratio  tr_radius  ls_iter  iter_time  total_time
   0  4.185660e+06    0.00e+00    1.09e+08   0.00e+00   0.00e+00  1.00e+04       0    7.59e-02    3.37e-01
   1  1.062590e+05    4.08e+06    8.99e+06   5.36e+02   9.82e-01  3.00e+04       1    1.65e-01    5.03e-01
   2  4.992817e+04    5.63e+04    8.32e+06   3.19e+02   6.52e-01  3.09e+04       1    1.45e-01    6.48e-01
   3  1.899774e+04    3.09e+04    1.60e+06   1.24e+02   9.77e-01  9.26e+04       1    1.43e-01    7.92e-01
   4  1.808729e+04    9.10e+02    3.97e+05   6.39e+01   9.51e-01  2.78e+05       1    1.45e-01    9.36e-01
   5  1.803399e+04    5.33e+01    1.48e+04   1.23e+01   9.99e-01  8.33e+05       1    1.45e-01    1.08e+00
   6  1.803390e+04    9.02e-02    6.35e+01   8.00e-01   1.00e+00  2.50e+06       1    1.50e-01    1.23e+00

Ceres Solver v1.14.0 Solve Report
----------------------------------
                                     Original                  Reduced
Parameter blocks                        22122                    22122
Parameters                              66462                    66462
Residual blocks                         83718                    83718
Residual                               167436                   167436

Minimizer                        TRUST_REGION

Dense linear algebra library            EIGEN
Trust region strategy     LEVENBERG_MARQUARDT

                                        Given                     Used
Linear solver                     DENSE_SCHUR              DENSE_SCHUR
Threads                                     1                        1
Linear solver threads                       1                        1
Linear solver ordering              AUTOMATIC                22106, 16

Cost:
Initial                          4.185660e+06
Final                            1.803390e+04
Change                           4.167626e+06

Minimizer iterations                        6
Successful steps                            6
Unsuccessful steps                          0

Time (in seconds):
Preprocessor                            0.261

  Residual evaluation                   0.082
  Jacobian evaluation                   0.412
  Linear solver                         0.442
Minimizer                               1.051

Postprocessor                           0.002
Total                                   1.357

Termination:                      CONVERGENCE (Function tolerance reached. |cost_change|/cost: 1.769766e-09 <= 1.000000e-06)
```

3. 安装PCL。前一次失败好像就是因为这个的相关依赖没有装好..

下载PCL源码git clone https://github.com/PointCloudLibrary/pcl.git

编译安装PCL1.8，首先卸载pcl1.7

``` bash
sudo apt-get remove libpcl1.7
sudo apt-get remove libpcl-*
```

安装依赖项

``` bash
sudo apt-get update
sudo apt-get install git build-essential linux-libc-dev
sudo apt-get install cmake cmake-gui 
sudo apt-get install libusb-1.0-0-dev libusb-dev libudev-dev
sudo apt-get install mpi-default-dev openmpi-bin openmpi-common  
sudo apt-get install libflann1.8 libflann-dev
sudo apt-get install libeigen3-dev
sudo apt-get install libboost-all-dev
sudo apt-get install libvtk5.10-qt4 libvtk5.10 libvtk5-dev
sudo apt-get install libqhull* libgtest-dev
sudo apt-get install freeglut3-dev pkg-config
sudo apt-get install libxmu-dev libxi-dev 
sudo apt-get install mono-complete
sudo apt-get install qt-sdk openjdk-8-jdk openjdk-8-jre
```

PCL源码下载好后解压，编译，安装。

``` bash
cd pcl
mkdir release
cd release
cmake -DCMAKE_BUILD_TYPE=None -DCMAKE_INSTALL_PREFIX=/usr \
      -DBUILD_GPU=ON -DBUILD_apps=ON -DBUILD_examples=ON \
      -DCMAKE_INSTALL_PREFIX=/usr ..
make -j4
sudo make install
sudo apt-get install ros-kinetic-pcl-conversions ros-kinetic-pcl-ros
```

试着编译ALOAM项目，发现还是出现了如下错误：

``` bash
CMake Error at /opt/ros/kinetic/share/catkin/cmake/catkinConfig.cmake:83 (find_package):
  Could not find a package configuration file provided by "cv_bridge" with
  any of the following names:

    cv_bridgeConfig.cmake
    cv_bridge-config.cmake

  Add the installation prefix of "cv_bridge" to CMAKE_PREFIX_PATH or set
  "cv_bridge_DIR" to a directory containing one of the above files.  If
  "cv_bridge" provides a separate development package or SDK, be sure it has
  been installed.
Call Stack (most recent call first):
  aloam/src/A-LOAM-devel/CMakeLists.txt:8 (find_package)
```

解决方法：安装相应的包。

``` bash
sudo apt install ros-kinetic-cv-bridge
```

## 编译、运行

复制解压后的包到~/catkin_ws/src目录下

``` bash
cd ~/catkin_ws/
catkin_make

source ~/catkin_ws/devel/setup.bash # 链接到该目录下！

roslaunch aloam_velodyne aloam_velodyne_VLP_16.launch
rosbag play YOUR_DATASET_FOLDER/nsh_indoor_out_door.bag
```

完成安装及测试，理论情况如下图：

![](https://lsky.bing16.xyz:2096/i/2024/02/05/65c0e3919154b.png "初次成功曝光")

站内相关参考文章如下：

*   [激光SLAM](LiDARSLAM.html)
*   [ROS平台简易教程](ROSLearning.html)
*   A-LOAM安装测试
*   [LOAM学习](LOAMLearning.html)
*   [Livox-LOAM学习](LivoxLOAMLearning.html)

