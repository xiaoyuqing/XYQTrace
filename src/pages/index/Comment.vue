<template>
  <div>
    <search-box></search-box>
    <div class="comment">
      <textarea class="textarea" width="500" cols="30" rows="10" v-model="commentText"></textarea>
      <Row>
        <Button type="primary" @click="addComment">保存</Button>
        <Button type="error" @click="$router.back(-1)">返回</Button>
      </Row>
      <Row>评论列表</Row>
      <Row v-for="item in commentList">
        {{item.comment}}
      </Row>
    </div>
  </div>
</template>
<script>
  import SearchBox from '../../components/base/SearchBox.vue'
  import axios from 'axios'
  import { requestInShow } from '../../util/const'
  import {mapGetters} from 'vuex'
  export default {
    name: 'comment',
    data () {
      return {
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
      this.getComments()
    },
    methods: {
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
<style>
.comment {
  text-align: center;
}
.textarea {
  width: 500px;
  height: 250px;
  margin: 20px 0;
}
</style>
