<h1 align="center">Django学习</h1>

* author：QINBINGJIA

## 安装

2020.01.19：

主要参考网易云课堂。

首先搭建python虚拟环境。

``` bash
sudo pip3 install virtualenv
sudo pip3 install virtualenvwrapper
```

编辑配置文件~/.bashrc，在末尾添加：

``` bash
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
export WORK_HOME=$HOME/.virtualenvs
source /usr/local/bin/virtualenvwrapper.sh
```

创建虚拟包环境：

``` bash
mkvirtualenv -p python3 django # 最后一项为虚拟包环境名称
lsvirtualenv # 显示包环境
workon django # 切换
deactivate # 退出
rmvirtualenv django # 删除
cdvirtualenv # 跳转到虚拟环境目录
cdsitepackages # 虚拟环境包目录
```

然后安装pycharm工具，专业版已经包含django，相关的[绿化教程](https://www.cnblogs.com/longbigbeard/p/9134914.html)（这里的下载速度也更快）（哦，不提供授权码了，用学校邮箱申请吧。。。这邮件发太久。。。）。安装完成后创建桌面图标，安装完成。

安装django包：

``` bash
workon django
pip3 install django
```

## 创建项目

``` bash
workon django
django-admin startproject bing16
cd bing16
tree # 查看结构
python manage.py runserver # 开启服务
```

在pycharm中打开，进行配置。

中文配置：将/bing16/settings.py中的LANGUAGE_CODE = 'en-us'改为LANGUAGE_CODE = 'zh-hans'：

``` bash
# ~/bing16/bing16/settings.py
# LANGUAGE_CODE = 'en-us'
LANGUAGE_CODE = 'zh-hans'
```

## 网站搭建

~/bing16/bing16/下创建views.py

``` bash
# ~/bing16/bing16/views.py
from django.http import HttpResponse

def index(request):
    html = '<h1>Hello World!</h1>'
    return HttpResponse(html)
```

配置urls.py

``` bash
# ~/bing16/bing16/urls.py

from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.index)
]
```

## APP搭建

清除上一节的网站。

``` bash
python manage.py startapp news
```

在配置文件中添加：

``` bash
# ~/bing16/bing16/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'news',
]
```

``` bash
# ~/bing16/news/views.py
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("Hello world!")</xmp>
    <xmp># ~/bing16/news/urls.py
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('',views.index)
]
```

``` bash
# ~/bing16/bing16/urls.py
from django.contrib import admin
from django.urls import path,include
from news import urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(urls)),
]
```

## 创建模板

在# ~/bing16/news/下创建模板文件夹templates，在其中添加html文件

``` bash
# ~/bing16/news/views.py
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index.html')
```

``` bash
# ~/bing16/news/urls.py
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('',views.index)
]
```