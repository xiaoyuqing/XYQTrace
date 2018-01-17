<template>
  <div class='foot'>
    <div class='webNav'>
      <div>
        <h1><span>中科院食品安全防伪追溯系统</span></h1>
        <ul>
          <li><a href='http://www.zky315.com/farming'>中科院食品安全联众肉制品追溯系统</a></li>
          <li><a href='http://www.zky315.com/dexing'>中科院食品安全德兴肉制品追溯系统</a></li>
          <li><a href='http://www.zky315.com/maofeng'>中科院食品安全茂丰肉制品追溯系统</a></li>
          <li><a href='http://www.zky315.com/farming'>关于我们</a></li>
        </ul>
      </div>
    </div>
    <div class='bottom center'>
      <p>备案号:粤ICP备15107311号</p>
      <p>分享</p>
      <div class='bdsharebuttonbox'>
        <a href='#' class='bds_more' data-cmd='more'></a>
        <a href='#' class='bds_weixin' data-cmd='weixin' title='分享到微信'></a>
        <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
        <a href='#' class='bds_tsina' data-cmd='tsina' title='分享到新浪微博'></a>
        <a href='#' class='bds_qzone' data-cmd='qzone' title='分享到QQ空间'></a>
        <a href='#' class='bds_tqq' data-cmd='tqq' title='分享到腾讯微博'></a>
        <a href='#' class='bds_renren' data-cmd='renren' title='分享到人人网'></a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    mounted () {
      this.share()
    },
    methods: {
      share () {
        window._bd_share_config = {
          common: {
            bdSnsKey: {},
            bdText: '',
            bdMini: '2',
            bdMiniList: false,
            bdPic: '',
            bdStyle: '0',
            bdSize: '24'
          },
          share: {},
          image: {
            viewList: ['weixin', 'tsina', 'qzone', 'tqq', 'renren'],
            viewText: '分享到：',
            viewSize: '16'
          },
          selectShare: {
            bdContainerClass: null,
            bdSelectMiniList: ['weixin', 'tsina', 'qzone', 'tqq', 'renren']
          }
        }
        const s = document.createElement('script')
        s.type = 'text/javascript'
        s.src =
          'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' +
          ~(-new Date() / 36e5)
        document.body.appendChild(s)
      }
    }
  }
</script>

<style>

</style>
