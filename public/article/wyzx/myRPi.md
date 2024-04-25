<h1 align="center">MyRPi</h1>

<p align="center">
<img src="https://lsky.bing16.xyz:2096/i/2024/02/05/65c0e12c3e73d.jpg" width="100" />
</p>

- author：QINBINGJIA

- time：2018.06

- 硬件：RPi3B+ 等

## 准备阶段

2018.06.13：

正等待发货

2018.06.16：

收到

![](https://lsky.bing16.xyz:2096/i/2024/02/05/65c0e142a511f.jpg "2018.06.16")

## 安装系统与SSH、VNC连接

2018.06.30\[2018.07.05修改\]：

1.  在[树莓派官网](https://www.raspberrypi.org/)下载Raspbian系统映像。  
    据b站up主的提醒及之前安装失败的经验，目前其他系统似乎不支持新出的Pi3B+。
    
2.  借助Win32DiskImager烧录至SD卡，注意烧录好后添加空白的SSH文件以便之后用电脑连接。  
    具体过程参考[“没有显示器情况下，安装和使用树莓派”](https://blog.csdn.net/github_38111866/article/details/76038665)
    
3.  网线连接树莓派和笔记本，将笔记本的网络共享给树莓派。之后在Windows的cmd命令窗口输入arp -a找到树莓派的IP地址。通过Xshell连接树莓派，用户名为pi，密码为raspberry。  
    具体过程参考[“树莓派无显示器情况下，如何利用pc控制”](https://jingyan.baidu.com/article/adc81513a267c7f723bf7384.html)
    
4.  修改软件源为国内软件源，文件地址为/etc/apt/sources.list。\[vi编辑器进入后输入i回车即可编辑内容，按Esc后退出内容编辑，而后输入:并回车进入命令行，输入wq回车即可保存并推出vi，若输入q!则不保存直接退出。  
    软件源地址参考网站自 [“树莓派学习笔记（3）：利用VNC远程控制树莓派”](https://www.cnblogs.com/xiaowuyi/p/4012069.html)  
    vi使用方法参考自[“linux Vi操作和使用方法详解”](https://blog.csdn.net/xie_xiansheng/article/details/78413306)\]  
    \[参考[“为树莓派更换国内镜像源”](https://blog.csdn.net/la9998372/article/details/77886806)\]
    
5.  安装vncserver,并开启Raspbian的VNC Server。  
    \[参考[“树莓派无显示器上手步骤”](https://blog.csdn.net/lingyou37/article/details/23671687/)及\][“使用VNC远程登陆树莓派”](https://blog.csdn.net/u012952807/article/details/70225700)
    
6.  完成连接。
    

![](https://lsky.bing16.xyz:2096/i/2024/02/05/65c0e15532f6d.png "首次连接vnc")

之后进行修改时区、分辨率及相关系统美化等操作，相关的参考网址：  

*   [修改时区](https://blog.csdn.net/pjlxm/article/details/79008905)
*   [修改vnc分辨率](https://blog.csdn.net/menghuanbeike/article/details/78065391)

2018.07.10：

系统汉化。

## CCD相关

2018.06.30：

摄像头测试，样图大小2.4M，效果尚可。  
摄像头设置参考[“树莓派3 B+ 的摄像头简单使用（video-streamer）”](http://www.mamicode.com/info-detail-2018954.html)

![](https://lsky.bing16.xyz:2096/i/2024/02/05/65c0e16562da6.png "CCD测试")

[motion视频设置](https://blog.csdn.net/u013151320/article/details/50195981)  
[解决视频灰屏问题](http://bbs.elecfans.com/jishu_1099559_1_1.html)  
视频存在较大延迟；除笔记本网线直连的情况下，存在外网可访问的安全性问题。  
杀死进程：sudo killall -TERM motion  
启动视频程序：sudo service motion start       sudo motion

2018.07.14：

增加相应的开关python程序。

## 利用Python3使树莓派自动发送邮件

2018.07.13：

相关代码为

``` python
#! /usr/bin/env python
# -*- coding: UTF-8 -*-
import smtplib
from email.mime.text import MIMEText
mailto_list=['12345678@qq.com']           #收件人(列表)
mail_host="smtp.126.com"            #使用的邮箱的smtp服务器地址，这里是163的smtp地址
mail_user="xxx"                           #用户名
mail_pass="xxx"                             #密码
mail_postfix="126.com"                     #邮箱的后缀，网易就是163.com
def send_mail(to_list,sub,content):
    me="hello"+"<"+mail_user+"@"+mail_postfix+">"
    msg = MIMEText(content,_subtype='plain')
    msg['Subject'] = sub
    msg['From'] = me
    msg['To'] = ";".join(to_list)                #将收件人列表以‘；’分隔
    try:
        server = smtplib.SMTP()
        server.connect(mail_host)                            #连接服务器
        server.login(mail_user,mail_pass)               #登录操作
        server.sendmail(me, to_list, msg.as_string())
        server.close()
        return True
    except Exception as e:
        print(e)
        return False
for i in range(1):                             #发送1封，上面的列表是几个人，这个就填几
    if send_mail(mailto_list,"电话","电话是XXX"):  #邮件主题和邮件内容
        #这是最好写点中文，如果随便写，可能会被网易当做垃圾邮件退信
        print ("done!")
    else:
        print ("failed!")
```

## 修改以上代码后借助Python3自动发送ip地址

2018.07.13：

Python代码为（ip地址未切片版）

``` python
#!\usr\bin\env python
#-*-coding: utf-8-*-
import socket
import time
import smtplib
import urllib
import urllib.request
from email.mime.text import MIMEText

#发送邮件的基本函数，参数依次如下
# smtp服务器地址、邮箱用户名，邮箱秘密，发件人地址，收件地址（列表的方式），邮件主题，邮件html内容
def sendEmail(mail_host,mail_user,mail_pass,sender,mailto_list,subject,msghtml):
    me="MRPi"+"<"+sender+">"
    msg = MIMEText(msghtml,_subtype='plain')
    msg['Subject'] = subject
    msg['From'] = me
    msg['To'] = ";".join(mailto_list)                #将收件人列表以‘；’分隔
    try:
        server = smtplib.SMTP()
        server.connect(mail_host)                            #连接服务器
        server.login(mail_user,mail_pass)               #登录操作
        server.sendmail(me, mailto_list, msg.as_string())
        server.close()
        print (True)
    except Exception as e:
        print(e)
        print (False)

#检查网络连通性
def check_network():
    while True:
        try:
            page=urllib.request.urlopen('http://baidu.com')
            html=page.read()
            print (html)
            print ("Network is Ready!")
            break
        except Exception as e:
            print(e)
            print ("Network is not ready,Sleep 5s...")
            time.sleep(5)
    return True

if  __name__ == '__main__' :
    check_network()
    message = os.popen('ifconfig -a').readlines()
	print(message)
    sendEmail("smtp.126.com",'xxx','xxx','xxx@126.com',['12345678@qq.com'],'IP Address of Raspberry PI',str(message))
```

设置开机自启脚本：

``` shell
sudo vim /etc/rc.local
# 添加: python3 /home/pi/code/send_ip.py
```

2018.07.14：

利用正则表达式提取ip地址（使用方法参考廖雪峰的教程/这么多表达式刚学的我记不得啊： [廖雪峰的Python教程-正则表达式](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/00143193331387014ccd1040c814dee8b2164bb4f064cff000)）； 测试ipv6下发送gmail失败（后来发现是自启动代码出错的问题，且惊奇地发现ipv6下shell和vnc可用，但似乎仅限于连接端也为ipv6/或局域网内）；增加备用发送邮件。代码如下

``` python
#!\usr\bin\env python
#-*-coding: utf-8-*-
import os
import re
import smtplib
import urllib
import urllib.request
from email.mime.text import MIMEText

#发送邮件的基本函数，参数依次如下
# smtp服务器地址、邮箱用户名，邮箱秘密，发件人地址，收件地址（列表的方式），邮件主题，邮件html内容
def sendEmail(mail_host,mail_user,mail_pass,sender,mailto_list,subject,msghtml):
    me="MRPi"+"<"+sender+">"
    msg = MIMEText(msghtml,_subtype='plain')
    msg['Subject'] = subject
    msg['From'] = me
    msg['To'] = ";".join(mailto_list)                #将收件人列表以‘；’分隔
    try:
        server = smtplib.SMTP()
        server.connect(mail_host)                            #连接服务器
        server.starttls()                                  #gmail need!
        server.login(mail_user,mail_pass)               #登录操作
        server.sendmail(me, mailto_list, msg.as_string())
        server.close()
        return (True)
    except Exception as e:
        print(e)
        return (False)

#检查网络连通性
def check_network():
    while True:
        try:
            page=urllib.request.urlopen('http://baidu.com')
            html=page.read()
            print ("Network is Ready!")
            break
        except Exception as e:
            print(e)
            print ("Network is not ready,Sleep 5s...")
            #try:
            #    page2=urllib.request.urlopen('https://www.google.com.hk')
            #    html2=urllib
            #    print ("Networkipv6 is Ready!")
            #    break
            #except Exception as e2:
            #    print(e2)
            #    print ("Networkipv6 is not ready")
            time.sleep(5)
    return True

def get_ip_address():
    message = os.popen('ifconfig -a').readlines()
    #print(message)
    ipaddr = re.findall(r'[i][n][e][t].\d+\.\d+\.\d+\.\d+',str(message))
    return ipaddr

if  __name__ == '__main__' :
    check_network()
    ipaddr = get_ip_address()
    print(ipaddr)
    while True:
        if(sendEmail("smtp.126.com",'xxx','xxx','xxx@126.com',['12345678@qq.com'],'IP Address of Raspberry PI',str(ipaddr))):
            print('mail1')
            break
        else:
            if(sendEmail("smtp.gmail.com",'xxx','xxx','xxx@gmail.com',['12345678@qq.com'],'IP Address of Raspberry PI',str(ipaddr))):
                print('mail2')
                break
        time.sleep(5)
```

再次测试后存在开机无法自动运行的情况，参考[“树莓派开机启动python脚本的另一种方法【转】”](https://blog.csdn.net/chenyefei/article/details/78076076)的方案二重新设置即可。

如前文所述，再次测试后发现ipv6校园网下确实能够通过python3来发送gmail邮件。但是由于未登录ipv4端，测试网络以及尝试使用126邮件发送邮件时存在程序卡在某一步的情况。

增加超时限制语句，测试发现其不影响time.sleep()的使用：

``` python
#!\usr\bin\env python
#-*-coding: utf-8-*-
import os
import re
import socket
import smtplib
import urllib
import urllib.request
from email.mime.text import MIMEText

#发送邮件的基本函数，参数依次如下
# smtp服务器地址、邮箱用户名，邮箱秘密，发件人地址，收件地址（列表的方式），邮件主题，邮件html内容
def sendEmail(mail_host,mail_user,mail_pass,sender,mailto_list,subject,msghtml):
    me="MRPi"+"<"+sender+">"
    msg = MIMEText(msghtml,_subtype='plain')
    msg['Subject'] = subject
    msg['From'] = me
    msg['To'] = ";".join(mailto_list)                #将收件人列表以‘；’分隔
    try:
        server = smtplib.SMTP()
        server.connect(mail_host)                            #连接服务器
        server.starttls()                                  #gmail need!
        server.login(mail_user,mail_pass)               #登录操作
        server.sendmail(me, mailto_list, msg.as_string())
        server.close()
        return (True)
    except Exception as e:
        print(e)
        return (False)

#检查网络连通性
def check_network():
    while True:
        try:
            page=urllib.request.urlopen('http://baidu.com')
            html=page.read()
            print ("Network is Ready!")
            break
        except Exception as e:
            print(e)
            print ("Network is not ready,Sleep 5s...")
            try:
                page2=urllib.request.urlopen('https://www.google.com.hk')
                html2=urllib
                print ("Networkipv6 is Ready!")
                break
            except Exception as e2:
                print(e2)
                print ("Networkipv6 is not ready")
            time.sleep(5)
    return True

def get_ip_address():
    message = os.popen('ifconfig -a').readlines()
    #print(message)
    ipaddr = re.findall(r'[i][n][e][t].\d+\.\d+\.\d+\.\d+',str(message))
    return ipaddr

if  __name__ == '__main__' :
	socket.setdefaulttimeout(6)      #超时限制
    check_network()
    ipaddr = get_ip_address()
    print(ipaddr)
    while True:
        if(sendEmail("smtp.126.com",'xxx','xxx','xxx@126.com',['12345678@qq.com'],'IP Address of Raspberry PI',str(ipaddr))):
            print('mail1')
            break
        else:
            if(sendEmail("smtp.gmail.com",'xxx','xxx','xxx@gmail.com',['12345678@qq.com'],'IP Address of Raspberry PI',str(ipaddr))):
                print('mail2')
                break
        time.sleep(5)
```

## 人脸识别

2018.07.15：

python3的cv2好像用不了？不幸的，MRPi好像因为进水短路出现了问题，正在返修中。

2018.08.04：

树梅派不在的日子里有点想它，在这段时间里用ubuntu系统笔记本暂时代替。人脸识别方面ubuntu的cv2的安装方法如下：

``` bash
pip install opencv-python
pip install opencv-contrib-python
```

测试程序为LIUHENG学长提供的一个人脸检测包，由于没溯源，在此便不放代码。测试在树梅派上使用的程序 （[“使用树莓派进行简易人脸识别”](http://shumeipai.nxez.com/2017/03/16/raspberry-pi-face-recognition-system.html)） 时发现由于硬件及系统不同摄像头方面的调用存在问题。

人脸识别方面参考[“利用Python、openCV打造自己的人脸识别AI系统”](https://blog.csdn.net/weixin_37554177/article/details/72884682)

## 软路由 & NAS

时隔多日，直到2022年中旬，该树莓派才沦为软路由，并兼具了NAS的功能。（后面重新购入一个4B作为软路由 & NAS）

相关的配置可以参考[树莓派4B刷OpenWrt做路由器的经验+踩坑](https://zhuanlan.zhihu.com/p/451788328)。我采用的是直接刷编译好的系统的策略，省去了各种配置的繁琐过程，期间踩了各种坑，直到看到这篇知乎文章。基本上踩过的坑这篇都提到了，而且提到的基本都踩了几遍，所以现如今应该可以直接参考。

我当前具体使用到的功能主要包括：软路由爬tizi、KMS、SMB、定时任务跑脚本、游戏加速、下载器。

具体使用起来，作为NAS，连接网线的时候速度还好，但wifi接入时，拷贝大量数据的场景下就挺吃力了，尤其当作mac时间机器初次拷贝就要很久（相关配置参考：[时间机器还可以和smb共享文件夹配合做局域网内备份&苹果备份&nas苹果备份](https://www.bilibili.com/read/cv17340577/)、[Mac时间机器备份加速教程，Time Machine 备份太慢的解决方法](https://www.bilibili.com/read/cv14824020)）。

未来可能想要做的功能有：接入homekit进行智能控制（可能需要红外硬件）、基于docker的尝试（毕竟tf卡还有很大一块空间）……

## openwrt安装和基本配置

2024.02.07补充

* 下载镜像包

https://github.com/SuLingGG/OpenWrt-Rpi

https://openwrt.cc/releases/targets/bcm27xx/bcm2711/

immortalwrt-bcm27xx-bcm2711-rpi-4-ext4-factory.img.gz

* 烧录

* 插入sd卡

* 连接wifi

* 登录

* 修改登录密码

* 修改wifi密码

* 配置网络端口

wan - DHCP客户端

Lan - 静态地址，开启动态DHCP

* 修改ssh端口号

``` bash
rm -rf /Users/xxx/.ssh/known_host # 删除mac上的ssh记录
```

``` bash
ssh -p xxx root@192.168.19.1
```

* 挂载磁盘

rm -f /sbin/mount.ntfs
opkg install ntfs-3g
mkdir /mnt/usb2
ntfs-3g /dev/sda2 /mnt/usb2 -o rw,lazytime,noatime,big_writes
mkdir /mnt/usb
ntfs-3g /dev/sdb2 /mnt/usb -o rw,lazytime,noatime,big_writes

* 配置启动项

``` bash
sleep 1

ntfs-3g /dev/sda2 /mnt/usb2 -o rw,lazytime,noatime,big_writes
ntfs-3g /dev/sdb2 /mnt/usb -o rw,lazytime,noatime,big_writes

docker kill lsky-pro
docker start lsky-pro

docker kill nginx-proxy
docker start nginx-proxy

exit 0
```

* 扩容

``` bash
fdisk -l

fdisk /dev/mmcblk0

mkfs.ext4 /dev/mmcblk0p3
```

挂载点

添加

启用

根

``` bash
mkdir -p /tmp/introot
mkdir -p /tmp/extroot
mount --bind / /tmp/introot
mount /dev/mmcblk0p3 /tmp/extroot
tar -C /tmp/introot -cvf - . | tar -C /tmp/extroot -xf -
umount /tmp/introot
umount /tmp/extroot

reboot
```

* 订阅飞机场节点

* Wan6 配置

https://github.com/SuLingGG/OpenWrt-Rpi/wiki/IPV6配置

https://openwrt.cc/scripts/

ipv6-helper.sh

* lan

ipv6分配长度：64

使用内置IPV6管理

路由通告服务：服务器

DHCPv6服务：服务器

NDP代理：混合

DHCPv6模式：无状态+有状态

* WAN6

指定请求长度的ipv6前缀：64

使用内置IPV6管理

* /etc/config/dhcp

```
config dhcp 'lan'                                              
        option interface 'lan'                                 
        option start '100'                                     
        option limit '150'                                     
        option leasetime '12h'                                 
        option ra_slaac '1'                                    
        list ra_flags 'managed-config'                         
        list ra_flags 'other-config'                           
        option ra 'server'            
        option dhcpv6 'server'        
        option ndp 'hybrid'           
        option ra_management '1'
```

```
config dhcp 'wan'                                              
        option interface 'wan'                                 
        option ignore '1'                                      
        option dhcpv6 'relay'                                  
        option ra 'relay'                                      
        option ndp 'relay'                                     
        option master '1' 
```

```
config dhcp 'wan6'                                   
        option interface 'wan6'                      
        option ignore '1'                            
        option master '1'                            
        option ra 'relay'                            
        list ra_flags 'none'                         
        option dhcpv6 'relay'                        
        option ndp 'relay' 
```

* ddns

* https证书

``` bash
cd ~ && mkdir dynv6
```

* smba配置

```
	#invalid users = root
```

```
smbpasswd -a root
```

## transmission配置

## nginx docker

``` bash
docker run --name nginx -p xxx:443 -d nginx

docker run --name nginx-proxy -p xxx:443 -d nginx

docker exec  -it nginx-proxy /bin/bash

vi /etc/nginx/nginx.conf
```

```
    server {
        listen 443 ssl;
        server_name xxxxx.net;
        ssl_certificate /dynv6/fullchain.crt;
        ssl_certificate_key /dynv6/private.pem;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        client_max_body_size 1024m;

        location / {
	    proxy_pass http://192.168.19.1:xxx;
            proxy_set_header X-Forwarded-Host $http_host;
        }
    }
```

``` bash
nginx -s reload
```

配置重启策略

## lsky docker

``` bash
docker run -d --name lsky-pro --restart unless-stopped -p xxx:8089 -v $PWD/lsky:/var/www/html -v /xxxxx:/var/www/html/storage/app/uploads -e WEB_PORT=8089 halcyonazure/lsky-pro-docker:latest

docker start lsky-pro
```

lsky-pro/app/Providers/AppServiceProvider.php 32行添加：

``` php
\Illuminate\Support\Facades\URL::forceScheme('https');
```

.env 文件：

```
ASSET_URL=https://你的域名
```

nginx转发添加：
```
proxy_set_header X-Forwarded-Host $http_host
```

配置重启策略

## 网络检查

```shell
echo "[$(date +%Y-%m-%d\ %H:%M:%S)] network daemon start"

if /bin/ping -c 1 baidu.com >/dev/null
then
    echo "[$(date +%Y-%m-%d\ %H:%M:%S)] ipv4 pass."
else
    echo "[$(date +%Y-%m-%d\ %H:%M:%S)] ipv4 error, reconnect..."
    ifdown wan
    ifup wan
    echo "[$(date +%Y-%m-%d\ %H:%M:%S)] ipv4 reconnect finished."
fi

if ifconfig | grep "inet6 addr:" | grep "Scope:Global" | grep -q "::"
then
    echo "[$(date +%Y-%m-%d\ %H:%M:%S)] ipv6 pass."      
else      
    echo "[$(date +%Y-%m-%d\ %H:%M:%S)] ipv6 error, reconnect..."
    ifdown wan6
    ifup wan6
    echo "[$(date +%Y-%m-%d\ %H:%M:%S)] ipv6 reconnect finished."
fi

if cat /proc/net/arp | grep "24:e8:e5:c9:0e:ca" | grep -q "0x2"
then
    echo "[$(date +%Y-%m-%d\ %H:%M:%S)] lan pass."
else
    echo "[$(date +%Y-%m-%d\ %H:%M:%S)] lan error, reconnect..."
    ifdown lan
    ifup lan
    echo "[$(date +%Y-%m-%d\ %H:%M:%S)] lan reconnect finished."
fi

echo ""
```

```
*/5 * * * *  sh /root/Code/network_daemon.sh >> /root/log
```

配置重启策略