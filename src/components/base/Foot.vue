<template>
  <div>
  <!-- Site footer -->
  <footer class="site-footer">

    <!-- Bottom section -->
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="text-center">
            <div class="site-footer-link">
              <a class=""><img src="../../images/weichat_hover.png" alt=""></a>
              <a class=""><img src="../../images/weibo_hover.png" alt=""></a>
              <a class=""><img src="../../images/qq_hover.png" alt=""></a>
            </div>
            <div class='bdsharebuttonbox'>
              <a href='#' class='bds_more' data-cmd='more'></a>
              <a href='#' class='bds_weixin' data-cmd='weixin' title='分享到微信'></a>
              <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
              <a href='#' class='bds_tsina' data-cmd='tsina' title='分享到新浪微博'></a>
              <a href='#' class='bds_qzone' data-cmd='qzone' title='分享到QQ空间'></a>
              <a href='#' class='bds_tqq' data-cmd='tqq' title='分享到腾讯微博'></a>
              <a href='#' class='bds_renren' data-cmd='renren' title='分享到人人网'></a>
            </div>
            <p class="copyright-text">咨询电话：0755-86392168  投诉电话：13392165716</p>
            <p class="copyright-text">Copyrights &copy; 中科院食品安全防伪追溯系统 粤ICP备15107311号</p>
          </div>
        </div>
      </div>
    </div>
    <!-- END Bottom section -->

  </footer>
  <!-- END Site footer -->

  <!-- Back to top button -->
  <a id="scroll-up" href="#"><i class="ti-angle-up"></i></a>
  <!-- END Back to top button -->
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
.bdshare-button-style0-24 a, .bdshare-button-style0-24 .bds_more {
  float: none !important;
}
</style>
