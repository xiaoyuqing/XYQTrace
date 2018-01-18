<template>
  <Row>
    <i-col span="8" offset="8">
      <i-form ref="formValidate" :model="contactInfoForm" label-position="left" :label-width="100"
              :rules="contactInfoRules">
        <form-item label="收货地址" prop="address">
          <i-input type="text" v-model="contactInfoForm.address"></i-input>
        </form-item>
        <form-item label="邮编" prop="postCode">
          <i-input type="text" v-model="contactInfoForm.postCode"></i-input>
        </form-item>
        <form-item label="收货人姓名" prop="receiver">
          <i-input type="text" v-model="contactInfoForm.receiver"></i-input>
        </form-item>
        <form-item label="收货人联系方式" prop="phone">
          <i-input type="text" v-model="contactInfoForm.phone"></i-input>
        </form-item>
        <form-item>
          <i-button type="primary" @click="handleSubmit('formValidate')">确认新增地址</i-button>
          <i-button type="primary" @click="cancelAddNewContactInfo">取消</i-button>
        </form-item>
      </i-form>
    </i-col>
  </Row>
</template>

<script>
  import axios from 'axios'
  import {lsKeyInStore, requestInStore} from '../../util/const'
  import {mapGetters} from 'vuex'
  // import Row from 'iview/src/components/grid/row'
  // import ICol from 'iview/src/components/grid/col'
  // import IForm from 'iview/src/components/form/form'
  // import FormItem from 'iview/src/components/form/form-item'
  // import IInput from 'iview/src/components/input/input'
  // import IButton from 'iview/src/components/button/button'

  export default {
    components: {
      // FormItem,
      // IForm,
      // ICol,
      // Row,
      // IInput,
      // IButton
    },
    data () {
      const phoneCheck = (rule, value, callback) => {
        const reg = /^[1-9]\d*|0$/
        if (!reg.test(value)) {
          callback(new Error('输入内容存在非数字字符'))
        } else {
          callback()
        }
      }
      const postCodeCheck = (rule, value, callback) => {
        const reg = /^[1-9]\d*|0$/
        if (!reg.test(value)) {
          callback(new Error('输入内容存在非数字字符'))
        } else {
          callback()
        }
      }
      return {
        contactInfoForm: {
          address: '',
          phone: '',
          receiver: '',
          postCode: ''
        },
        contactInfoRules: {
          address: [
            {required: true, message: '请输入收货地址', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: phoneCheck, trigger: 'blur'}
          ],
          postCode: [
            {required: true, message: '请输入收货人联系方式', trigger: 'blur'},
            {validator: postCodeCheck, trigger: 'blur'}
          ],
          receiver: [
            {required: true, message: '请输入收货人姓名', trigger: 'blur'}
          ]
        }
      }
    },
    props: ['showForm'],
    computed: {
      ...mapGetters({
        user: 'getUser'
      })
    },
    methods: {
      showAddressButton () {
        this.$emit('showButton', !this.showForm)
      },
      cancelAddNewContactInfo () {
        this.showAddressButton()
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            axios.post(requestInStore.ADDCONTACTINFO, {
              'customerid': this.user.id,
              'customerinfo': {
                'address': this.contactInfoForm.address,
                'phone': this.contactInfoForm.phone,
                'receive_name': this.contactInfoForm.receiver,
                'postcode': this.contactInfoForm.postCode
              }
            })
              .then((response) => {
                let contactInfos = JSON.parse(localStorage.getItem(lsKeyInStore.CONTACTINFO))
                contactInfos.push(response.data)
                localStorage.setItem(lsKeyInStore.CONTACTINFO, JSON.stringify(contactInfos))
                this.$store.dispatch('loadContactInfoFromLocal')
                this.showAddressButton()
              })
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
