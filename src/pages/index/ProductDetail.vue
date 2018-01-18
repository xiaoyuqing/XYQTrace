<template>
  <div>
    <search-box></search-box>
    <!-- <div class="company">
      <div>
        <img :src="path + company.business_license" />
        <img :src="path + company.safety_certification" />
        <img :src="path + company.logo" />
        <img :src="path + company.qualification" />
      </div>
    </div>
    <Button type="primary" class="comment-btn" @click="goToComment">评论</Button> -->
    <!-- Main container -->
    <main>

      <!-- Categories -->
      <section class="section-sm">
        <div class="container">
          <div class="row">
            <div class="col-md-10 col-md-offset-1">
              <!--查询结果-->
              <div class="query-result-box">
                <div class="query-result-sub-box">
                  <img src="../../images/logo-alt.png" alt="">
                  <h4 class="text-green">中科院食品安全防伪追溯系统</h4>
                  <a href="" class="btn btn-green">查询结果</a>
                  <h3 class="text-danger">该产品已注册！</h3>
                </div>
              </div>

              <!--标题-->
              <div class="query-result-tit">
                产品信息
              </div>
              <!--产品信息-->
              <div class="bg-alt product-box">
                <img src="../../images/08.jpg" alt="" data-action="zoom">
                <div class="product-box-padd">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td class="text-right">【品名】</td>
                        <td colspan="3" class="text-left">英红九号</td>
                      </tr>
                      <tr>
                        <td class="text-right">【配料】</td>
                        <td colspan="3" class="text-left">鲜茶叶 英红九号</td>
                      </tr>
                      <tr>
                        <td class="text-right">【等级】</td>
                        <td class="text-left">一级</td>
                        <td class="text-right">【口感】</td>
                        <td class="text-left">浓强鲜爽</td>
                      </tr>
                      <tr>
                        <td class="text-right">【等级】</td>
                        <td class="text-left">一级</td>
                        <td class="text-right">【口感】</td>
                        <td class="text-left">浓强鲜爽</td>
                      </tr>
                      <tr>
                        <td class="text-right">【等级】</td>
                        <td class="text-left">一级</td>
                        <td class="text-right">【口感】</td>
                        <td class="text-left">浓强鲜爽</td>
                      </tr>
                      <tr>
                        <td class="text-right">【等级】</td>
                        <td colspan="3" class="text-left">鲜茶叶 英红九号</td>
                      </tr>
                      <tr>
                        <td class="text-right">【等级】</td>
                        <td colspan="3" class="text-left">鲜茶叶 英红九号</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
              <!--标题-->
              <div class="query-result-tit">
                公司介绍
              </div>
              <div class="company-box">
                <div class="text-center">
                <img src="../../images/09.jpg" alt="" data-action="zoom">
                </div>
                <!--列表-->
                <div class="row">
                  <div class="col-sm-4">
                    <div class="company-con-list">
                      <img src="../../images/10.jpg" alt="">
                      <h5>红茶原料基地</h5>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="company-con-list">
                      <img src="../../images/10.jpg" alt="">
                      <h5>红茶原料基地</h5>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="company-con-list">
                      <img src="../../images/10.jpg" alt="">
                      <h5>红茶原料基地</h5>
                    </div>
                  </div>
                </div>
                <div class="company-con-text">
                  <p>
                    阿里云服务着制造、金融、政务、交通、医疗、电信、能源等众多领域的领军企业，包括中国联通、12306、中石化、中石油、飞利浦、华大基因等大型企业客户，以及微博、知乎、锤子科技等明星互联网公司。在天猫双11全球狂欢节、12306春运购票等极富挑战的应用场景中，阿里云保持着良好的运行纪录[1]
                  </p>
                </div>
                <!--列表-->
                <div class="row">
                  <div class="col-sm-4">
                    <div class="company-con-list">
                      <img src="../../images/11.jpg" alt="">
                      <h5>央视商城入住</h5>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="company-con-list">
                      <img src="../../images/12.jpg" alt="">
                      <h5>千年卓越贡献奖</h5>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="company-con-list">
                      <img src="../../images/13.jpg" alt="">
                      <h5>商标注册</h5>
                    </div>
                  </div>
                </div>

                <!--page-->
                <div class="visible-xs-block">
                  <div class="page_wap">
                  <a href="#" class="btn btn-outline btn-black">上一页</a>
                  <a href="#" class="btn btn-outline btn-black">下一页</a>
                  </div>
                </div>

              </div>

              <!--评论-->
              <div id="comments">
                <!--评论框-->
                <div class="comment-box">
                  <header>
                    <h3>网友评论 <span>文明上网理性发言</span></h3>
                  </header>
                  <div class="row">
                    <div class="col-xs-2 col-md-1"><img class="avatar" src="../../images/14.jpg" alt="..."></div>
                    <div class="col-xs-10 col-md-11">
                      <!--表单-->
                      <div class="">
                        <div class="input-group">
                          <textarea class="form-control form-control-pinglun" rows="3" placeholder="说两句吧……" v-model="commentText"></textarea>
                          <span class="input-group-btn">
                            <button class="btn btn-green" type="button" @click="addComment">评论</button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--评论列表-->
                <header>
                  <h3>全部评论</h3>
                </header>

                <ul class="comments-list">
                  <li class="comment">
                    <img class="avatar" src="../../images/14.jpg" alt="...">
                    <div class="comment-body">
                      <a class="reply-link" href="#">回复</a>
                      <h6><span class="text-green">某某某</span> <time datetime="2016-04-04 22:00">2016-04-04 22:00</time></h6>
                      <p>我们旨在构建未来的商务生态系统。我们的愿景是让客户相会、工作和生活在阿里巴巴，并持续发展最少102年。</p>
                    </div>

                    <ul class="children">
                      <li class="comment">
                        <img class="avatar" src="../../images/14.jpg" alt="...">
                        <div class="comment-body">
                          <a class="reply-link" href="#">回复</a>
                          <h6><span class="text-green">某某某</span> <time datetime="2016-04-04 22:00">2016-04-04 22:00</time></h6>
                          <p>阿里巴巴集团创立于1999年，持续发展最少102年就意味着我们横跨三个世纪，能够与少数取得如此成就的企业匹敌。我们的文化、商业模式和系统都经得起时间的考验，让我们得以持续发展。</p>
                        </div>
                      </li>

                      <li class="comment">
                        <img class="avatar" src="../../images/14.jpg" alt="...">
                        <div class="comment-body">
                          <a class="reply-link" href="#">回复</a>
                          <h6><span class="text-green">某某某</span> <time datetime="2018-01-11 12:12:12">2018-01-11 12:12:12</time></h6>
                          <p>我们每天促进数以亿计的商业和社交互动，包括用户和用户之间、消费者和商家之间以及企业和企业之间的互动</p>
                        </div>
                      </li>
                    </ul>
                  </li>

                  <li class="comment" v-for="item in commentList" :key="index">
                    <img class="avatar" src="../../images/14.jpg" alt="...">
                    <div class="comment-body">
                      <a class="reply-link" href="#">回复</a>
                      <h6><span class="text-green">某某某</span> <time datetime="2018-01-11 12:12:12">2018-01-11 12:12:12</time></h6>
                      <p>{{item.comment}}</p>
                    </div>
                  </li>

                  <li class="comment">
                    <img class="avatar" src="../../images/14.jpg" alt="...">
                    <div class="comment-body">
                      <a class="reply-link" href="#">回复</a>
                      <h6><span class="text-green">某某某</span> <time datetime="2018-01-11 12:12:12">2018-01-11 12:12:12</time></h6>
                      <p>我们致力拓展产品和服务范畴，让阿里巴巴成为我们客户日常生活的重要部份。</p>
                    </div>
                  </li>

                </ul>

                <a href="" class="btn btn-block btn-default text-muted">查看更多评论</a>
              </div>

            </div>
          </div>
        </div>
      </section>
      <!-- END Categories -->

    </main>
    <!-- END Main container -->
  </div>
</template>
<script>
  // import { mapGetters } from 'vuex'
  import axios from 'axios'
  import { path, requestInShow } from '../../util/const'
  import SearchBox from '../../components/base/SearchBox.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'product-detail',
    data () {
      return {
        productId: this.$route.params.id,
        company: {},
        path: path.PICTURE,
        commentText: '',
        commentList: []
      }
    },
    computed: {
      ...mapGetters({
        user: 'getUser'
      })
    },
    mounted () {
      window.document.title = '详情'
      this.getCompanyDetail()
      this.getComments()
    },
    methods: {
      getCompanyDetail () {
        axios.get(requestInShow.COMPANY_DETAIL, {params: {product_id: this.productId}})
        .then((res) => {
          this.company = res.data.company
        })
      },
      getComments () {
        axios.get(requestInShow.GET_COMMENTS, {params: {product_id: this.$route.params.id}})
          .then((res) => {
            this.commentList = res.data
          })
      },
      addComment () {
        axios.post(requestInShow.ADD_COMMENT, {product_id: this.$route.params.id, customer_id: this.user.id, comment: this.commentText})
          .then((res) => {
            if (res.status === 200) {
              this.$Message.info('添加成功')
              this.getComments()
            }
          })
      }
    },
    components: {
      SearchBox
    }
  }
</script>

<style scoped>
.company img{
  width: 100%;
  height: 300px;
}
.comment-btn {
  position:fixed;
  top: 200px;
  right: 0px;
}
</style>
