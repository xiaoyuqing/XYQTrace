<template>
  <div class="thumbnail">
    <ul class="list-group">
      <li class="list-group-item" v-for="item in contactInfo">
        <div class="row">
          <div class="col-xs-3">
            {{item.address}}
          </div>
          <div class="col-xs-3">
            {{item.phone}}
          </div>
          <div class="col-xs-3">
            {{item.receive_name}}
          </div>
          <div class="col-xs-1">
            {{item.postcode}}
          </div>
          <div class="col-xs-2">
            <div v-if="Boolean(item.isdefault)">
              默认地址
            </div>
            <div v-else>
              <button class="btn btn-default" @click="setDefault(item.id)">设为默认地址</button>
              <button class="btn btn-default" @click="deleteContactInfo(item.id)">删除</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <button class="btn btn-primary" @click="showAddressForm" v-if="addAddress">新增地址</button>
    <contact-info :showForm="addAddress" @showButton="showAddressButton" v-else></contact-info>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ContactInfo from './ContactInfo.vue'
  import axios from 'axios'
  import {lsKeyInStore, requestInStore} from '../../util/const'

  export default {
    mounted: function () {
      this.$store.dispatch('loadUserFromLocal')
      axios.get(requestInStore.GETCONTACTINFO + this.user.id)
        .then((response) => {
          localStorage.setItem(lsKeyInStore.CONTACTINFO, JSON.stringify(response.data))
          this.$store.dispatch('loadContactInfoFromLocal')
        })
    },
    components: {
      ContactInfo
    },
    computed: {
      ...mapGetters({
        contactInfo: 'getContactInfo',
        user: 'getUser'
      })
    },
    data () {
      return {
        addAddress: true
      }
    },
    methods: {
      showAddressForm () {
        this.addAddress = !this.addAddress
      },
      showAddressButton (data) {
        this.addAddress = data
      },
      setDefault (id) {
        axios.post(requestInStore.UPDATACONTACTINFODEFAULT,
          {
            'id': id + '',
            'customerid': this.user.id
          })
          .then((response) => {
            if (response.data === 'success') {
              let contactInfos = JSON.parse(localStorage.getItem(lsKeyInStore.CONTACTINFO))
              for (let i = 0; i < contactInfos.length; i++) {
                if (contactInfos[i].id === id) {
                  contactInfos[i].isdefault = 1
                } else {
                  contactInfos[i].isdefault = 0
                }
              }
              localStorage.setItem(lsKeyInStore.CONTACTINFO, JSON.stringify(contactInfos))
              this.$store.dispatch('loadContactInfoFromLocal')
            } else {
              alert('update failed')
            }
          })
      },
      deleteContactInfo (id) {
        axios.delete(requestInStore.DELETECONTACTINFO + id)
          .then((response) => {
            if (response.data.delete === 'success') {
              let contactInfos = JSON.parse(localStorage.getItem(lsKeyInStore.CONTACTINFO))
              contactInfos = contactInfos.filter((contactInfo) => contactInfo.id !== id)
              localStorage.setItem(lsKeyInStore.CONTACTINFO, JSON.stringify(contactInfos))
              this.$store.dispatch('loadContactInfoFromLocal')
            } else {
              alert('delete failed')
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
