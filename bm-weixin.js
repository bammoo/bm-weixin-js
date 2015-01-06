var ns = ns || {};

var _shareCallback = function() {};

var _shareData = {
  "img_url": '',
  "link": window.location.href,
  "desc": '',
  "title": document.title
}

// share timeline 取消时返回了 ok
var parseRes = function(resp) {
  if(!resp || !resp.err_msg)
   return false;
  var re = resp.err_msg.split(':');
  if(!re.length)
    return;
  // 有时是 confirm 有时是 ok
  if(re[1] == 'confirm')
    re[1] = 'ok';
  return {
    'status': re[1],
    'type': re[0]
  }
}

var _weixinShareCall = function() {

  // 发送给朋友
  WeixinJSBridge.on('menu:share:appmessage', function(argv){
    // alert(_shareData.img_url);
    WeixinJSBridge.invoke('sendAppMessage', _shareData, function(res) {
      // alert(parseRes(res)[0] + ', ' + parseRes(res)[1]);
      _shareCallback && _shareCallback(parseRes(res));
    });
  });

  // 发送到朋友圈
  WeixinJSBridge.on('menu:share:timeline', function(argv){
    WeixinJSBridge.invoke('shareTimeline', _shareData, function(res){
      _shareCallback && _shareCallback(parseRes(res));
    });
  });

}

/**
 *
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
window.getWeixinNetworkType = function(callback) {
  if (callback && typeof callback === 'function') {
    ns.weixinJSBridgeInitCallback(function() {

      WeixinJSBridge.invoke('getNetworkType', {}, function (resp) {
        /**
         *
         * 在这里拿到 err_msg，这里面就包含了所有的网络类型
         *
         * network_type:wifi     wifi网络
         * network_type:edge     非wifi,包含3G/2G
         * network_type:fail     网络断开连接
         * network_type:wwan     2g或者3g
         */
        var re = resp.err_msg.split(':');
        if(re[1] != 'wifi') {
          re[1] = '3g';
        }
        else {
          re[1] = 'wifi';
        }
        callback(re[1]);

      });

    });
  }
}


ns.weixinJSBridgeInitCallback = function(callback) {
  // already has WeixinJSBridge
  if(typeof WeixinJSBridge !== 'undefined') {
    callback();
  }
  // 当微信内置浏览器完成内部初始化后会触发 WeixinJSBridgeReady 事件。
  else {
    if(document.addEventListener){
      document.addEventListener('WeixinJSBridgeReady', callback, false);
    }else if(document.attachEvent){
      document.attachEvent('WeixinJSBridgeReady'   , callback);
      document.attachEvent('onWeixinJSBridgeReady' , callback);
    }
  }
}

var _weixinShareCallAttached = false;
/**
 * 分享配置
 * @param {object} options 分享内容
 * @param {string} options.pic 图片地址
 * @param {string} options.link 分享后点击进来的链接，如果不设置就使用 window.location.href
 * @param {string} options.title 分享出去的标题，如果不设置就使用 document.title
 */
ns.setWeixinShare = function(options) {
  options || (options = {});

  // 图片、回调函数 可以无数次替换
  // options 为空也替换，等于重置
  _shareData.img_url = options.pic;
  _shareData.link = options.link;
  _shareData.link || (_shareData.link = window.location.href);

  _shareData.title = options.title;
  _shareData.title || (_shareData.title = document.title);

  // alert(_shareData.link);
  _shareCallback = options.callback;

  // _weixinShareCall 只挂一次
  !_weixinShareCallAttached && ns.weixinJSBridgeInitCallback(_weixinShareCall);
  _weixinShareCallAttached = true;
}
