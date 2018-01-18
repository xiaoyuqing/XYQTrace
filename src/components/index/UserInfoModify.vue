<template>
  <Row>
    <i-col>
      <i-form ref="formValidate" :model="changeForm" label-position="left" :label-width="100"
              :rules="changeRules">
        <form-item label="用户名" prop="username">
          <i-input v-model="changeForm.username" type="text"></i-input>
        </form-item>
        <form-item label="手机号" prop="phone">
          <i-input v-model="changeForm.phone" type="text"></i-input>
        </form-item>
        <form-item>
          <i-button type="primary" @click="handleSubmit('formValidate')">提交修改</i-button>
        </form-item>
      </i-form>
    </i-col>
  </Row>
</template>

<script>
  // import Row from 'iview/src/components/grid/row'
  // import ICol from 'iview/src/components/grid/col'
  // import IForm from 'iview/src/components/form/form'
  // import FormItem from 'iview/src/components/form/form-item'

  export default {
    components: {
      // Row,
      // ICol,
      // FormItem,
      // IForm
    },
    name: 'user-info-modify',
    data () {
      const phoneCheck = (rule, value, callback) => {
        const reg = /^[1-9]\d*|0$/
        if (!reg.test(value)) {
          callback(new Error('输入内容存在非数字字符'))
        } else {
          callback()
        }
      }
      return {
        type: '',
        changeForm: {
          username: '',
          phone: ''
        },
        changeRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 4, message: '用户名不得少于4个字符', trigger: 'blur'},
            {max: 15, message: '用户名不得超过15个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: phoneCheck, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      user () {
        return this.$store.getters.getUser
      }
    },
    mounted: function () {
      this.$store.dispatch('loadUserFromLocal')
      this.changeForm.username = this.user.username
      this.changeForm.phone = this.user.phone
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            console.log(valid)
            alert('修改成功，请重新登录')
            this.$store.dispatch('deleteUserFromStore')
            this.$router.push({path: '/index/login'})
          } else {
            this.$Message.error('输入信息有误')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
