<template>
  <div class="container">
    <div v-if="favorite.length === 0">
      <div class="row">
        <div class="col-xs-2 col-xs-offset-5">
          您未收藏任何商品
        </div>
      </div>
    </div>
    <ul class="list-group" v-else>
      <li class="list-group-item" v-for="item in favorite">
        <div class="row">
          <div class="col-xs-3">
            img
          </div>
          <div class="col-xs-3">
            {{item.gift_id.giftname}}
          </div>
          <div class="col-xs-3">
            {{item.gift_id.need_point}}
          </div>
          <div class="col-xs-3">
            <button class="btn btn-primary" @click="goToDetail(item.gift_id.id)">查看详情</button>
            <button class="btn btn-primary" @click="deleteFromFavorite(item.favorite_id)">取消收藏</button>
          </div>
        </div>
      </li>
    </ul>
    {{favorite}}
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  import {requestInStore, lsKeyInStore} from '../../util/const'

  export default {
    mounted: function () {
      this.$store.dispatch('loadFavoriteFromLocal')
      this.$store.dispatch('loadUserFromLocal')
    },
    computed: {
      ...mapGetters({
        favorite: 'getFavorite'
      })
    },
    methods: {
      deleteFromFavorite (favoriteId) {
        axios.get(requestInStore.DELETEFAVORITE + favoriteId)
          .then((response) => {
            if (response.data === 'success') {
              let favorites = JSON.parse(localStorage.getItem(lsKeyInStore.FAVORITE))
              favorites = favorites.filter((favorite) => favorite.favorite_id !== Number(favoriteId))
              localStorage.setItem(lsKeyInStore.FAVORITE, JSON.stringify(favorites))
              this.$store.dispatch('loadFavoriteFromLocal')
            } else {
              alert('delete failed')
            }
          })
      },
      goToDetail (id) {
        this.$router.push({path: `detail/${id}`})
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 100px;
  }
</style>
