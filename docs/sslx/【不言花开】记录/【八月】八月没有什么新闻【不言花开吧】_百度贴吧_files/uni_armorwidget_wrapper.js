var passport=passport||window.passport||{};passport._modulePool=passport._modulePool||{},passport._define=passport._define||function(t,e){passport._modulePool[t]=e&&e()},passport._getModule=passport._getModule||function(t){return passport._modulePool[t]},passport.pop=passport.pop||{},passport.pop.insertScript=passport.pop.insertScript||function(t,e){var s=document,o=s.createElement("SCRIPT");o.type="text/javascript",o.charset="UTF-8",o.readyState?o.onreadystatechange=function(){("loaded"==o.readyState||"complete"==o.readyState)&&(o.onreadystatechange=null,e&&e())}:o.onload=function(){e&&e()},o.src=t,s.getElementsByTagName("head")[0].appendChild(o)},passport.pop.initForceverify=passport.pop.initForceverify||function(t){var e,s={"http:":"http://passport.baidu.com","https:":"https://passport.baidu.com"},o=s[window.location.protocol.toLowerCase()],p={uni_forceverify:"/passApi/js/uni_forceverify_f4d2b83.js",lib_rsa:"/passApi/js/lib/rsa_6ce55c4.js",idcard_validate:"/passApi/js/lib/idcard_validate.min_6738f5b.js"},a="/passApi/css/uni_forceverify_1fc77c5.css",t=t||{},r=document,t=t||{},n=("_PassUni"+(new Date).getTime(),o+a);return t.cssUrlWrapper&&(n=cssUrlWrapper.join("uni_forceverify.css")),e={show:function(){return e.loadPass(),e},loadPass:function(){var t=r.createElement("link");t.rel="stylesheet",t.type="text/css",t.href=n,t.disabled=!1,t.setAttribute("data-for","result"),r.getElementsByTagName("head")[0].appendChild(t),e.passCallback(),delete e.loadPass},passCallback:function(){e.components.length>0?passport.pop.insertScript(e.components.shift(),e.passCallback):(new passport.pop.Forceverify(t,!0,e),delete e.passCallback,delete e.components)},components:[]},e.components.push(o+p.uni_forceverify),e.components.push(o+p.lib_rsa),e.components.push(o+p.idcard_validate),t.cache&&e.loadPass(),e},passport.pop=passport.pop||{},passport.pop.insertScript||(passport.pop.insertScript=function(t,e){var s=document.createElement("SCRIPT");s.type="text/javascript",s.charset="UTF-8",s.readyState?s.onreadystatechange=function(){("loaded"===s.readyState||"complete"===s.readyState)&&(s.onreadystatechange=null,e&&e())}:s.onload=function(){e&&e()},s.src=t,document.getElementsByTagName("head")[0].appendChild(s)}),passport.pop.ArmorWidget||(passport.pop.ArmorWidget=function(t,e){if(window.passport_pop_ArmorWidget_instance)return{show:function(){}};window.passport_pop_ArmorWidget_instance=!0;var s={"http:":"http://passport.baidu.com","https:":"https://passport.baidu.com"}[window.location.protocol.toLowerCase()],o={uni_wrapper:[s,"/passApi/js/uni_wrapper.js?cdnversion=44be96"].join(""),md5:[s,"/passApi/js/lib/md5.min_8c25c62.js"].join(""),uni_armorwidget:[s,"/passApi/js/uni/armorwidget_910b6bb.js"].join("")},p=null,e=e||{};p=e.cssDir?e.cssDir+"/uni_armorwidget.css?tt="+(new Date).getTime():[s,"/passApi/css/uni_armorwidget_af54863.css"].join("");var a={show:function(){a.loadStyle(),a.loadScript()},loadStyle:function(){var t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.href=p,t.disabled=!1,t.setAttribute("data-for","result"),document.getElementsByTagName("head")[0].appendChild(t),delete a.loadStyle},resouses:[o.uni_wrapper,o.md5,o.uni_armorwidget,"https://passport.baidu.com/static/passpc-base/js/ld.min.js"],loadScript:function(){a.resouses.length>0?passport.pop.insertScript(a.resouses.shift(),a.loadScript):(a.callImp(),delete a.loadScript,delete a.resouses)},callImp:function(){e.onAfterClose=function(){window.passport_pop_ArmorWidget_instance=!1},new passport.pop.ArmorWidgetImp(t,e,!0,this)}};return e.cache&&a.loadStyle(),a});