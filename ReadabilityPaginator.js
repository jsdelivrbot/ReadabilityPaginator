/*
 * The MIT License (MIT)
 * Copyright (c) 2017-08-16 Steven Chandswang
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright notice,
 *       this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright notice,
 *       this list of conditions and the following disclaimer in the documentation
 *       and/or other materials provided with the distribution.
 *     * Neither the name of readability nor the names of its contributors
 *       may be used to endorse or promote products derived from this software
 *       without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @Author: Steven Chandswang
 * @Date:   2017-08-16
 * @Last Modified by:   Steve Chan
 * @Last Modified time: 2017-08-16
 */
console.clear();
var paginator = function() {
  jQuery(function($) {
    var winHeight;
    var winWidth;
    var pagerWidth;
    var pagerGap;
    var currentPage = 0;
    var lastPage = 0;

    function initPager() {
      currentPage = 0;
      winHeight = $(window).height();
      winWidth = $(window).width();
      pagerWidth = winWidth - 20;
      pagerGap = pagerWidth - 30;
      // pagerWidth = 730;
      // console.log(pagerWidth, pagerGap);
      pagerGap = 30;
      containerWidth = pagerWidth + 20;
      containerMarginLeft = -(containerWidth / 2);

      $('#pager_container').css({
        'margin-left': containerMarginLeft + 'px',
        'width': containerWidth + 'px'
      });

      $('#pages_5NPJADvYjZY').css({
        '-webkit-column-width': pagerWidth + 'px',
        '-moz-column-width': pagerWidth + 'px',
        '-webkit-column-gap': pagerGap + 'px',
        '-moz-column-gap': pagerGap + 'px'
      });
      setPagersWidth();
      // setTimeout(calculateLastPage, 1000);
    }

    function getLastChildren(start) {
      var nodes;
      if (start.lastElementChild != null && typeof start.childNodes !== "undefined") {
        var node = start.lastElementChild;
        if (node != null) {
          var lastNode = getLastChildren(node);
          start = lastNode;
        }
      }
      return start;
    }

    function calculateLastPage() {
      if (lastPage != 0) {
        return;
      }
      var lastElement = getLastChildren($('#pages_5NPJADvYjZY')[0].lastElementChild);
      var lastViewLeft = function(el) {
        //special bonus for those using jQuery
        if (el instanceof jQuery) {
          // console.log("el:", el);
          el = el[0];
          // console.log("el0:", el);
        }
        if (el.nodeName == '#text') {
          el = el.parentElement;
        }
        // console.log("el2:", el);
        var rect = el.getBoundingClientRect();
        // console.log(rect.right, rect.left, rect.top, rect.bottom);
        return rect.left;
      }(lastElement);
      lastPage = Math.ceil(lastViewLeft / (pagerWidth + pagerGap));
      if (lastPage == 1) {
        lastPage = 200;
      }
      // console.log("lastPage:", lastPage, "lastViewLeft:", lastViewLeft, "pageWidth+Gap:", (pagerWidth + pagerGap));
    }

    $(document).ready(function() {
      initPager();
    });

    function currentWidth() {
      return currentPage * (pagerWidth + pagerGap);
    }

    function nextPage() {
      calculateLastPage();
      if (currentPage + 1 >= lastPage) {
        return;
      }
      currentPage++;
      var pagesRight = setPagersWidth();
      // console.log('pagesRight:', pagesRight, ' currentPage:', currentPage);
    }

    function prevPage() {
      if (currentPage > 0) {
        currentPage--;
      } else {
        return;
      }
      setPagersWidth();
    }

    function setPagersWidth() {
      var width = currentWidth();
      $('#pages_5NPJADvYjZY').css({
        'right': width + 'px'
      });
      return width;
    }

    $('#pager_container').on('touchend click', function(e) {
      var winW = ($(window).width());
      var xPos = e.pageX;
      if (xPos === undefined) {
        if (e.originalEvent !== undefined && e.originalEvent.touches[0] !== undefined) {
          xPos = e.originalEvent.touches[0].pageX;
          e.stopPropagation();
          e.preventDefault();
        } else {
          return;
        }
      }

      if (xPos <= winW / 5) {
        prevPage();
      } else {
        nextPage();
      }
    });

    $(window).bind('keydown', function(e) {
      if (e.keyCode == 37)
        prevPage();
      else if (e.keyCode == 39)
        nextPage();
    });

    $(window).resize(function() {
      initPager();
      // setTimeout(initPager, 1000);
    });

    // setTimeout(initPager, 1000);
  });
};

window.injectScript = function(src) {
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.src = src;
  document.getElementsByTagName('head')[0].appendChild(script);
};

window.injectJQ = function() {
  // if (typeof jQuery == 'undefined') {
  // }
  // window.injectScript("https://code.jquery.com/jquery-2.1.0.min.js");
  window.injectScript("https://use.fontawesome.com/webfontloader/1.6.24/webfontloader.js");
  window.injectScript("https://use.fontawesome.com/bb7692e21a.js");
};

function initScript($) {
  var newScript = "(" + paginator.toString() + ")();";
  // var newScript = "var paginator = " + paginator.toString() + ";";
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.appendChild(document.createTextNode(newScript));
  // document.getElementsByTagName("head")[0].appendChild(script);
  // document.body.appendChild(script);
  $('body').append(script);
  // $('body').append('<script>jQuery(window).load(function(){paginator();});</script>');
  // $('body').append('<script>jQuery(window).on("load", function () {  alert("Window Loaded"); });</script>');
  // $('body').append('<script>document.addEventListener("touchstart", function(event) {  alert("Window Loaded");});</script>');
}

function initStyle() {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode('#pager_container{color:rgba(0,0,0,.87);background-color:#fff;transition:all 450ms cubic-bezier(.23,1,.32,1) 0s;box-sizing:border-box;box-shadow:rgba(0,0,0,.12) 0 1px 6px,rgba(0,0,0,.12) 0 1px 4px;border-radius:0;height:100%;overflow:hidden;position:absolute;padding:10px 10px 20px;left:50%;z-index:20}'));
  document.getElementsByTagName('head')[0].appendChild(style);
  jQuery(
    function($) {
      $('head').append('<link rel="stylesheet" href="https://use.fontawesome.com/releases/v4.6.3/css/font-awesome-css.min.css" media="all">');
      $('head').append('<link href="https://cdn.jsdelivr.net/gh/blisszard/readability@development/pager.css" rel="stylesheet">');
      $('head').append('<link href="https://gitcdn.link/repo/blisszard/readability/development/font_style.css" rel="stylesheet">');
    });
}

function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) { //IE
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else { //Others
    script.onload = function() {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

loadScript("https://cdn.jsdelivr.net/gh/blisszard/readability@development/Readability.min.js", function() {
  var loc = document.location;
  var uri = {
    spec: loc.href,
    host: loc.host,
    prePath: loc.protocol + "//" + loc.host,
    scheme: loc.protocol.substr(0, loc.protocol.indexOf(":")),
    pathBase: loc.protocol + "//" + loc.host + loc.pathname.substr(0, loc.pathname.lastIndexOf("/") + 1)
  };
  var article = new Readability(uri, document).parse();
  document.head.innerHTML = '<meta charset="utf-8"><meta name="viewport" content="width=device-width" />';
  injectJQ();
  loadScript("https://code.jquery.com/jquery-2.1.0.min.js", function() {
    jQuery(function($) {
      document.body.innerHTML = '<div id="readability_article" style="display:none;">' + article.content + '</div>';
      var content = $('#readability-page-1').html();
      document.body.innerHTML = '<div id="pager_container" style=""><div id="pages_5NPJADvYjZY" style="right: 0px; ">' + content + '</div></div>';
      $('.readability-styled').attr('style', '');
      initStyle();
      initScript($);
    });
  });
});