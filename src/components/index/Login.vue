<template>
  <Row>
    <i-col span="8" offset="8">
      <i-form ref="formValidate" :model="loginForm" label-position="left" :label-width="100" :rules="loginRules">
        <form-item label="用户名" prop="username">
          <i-input v-model="loginForm.username" type="text"></i-input>
        </form-item>
        <form-item label="密码" prop="password">
          <i-input v-model="loginForm.password" type="password"></i-input>
        </form-item>
        <form-item label="用户类型" prop="type">
          <radio-group v-model="loginForm.type">
            <radio label="1">消费者</radio>
            <radio label="2">企业用户</radio>
          </radio-group>
        </form-item>
        <form-item>
          <i-button type="primary" @click="handleSubmit('formValidate')">登录</i-button>
        </form-item>
      </i-form>
    </i-col>
  </Row>
</template>

<script>
  import axios from 'axios'
  import {lsKeyInStore, requestInIndex, lsKeyInEnterprise, requestInStore} from '../../util/const'
  import {mapGetters} from 'vuex'
  // import IForm from 'iview/src/components/form/form.vue'
  // import FormItem from 'iview/src/components/form/form-item.vue'
  // import IInput from 'iview/src/components/input/input.vue'
  // import Row from 'iview/src/components/grid/row'
  // import ICol from 'iview/src/components/grid/col'
  // import IButton from 'iview/src/components/button/button'
  // import RadioGroup from 'iview/src/components/radio/radio-group'
  // import Radio from 'iview/src/components/radio/radio'

  export default {
    components: {
      // Radio,
      // RadioGroup,
      // ICol,
      // Row,
      // IForm,
      // FormItem,
      // IInput,
      // IButton
    },
    data () {
      return {
        loginForm: {
          username: '',
          password: '',
          type: ''
        },
        loginRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择用户类型', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapGetters({
        user: 'getUser'
      })
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.loginForm.type === '1') {
              axios.post(requestInIndex.GETUSER,
                {
                  'username': this.loginForm.username,
                  'password': this.loginForm.password,
                  'type': this.loginForm.type
                })
                .then((response) => {
                  if (response.data === 'userNameError') {
                    alert('username error')
                  } else if (response.data === 'pwdError') {
                    alert('password error')
                  } else {
                    localStorage.setItem(lsKeyInStore.USER, JSON.stringify(response.data))
                    this.$store.dispatch('loadUserFromLocal')
                    return axios.get(requestInStore.GETFAVORITE + this.user.id)
                      .then((response) => {
                        localStorage.setItem(lsKeyInStore.FAVORITE, JSON.stringify(response.data))
                        return axios.get(requestInStore.GETCART + this.user.id)
                          .then((response) => {
                            localStorage.setItem(lsKeyInStore.CART, JSON.stringify(response.data))
                            this.$router.push({path: '/index/show'})
                          })
                      })
                  }
                })
            } else if (this.loginForm.type === '2') {
              axios.post(requestInIndex.GETUSER,
                {
                  'username': this.loginForm.username,
                  'password': this.loginForm.password,
                  'type': this.loginForm.type
                })
                .then((response) => {
                  localStorage.setItem(lsKeyInEnterprise.USER, JSON.stringify(this.loginForm))
                  localStorage.setItem(lsKeyInEnterprise.AUTH, JSON.stringify(response.data))
                  this.$router.push(({path: '/enterprise'}))
                })
            }
          } else {
            this.$Message.error('输入信息格式不正确')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
