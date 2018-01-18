<template>
  <Row>
    <i-col span="8" offset="8">
      <div>
        <p>请选择要注册的用户类型：</p>
        <a @click="chooseCustomer">消费者</a>
        <a @click="chooseEnterpriseAdmin">企业管理员用户</a>
      </div>
      <div v-if="type === ''"></div>
      <div v-else-if="type === 'customer'">
        <i-form ref="formValidate" :model="registerForm1" label-position="left" :label-width="100"
                :rules="registerRules1">
          <form-item label="用户名" prop="username">
            <i-input v-model="registerForm1.username" type="text"></i-input>
          </form-item>
          <form-item label="密码" prop="password">
            <i-input v-model="registerForm1.password" type="password"></i-input>
          </form-item>
          <form-item label="确认密码" prop="confirmPassword">
            <i-input v-model="registerForm1.confirmPassword" type="password"></i-input>
          </form-item>
          <form-item label="手机号" prop="phone">
            <i-input v-model="registerForm1.phone" type="text"></i-input>
          </form-item>
          <form-item>
            <i-button type="primary" @click="handleSubmit1('formValidate')">注册</i-button>
          </form-item>
        </i-form>
      </div>
      <div v-else-if="type === 'enterpriseAdmin'">
        <i-form ref="formValidate" :model="registerForm2" label-position="left" :label-width="100"
                :rules="registerRules2">
          <form-item label="用户名" prop="username">
            <i-input v-model="registerForm2.username" type="text"></i-input>
          </form-item>
          <form-item label="密码" prop="password">
            <i-input v-model="registerForm2.password" type="password"></i-input>
          </form-item>
          <form-item label="确认密码" prop="confirmPassword">
            <i-input v-model="registerForm2.confirmPassword" type="password"></i-input>
          </form-item>
          <form-item label="real name" prop="real_name">
            <i-input v-model="registerForm2.real_name" type="text"></i-input>
          </form-item>
          <form-item label="company">
            <i-select v-model="company_id">
              <i-option v-for="item in companies" :key="index" :value="item.value">{{item.label}}</i-option>
            </i-select>
          </form-item>
          {{registerForm2}}
          <form-item>
            <i-button type="primary" @click="handleSubmit2('formValidate')">注册</i-button>
          </form-item>
        </i-form>
      </div>
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
  import {requestInEnterprise} from '../../util/const'
  import axios from 'axios'
  // import ISelect from 'iview/src/components/select/select'
  // import IOption from 'iview/src/components/select/option'

  export default {
    components: {
      // IOption,
      // ISelect,
      // FormItem,
      // IForm,
      // Row,
      // ICol,
      // IInput,
      // IButton
    },
    mounted: function () {
      axios.get(requestInEnterprise.GETCOMPANY)
        .then((response) => {
          console.log(response.data)
          for (let i = 0; i < response.data.length; i++) {
            this.companies[i] = {label: '', value: ''}
            this.companies[i].label = response.data[i].name
            this.companies[i].value = response.data[i].id
          }
        })
    },
    data () {
      const passwordCheck1 = (rule, value, callback) => {
        if (value !== this.registerForm1.password) {
          callback(new Error('两次密码输入不同，请再次确认'))
        } else {
          callback()
        }
      }
      const passwordCheck2 = (rule, value, callback) => {
        if (value !== this.registerForm2.password) {
          callback(new Error('两次密码输入不同，请再次确认'))
        } else {
          callback()
        }
      }
      const phoneCheck = (rule, value, callback) => {
        const reg = /^[1-9]\d*|0$/
        if (!reg.test(value)) {
          callback(new Error('输入内容存在非数字字符'))
        } else {
          callback()
        }
      }
      return {
        company_id: '',
        companies: [],
        type: '',
        registerForm1: {
          username: '',
          password: '',
          confirmPassword: '',
          phone: ''
        },
        registerForm2: {
          username: '',
          password: '',
          confirmPassword: '',
          real_name: ''
        },
        registerRules1: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 4, message: '用户名不得少于4个字符', trigger: 'blur'},
            {max: 15, message: '用户名不得超过15个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 8, message: '密码长度不得少于8个字符', trigger: 'blur'},
            {max: 20, message: '密码长度不得超过20个字符', trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, message: '请确认密码', trigger: 'blur'},
            {validator: passwordCheck1, trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: phoneCheck, trigger: 'blur'}
          ]
        },
        registerRules2: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 4, message: '用户名不得少于4个字符', trigger: 'blur'},
            {max: 15, message: '用户名不得超过15个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 8, message: '密码长度不得少于8个字符', trigger: 'blur'},
            {max: 20, message: '密码长度不得超过20个字符', trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, message: '请确认密码', trigger: 'blur'},
            {validator: passwordCheck2, trigger: 'blur'}
          ],
          real_name: [
            {required: true, message: '请输入real_name', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit1 (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            axios.post(requestInEnterprise.REGISTERCUSTOMER,
              {
                'username': this.registerForm1.username,
                'password': this.registerForm1.password,
                'phone': this.registerForm1.phone
              })
              .then((response) => {
                if (response.data === 'success') {
                  this.$router.push({path: '/index/registerSuccess'})
                } else {
                  alert(response.data)
                }
              })
          } else {
            this.$Message.error('输入信息有误')
          }
        })
      },
      handleSubmit2 (name) {
        if (this.company_id === '') {
          alert('please select a company...')
          return
        }
        this.$refs[name].validate((valid) => {
          if (valid) {
            axios.post(requestInEnterprise.REGISTERENTERPRISE,
              {
                'username': this.registerForm2.username,
                'password': this.registerForm2.password,
                'real_name': this.registerForm2.real_name,
                'company_id': this.registerForm2.company_id
              })
              .then((response) => {
                if (response.data === 'success') {
                  this.$router.push({path: '/index/registerSuccess'})
                } else {
                  alert(response.data)
                }
              })
          } else {
            this.$Message.error('输入信息有误')
          }
        })
      },
      chooseCustomer () {
        this.type = 'customer'
      },
      chooseEnterpriseAdmin () {
        this.type = 'enterpriseAdmin'
      }
    }
  }
</script>

<style scoped>

</style>
