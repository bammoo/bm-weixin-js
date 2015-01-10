var ns = ns || {};

var _shareData = {
  "imgUrl": '',
  "link": '',
  "desc": '',
  "title": '',
  success: function() {},
  cancel: function() {}
}

var _weixinShareCall = function() {
  wx.onMenuShareAppMessage(_shareData);
  wx.onMenuShareTimeline(_shareData);
}

var _weixinShareCallAttached = false;

/**
 * 清空分享数据
 * 使用场景：spa 更新了视图，防止分享之前的视图绑定的数据
 * @return {null}
 */
ns.clearWeixinShareData = function() {
  ns.setWeixinShareData(null)
}
/**
 * 分享配置
 * @param {object} options 分享内容
 * @param {string} options.pic 图片地址
 * @param {string} options.link 分享后点击进来的链接，如果不设置就使用 window.location.href
 * @param {string} options.title 分享出去的标题，如果不设置就使用 document.title
 */
ns.setWeixinShareData = function(options) {
  options || (options = {});
  // console.log('options:', options)

  // options.xx 为空也替换，等于清空旧数据
  _shareData.imgUrl = options.imgUrl;
  _shareData.link = options.link;
  _shareData.link || (_shareData.link = window.location.href);

  _shareData.title = options.title;
  _shareData.title || (_shareData.title = document.title);

  // alert(_shareData.link);
  _shareData.success = options.success;
  _shareData.cancel = options.cancel;

  // _weixinShareCall 只挂一次，以后只修改引用的参数
  !_weixinShareCallAttached && wx.ready(_weixinShareCall);
  _weixinShareCallAttached = true;
}

/**
 * 获取网络状态接口
 * @param  {Function} cb 请求成功后回调
 * @return {null}
 */
ns.getNetworkType = function(cb) {
  wx.ready(function() {
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型2g，3g，4g，wifi
        cb && cb(res.networkType)
      }
    })
  });
}
