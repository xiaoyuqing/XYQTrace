<template>
  <Row>
    <i-col>
      <i-form ref="formValidate" :model="changeForm" label-position="left" :label-width="100" :rules="changeRules">
        <form-item label="旧密码" prop="oldPassword">
          <i-input type="password" v-model="changeForm.oldPassword"></i-input>
        </form-item>
        <form-item label="新密码" prop="newPassword">
          <i-input type="password" v-model="changeForm.newPassword"></i-input>
        </form-item>
        <form-item label="确认新密码" prop="confirmNewPassword">
          <i-input type="password" v-model="changeForm.confirmNewPassword"></i-input>
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
  // import IInput from 'iview/src/components/input/input'
  // import IButton from 'iview/src/components/button/button'
  import axios from 'axios'

  export default {
    components: {
      // FormItem,
      // IForm,
      // Row,
      // ICol,
      // IInput,
      // IButton
    },
    name: 'password-modify',
    data () {
      const oldPasswordCheck = (rule, value, callback) => {
        axios.get('http://localhost:3000/users/1')
          .then((response) => {
            const oldPassword = response.data.password
            if (value !== oldPassword) {
              callback(new Error('密码输入有误'))
            } else {
              callback()
            }
          })
      }
      const confirmNewPasswordCheck = (rule, value, callback) => {
        if (value !== this.changeForm.newPassword) {
          callback(new Error('两次密码输入不同'))
        } else {
          callback()
        }
      }
      return {
        changeForm: {
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        },
        changeRules: {
          oldPassword: [
            {required: true, message: '请输入旧密码', trigger: 'blur'},
            {validator: oldPasswordCheck, trigger: 'blur'}
          ],
          newPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 8, message: '密码长度不得少于8个字符', trigger: 'blur'},
            {max: 20, message: '密码长度不得超过20个字符', trigger: 'blur'}
          ],
          confirmNewPassword: [
            {required: true, message: '请确认密码', trigger: 'blur'},
            {validator: confirmNewPasswordCheck, trigger: 'blur'}
          ]
        }
      }
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
