bm-weixin
===============

微信分享 js 封装

## example
```javascript

  // 分享
  ns.setWeixinShare({
    pic: 'https://avatars3.githubusercontent.com/u/5893693?v=3&s=460',
    link: 'https://github.com/bammoo',
    title: 'bammoo\'s github',
    callback: function() {
      // cb after click share menu
    }
  })
```