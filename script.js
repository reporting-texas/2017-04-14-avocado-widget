/*! pym.js - v1.2.0 - 2017-03-08 */
!function(a){"function"==typeof define&&define.amd?define(a):"undefined"!=typeof module&&module.exports?module.exports=a():window.pym=a.call(this)}(function(){var a="xPYMx",b={},c=function(a){var b=document.createEvent("Event");b.initEvent("pym:"+a,!0,!0),document.dispatchEvent(b)},d=function(a){var b=new RegExp("[\\?&]"+a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]")+"=([^&#]*)"),c=b.exec(location.search);return null===c?"":decodeURIComponent(c[1].replace(/\+/g," "))},e=function(a,b){if("*"===b.xdomain||a.origin.match(new RegExp(b.xdomain+"$")))return!0},f=function(b,c,d){var e=["pym",b,c,d];return e.join(a)},g=function(b){var c=["pym",b,"(\\S+)","(.*)"];return new RegExp("^"+c.join(a)+"$")},h=function(){for(var a=b.autoInitInstances.length,c=a-1;c>=0;c--){var d=b.autoInitInstances[c];d.el.getElementsByTagName("iframe").length&&d.el.getElementsByTagName("iframe")[0].contentWindow||b.autoInitInstances.splice(c,1)}};return b.autoInitInstances=[],b.autoInit=function(a){var d=document.querySelectorAll("[data-pym-src]:not([data-pym-auto-initialized])"),e=d.length;h();for(var f=0;f<e;++f){var g=d[f];g.setAttribute("data-pym-auto-initialized",""),""===g.id&&(g.id="pym-"+f);var i=g.getAttribute("data-pym-src"),j={xdomain:"string",title:"string",name:"string",id:"string",sandbox:"string",allowfullscreen:"boolean",parenturlparam:"string",parenturlvalue:"string",optionalparams:"boolean"},k={};for(var l in j)if(null!==g.getAttribute("data-pym-"+l))switch(j[l]){case"boolean":k[l]=!("false"===g.getAttribute("data-pym-"+l));break;case"string":k[l]=g.getAttribute("data-pym-"+l);break;default:console.err("unrecognized attribute type")}var m=new b.Parent(g.id,i,k);b.autoInitInstances.push(m)}return a||c("pym-initialized"),b.autoInitInstances},b.Parent=function(a,b,c){this.id=a,this.url=b,this.el=document.getElementById(a),this.iframe=null,this.settings={xdomain:"*",optionalparams:!0,parenturlparam:"parentUrl",parenturlvalue:window.location.href},this.messageRegex=g(this.id),this.messageHandlers={},c=c||{},this._constructIframe=function(){var a=this.el.offsetWidth.toString();this.iframe=document.createElement("iframe");var b="",c=this.url.indexOf("#");for(c>-1&&(b=this.url.substring(c,this.url.length),this.url=this.url.substring(0,c)),this.url.indexOf("?")<0?this.url+="?":this.url+="&",this.iframe.src=this.url+"initialWidth="+a+"&childId="+this.id,this.settings.optionalparams&&(this.iframe.src+="&parentTitle="+encodeURIComponent(document.title),this.iframe.src+="&"+this.settings.parenturlparam+"="+encodeURIComponent(this.settings.parenturlvalue)),this.iframe.src+=b,this.iframe.setAttribute("width","100%"),this.iframe.setAttribute("scrolling","no"),this.iframe.setAttribute("marginheight","0"),this.iframe.setAttribute("frameborder","0"),this.settings.title&&this.iframe.setAttribute("title",this.settings.title),void 0!==this.settings.allowfullscreen&&this.settings.allowfullscreen!==!1&&this.iframe.setAttribute("allowfullscreen",""),void 0!==this.settings.sandbox&&"string"==typeof this.settings.sandbox&&this.iframe.setAttribute("sandbox",this.settings.sandbox),this.settings.id&&(document.getElementById(this.settings.id)||this.iframe.setAttribute("id",this.settings.id)),this.settings.name&&this.iframe.setAttribute("name",this.settings.name);this.el.firstChild;)this.el.removeChild(this.el.firstChild);this.el.appendChild(this.iframe),window.addEventListener("resize",this._onResize)},this._onResize=function(){this.sendWidth()}.bind(this),this._fire=function(a,b){if(a in this.messageHandlers)for(var c=0;c<this.messageHandlers[a].length;c++)this.messageHandlers[a][c].call(this,b)},this.remove=function(){window.removeEventListener("message",this._processMessage),window.removeEventListener("resize",this._onResize),this.el.removeChild(this.iframe),h()},this._processMessage=function(a){if(e(a,this.settings)&&"string"==typeof a.data){var b=a.data.match(this.messageRegex);if(!b||3!==b.length)return!1;var c=b[1],d=b[2];this._fire(c,d)}}.bind(this),this._onHeightMessage=function(a){var b=parseInt(a);this.iframe.setAttribute("height",b+"px")},this._onNavigateToMessage=function(a){document.location.href=a},this._onScrollToChildPosMessage=function(a){var b=document.getElementById(this.id).getBoundingClientRect().top+window.pageYOffset,c=b+parseInt(a);window.scrollTo(0,c)},this.onMessage=function(a,b){a in this.messageHandlers||(this.messageHandlers[a]=[]),this.messageHandlers[a].push(b)},this.sendMessage=function(a,b){this.el.getElementsByTagName("iframe").length&&(this.el.getElementsByTagName("iframe")[0].contentWindow?this.el.getElementsByTagName("iframe")[0].contentWindow.postMessage(f(this.id,a,b),"*"):this.remove())},this.sendWidth=function(){var a=this.el.offsetWidth.toString();this.sendMessage("width",a)};for(var d in c)this.settings[d]=c[d];return this.onMessage("height",this._onHeightMessage),this.onMessage("navigateTo",this._onNavigateToMessage),this.onMessage("scrollToChildPos",this._onScrollToChildPosMessage),window.addEventListener("message",this._processMessage,!1),this._constructIframe(),this},b.Child=function(b){this.parentWidth=null,this.id=null,this.parentTitle=null,this.parentUrl=null,this.settings={renderCallback:null,xdomain:"*",polling:0,parenturlparam:"parentUrl"},this.timerId=null,this.messageRegex=null,this.messageHandlers={},b=b||{},this.onMessage=function(a,b){a in this.messageHandlers||(this.messageHandlers[a]=[]),this.messageHandlers[a].push(b)},this._fire=function(a,b){if(a in this.messageHandlers)for(var c=0;c<this.messageHandlers[a].length;c++)this.messageHandlers[a][c].call(this,b)},this._processMessage=function(a){if(e(a,this.settings)&&"string"==typeof a.data){var b=a.data.match(this.messageRegex);if(b&&3===b.length){var c=b[1],d=b[2];this._fire(c,d)}}}.bind(this),this._onWidthMessage=function(a){var b=parseInt(a);b!==this.parentWidth&&(this.parentWidth=b,this.settings.renderCallback&&this.settings.renderCallback(b),this.sendHeight())},this.sendMessage=function(a,b){window.parent.postMessage(f(this.id,a,b),"*")},this.sendHeight=function(){var a=document.getElementsByTagName("body")[0].offsetHeight.toString();return this.sendMessage("height",a),a}.bind(this),this.scrollParentTo=function(a){this.sendMessage("navigateTo","#"+a)},this.navigateParentTo=function(a){this.sendMessage("navigateTo",a)},this.scrollParentToChildEl=function(a){var b=document.getElementById(a).getBoundingClientRect().top+window.pageYOffset;this.scrollParentToChildPos(b)},this.scrollParentToChildPos=function(a){this.sendMessage("scrollToChildPos",a.toString())};var g=function(a){var b,d=document.getElementsByTagName("html")[0],e=d.className;try{b=window.self!==window.top?"embedded":"not-embedded"}catch(a){b="embedded"}e.indexOf(b)<0&&(d.className=e?e+" "+b:b,a&&a(b),c("marked-embedded"))};this.remove=function(){window.removeEventListener("message",this._processMessage),this.timerId&&clearInterval(this.timerId)};for(var h in b)this.settings[h]=b[h];this.id=d("childId")||b.id,this.messageRegex=new RegExp("^pym"+a+this.id+a+"(\\S+)"+a+"(.*)$");var i=parseInt(d("initialWidth"));return this.parentUrl=d(this.settings.parenturlparam),this.parentTitle=d("parentTitle"),this.onMessage("width",this._onWidthMessage),window.addEventListener("message",this._processMessage,!1),this.settings.renderCallback&&this.settings.renderCallback(i),this.sendHeight(),this.settings.polling&&(this.timerId=window.setInterval(this.sendHeight,this.settings.polling)),g(b.onMarkedEmbeddedStatus),this},"undefined"!=typeof document&&b.autoInit(!0),b});

(function() {
  'use strict';

  var httpRequest;
  var el = document.getElementById('narrative-wrapper');
  var date = document.getElementById('date');
  var avocado = document.getElementsByClassName('avocado')[0];
  var narrative = document.getElementById('narrative');
  var player = document.getElementById('player');
  var pymChild = new pym.Child();

  function makeRequest(url) {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      return false;
    }

    httpRequest.onreadystatechange = startSpinning;
    httpRequest.open('GET', url);
    httpRequest.send();
  }

  function startSpinning() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);

        function getRandomReport() {
          var rand = Math.floor(Math.random() * (data.length - 1));
          return data[rand];
        }

        var new_report = getRandomReport();
        date.innerHTML = new_report.d;
        narrative.innerHTML = new_report.n;

        setInterval(function() {
          var new_report = getRandomReport();
          date.innerHTML = new_report.d;
          narrative.innerHTML = new_report.n;
          pymChild.sendHeight();
        }, 6000)

      } else {
        console.log('There was a problem with the request.');
      }
    }
  }

  window.onload = makeRequest('data.json');

  avocado.addEventListener('click', function() {
    player.play();
  });

})();
