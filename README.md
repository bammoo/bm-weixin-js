bm-weixin 微信
===============


*注意：

  + 适用于 2015-1-9 发布的 js sdk 封装
  + 请在调用本类库中的方法前先加载完 wx 的 js 文件及进行 `wx.config()` 操作，详情见：[完整 JS-SDK 文档地址](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html)

## 微信分享 js 封装

### Example
```javascript

// 分享
ns.setWeixinShareData({
  imgUrl: 'https://avatars3.githubusercontent.com/u/5893693?v=3&s=460',
  link: 'https://github.com/bammoo',
  title: 'bammoo\'s github',
  success: function() {
    // 成功后回调
  }
})

// 清除设置的分享数据
// 使用场景：spa 更新了视图，防止分享之前的视图绑定的数据
ns.clearWeixinShareData()
```

## 微信获取网络状态接口 js 封装

### Example
```javascript
ns.getNetworkType(function(networkType) {
    // networkType 取值为 2g，3g，4g，wifi
    // 成功后回调
})
```