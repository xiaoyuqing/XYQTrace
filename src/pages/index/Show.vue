<template>
  <div>
    <search-box></search-box>
    <!-- <div class="main-page">
      <div class="box">
        <div class="feature">
          <img src="../../images/nfcf.jpg">
          <p>
            <b>基于NFC的防伪智能标签</b><br>
            <span>消费者食品安全追溯,一物一标精确追溯</span><br>
            <span>无需专用设备,带有NFC功能的安卓手机</span><br>
            <span>一触即可登陆,操作简单</span><br>
            <span>为企业提供准客户数据挖掘</span><br>
            <span>为企业提供准客户数据挖掘</span><br>
          </p>
        </div>
        <div class="feature">
          <img src="../../images/systemf.png">
          <p>
            <b>树立优质企业良好形象</b><br>
            <span>提供防伪标签解决方案</span><br>
            <span>提供运输、存放监管解决方案</span><br>
            <span>提高沟通渠道、提高回头率</span><br>
            <span>有效防止过期劣货流入市场</span><br>
            <span>有效杜绝假冒伪劣打击正货</span><br>
          </p>
        </div>
        <div class="feature">
          <img src="../../images/productf.png">
          <p>
            <b>适应多种客户分类</b><br>
            <span>预制加工食品</span><br>
            <span>包装冷冻农产品</span><br>
            <span>珍稀中药材</span><br>
            <span>监控药品流向</span><br>
            <span>贵重保健品防伪</span><br>
          </p>
        </div>
      </div>
    </div>
    <div class="add">
      <Button type="warning">快来加入优质企业一员>>></Button>
    </div>
    <div class="company">
      <h1>优质企业介绍</h1>
      <div class="company-contain">
        <div class="company-item">
          <a href="">
            <img src="../../images/11.jpg" />
          </a>
        </div>
        <div class="company-item">
          <a href="">
            <img src="../../images/LOGO1.jpg" />
          </a>
        </div>
        <div class="company-item">
          <a href="">
            <img src="../../images/jzy.jpg" />
          </a>
        </div>
      </div>
    </div> -->
    <!-- Categories -->
    <section>
      <div class="container">

        <div class="category-grid">
          <a>
            <img src="../../images/01.png" alt="">
            <h6>基于NFC的防伪智能标签</h6>
            <p>消费者食品安全追溯,一物一标精确追溯</p>
            <p>无需专用设备,带有NFC功能的安卓手机</p>
            <p>一触即可登陆,操作简单</p>
            <p>为企业提供准客户数据挖掘</p>
            <p>为市场预测与分析提供数据支持</p>
          </a>

          <a>
            <img src="../../images/02.png" alt="">
            <h6>树立优质企业良好形象</h6>
            <p>提供防伪标签解决方案</p>
            <p>提供运输、存放监管解决方案</p>
            <p>提高沟通渠道、提高回头率</p>
            <p>有效防止过期劣货流入市场</p>
            <p>有效杜绝假冒伪劣打击正货</p>
          </a>

          <a>
            <img src="../../images/03.png" alt="">
            <h6>适应多种客户分类</h6>
            <p>预制加工食品</p>
            <p>包装冷冻农产品</p>
            <p>珍稀中药材</p>
            <p>监控药品流向</p>
            <p>贵重保健品防伪</p>
          </a>
        </div>

      </div>
    </section>
    <!-- END Categories -->


    <!-- Recent jobs -->
    <section class="bg-alt">
      <div class="container">
        <header class="section-header">
          <h2>优质企业介绍</h2>
        </header>

        <div class="row item-blocks-connected">

          <!-- Job item -->
          <div class="col-md-12">
            <div class="col-sm-4">
              <div class="text-center comp-logo-list"><img src="../../images/04.png" alt=""></div>
            </div>
            <div class="col-sm-4">
              <div class="text-center comp-logo-list"><img src="../../images/05.png" alt=""></div>
            </div>
            <div class="col-sm-4">
              <div class="text-center comp-logo-list"><img src="../../images/06.png" alt=""></div>
            </div>
          </div>
          <!-- END Job item -->

        </div>

        <br><br>
        <p class="text-center"><a class="btn btn-black btn-outline btn-xl" href="job-list.html">快来加入优质企业一员 </a></p>
      </div>
    </section>
    <!-- END Recent jobs -->
  </div>
</template>

<script>
  import SearchBox from '../../components/base/SearchBox.vue'
  export default {
    name: 'show',
    components: {
      SearchBox
    }
  }
</script>

<style scoped>
</style>
