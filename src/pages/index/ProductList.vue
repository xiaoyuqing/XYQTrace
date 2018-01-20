<template>
  <div>
    <!-- <div class="search-result">
      <div class="result" v-for="(item,$index) in product" :key="$index">
        <div>
          <a href="">
            <img src=""/>
          </a>
        </div>
        <div class="product-detail">
          <ul>
            <li><a @click="goToProductDetail(item.id)">{{item.company.name}}</a></li>
            <li><a @click="goToProductDetail(item.id)">{{item.name}}</a></li>
            <li><a @click="goToProductDetail(item.id)">{{item.introduction}}</a></li>
          </ul>
        </div>
      </div>
    </div> -->
    <!-- Main container -->
    <main>
      <!-- Categories -->
      <section class="bg-alt">
        <div class="container">
          <div class="related-search">
            相关搜索：
            <a href="" class="btn btn-default text-muted btn-outline btn-sm btn-xs">茶罐头</a>
            <a href="" class="btn btn-default text-muted btn-outline btn-sm">茶水果</a>
            <a href="" class="btn btn-default text-muted btn-outline btn-sm">茶水果</a>
          </div>
          <!--list-->
          <div class="row">
            <div class="col-md-3" v-for="(item,$index) in product" :key="$index">
              <a @click="goToProductDetail(item.id)" class="search-box">
                <img src="../../images/07.jpg" alt="">
                <h6 @click="goToProductDetail(item.id)">{{item.company.name}}</h6>
                <p @click="goToProductDetail(item.id)">{{item.name}}</p>
                <p @click="goToProductDetail(item.id)">{{item.introduction}}</p>
              </a>
            </div>

          </div>
          <Row type="flex" justify="center">
            <page :total='total' :pageSize='size' @on-change="change"></page>
          </Row>
          <!--页码-->

        </div>
      </section>
      <!-- END Categories -->

    </main>
    <!-- END Main container -->
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import axios from 'axios'
  // import { requestInShow } from '../../util/const'
  import SearchBox from '../../components/base/SearchBox.vue'
  export default {
    name: 'product-list',
    computed: {
      ...mapGetters({
        productList: 'getProductDetail'
      })
    },
    data () {
      return {
        name: this.$route.query.name ? this.$route.query.name : '',
        current_page: 1,
        size: 5,
        product: this.produclist ? this.productList.rows : [],
        total: this.produclist ? this.productList.total : 0
      }
    },
    mounted () {
      window.document.title = '搜索结果'
      if (this.$route.query.name) {
        this.$store.commit('UPDATE_CONTEXT', this.$route.query.name)
        let that = this
        this.productFind().then(
          function () {
            that.product = that.productList.rows
            that.total = that.productList.total
          }
        )
      }
      this.product = this.productList.rows
      this.total = this.productList.total
    },
    methods: {
      ...mapActions([
        'productFind'
      ]),
      change (page) {
        axios.get('http://localhost:3000/comments', {params: {
          name: this.name,
          current_page: page
        }})
        .then((res) => {
          if (res.data[0]) {
            this.product = res.data[0].rows
          }
        })
      },
      goToProductDetail (id) {
        this.$router.push({path: '/index/productDetail/' + id})
      }
    },
    components: {
      SearchBox
    },
    watch: {
      '$route' (to, from) {
        this.product = this.productList.rows
        this.total = this.productList.total
      }
    }
  }
</script>

<style scoped>
.result{
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}
.result img{
  width: 100px;
  height: 100px;
  margin-right: 2rem;
}
.search-result .product-detail ul li a{
  color: #000000;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
}
</style>

