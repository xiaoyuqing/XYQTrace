<template>
  <div class="layout">
    <Row>
      <i-col span="5" class="layout-menu-left">
        <i-menu theme="dark" width="auto">
          <div class="layout-logo-left"></div>
          <!--<div v-if="auth[0].printerSetting">-->
            <i-menu-item name="printerSetting">
              <router-link :to="{path:'/enterprise/printerSetting'}">打印设置管理</router-link>
            </i-menu-item>
          <!--</div>-->
          <!--<div v-if="auth[1].procedureField">-->
            <i-menu-item name="procedureField">
              <router-link :to="{path:'/enterprise/procedureField'}">流程字段管理</router-link>
            </i-menu-item>
          <!--</div>-->
          <!--<div v-if="auth[2].procedureConsist">-->
            <i-menu-item name="procedureConsist">
              <router-link :to="{path:'/enterprise/procedureConsist'}">流程组成管理</router-link>
            </i-menu-item>
          <!--</div>-->
          <!--<div>-->
            <i-menu-item>
              <router-link :to="{path:'/enterprise/procedureChain'}">Procedure Chain Management</router-link>
            </i-menu-item>
          <!--</div>-->
          <!--<div v-if="auth[3].procedureRecord">-->
            <i-menu-item name="procedureRecord">
              <router-link :to="{path:'/enterprise/procedureRecord'}">流程记录管理</router-link>
            </i-menu-item>
          <!--</div>-->
          <i-menu-item name="uploadErrorInfo">
            <router-link :to="{path:'/enterprise/uploadErrorInfo'}">Upload Error Info</router-link>
          </i-menu-item>
          <!--<div v-if="auth[4].procedurePrint">-->
            <i-menu-item name="procedurePrint">
              <router-link :to="{path:'/enterprise/procedurePrint'}">流程打印管理</router-link>
            </i-menu-item>
          <!--</div>-->
          <!--<div v-if="auth[5].statisticalInfo">-->
            <i-menu-item name="statisticalInfo">
              <router-link :to="{path:'/enterprise/statisticalInfo'}">统计信息</router-link>
            </i-menu-item>
          <!--</div>-->
          <!--<div v-if="auth[6].rolemanage">-->
            <i-menu-item name="rolemanage">
              <router-link :to="{path:'/enterprise/userRole'}">角色管理</router-link>
            </i-menu-item>
          <!--</div>-->
          <!--<div v-if="auth[7].usermanage">-->
            <i-menu-item name="usermanage">
              <router-link :to="{path:'/enterprise/userManager'}">用户管理</router-link>
            </i-menu-item>
          <!--</div>-->
          <!--<div v-if="auth[8].productmanange">-->
            <i-menu-item name="productmanange">
              <router-link :to="{path:'/enterprise/productMananger'}">产品管理</router-link>
            </i-menu-item>
          <!--</div>-->
          <!--<div v-if="auth[9].companymanager">-->
            <i-menu-item name="companymanager">
              <router-link :to="{path:'/enterprise/companyManager'}">公司管理</router-link>
            </i-menu-item>
          <!--</div>-->
          <!--<div v-if="auth.printParamSetting">-->
            <i-menu-item name="printParamSetting">
              <router-link :to="{path:'/enterprise/PrintParamSetting'}">打印参数设置</router-link>
            </i-menu-item>
          <!--</div>-->
          <!--<div v-if="auth.shopGiftManager">-->
          <i-menu-item name="shopGiftManager">
            <router-link :to="{path:'/enterprise/shopGiftManager'}">商城礼品管理</router-link>
          </i-menu-item>
          <!--</div>-->
          <i-menu-item name="exchangeGiftInfo">
            <router-link :to="{path:'/enterprise/exchangeGiftInfo'}">礼品的物流信息管理</router-link>
          </i-menu-item>
        </i-menu>
      </i-col>
      <i-col span="19">
        <div class="layout-header">
          <p>welcome,{{user.username}}</p>
          <router-link :to="{path:'/index/show'}" @click.native="signOut">sign out</router-link>
        </div>
        <div class="layout-breadcrumb">
          123
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view></router-view>
          </div>
        </div>
      </i-col>
    </Row>
    {{auth}}
  </div>
</template>

<script>
  import Row from 'iview/src/components/grid/row'
  import ICol from 'iview/src/components/grid/col'
  import IMenu from 'iview/src/components/menu/menu'
  import Submenu from 'iview/src/components/menu/submenu'
  import IMenuItem from 'iview/src/components/menu/menu-item'
  import {lsKeyInEnterprise, lsKeyInStore} from '../../util/const'

  export default {
    components: {
      IMenuItem,
      Submenu,
      Row,
      ICol,
      IMenu
    },
    name: 'enterprise-index-page',
    data () {
      return {
        type: '',
        auth: [],
        user: {}
      }
    },
    mounted: function () {
      this.auth = JSON.parse(localStorage.getItem(lsKeyInEnterprise.AUTH))
      this.user = JSON.parse(localStorage.getItem(lsKeyInStore.USER))
    },
    methods: {
      signOut () {
        localStorage.clear()
        this.$router.push({path: '/index/show'})
      }
    }
  }
</script>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
  }

  .layout-menu-left {
    background: #464c5b;
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }

  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 200px;
    height: 700px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
</style>
