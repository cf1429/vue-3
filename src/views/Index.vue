<template>
  <el-container  class="home-container">
    <el-header>
      <div>
        <!--<img src="../assets/log_s.png" />-->
        <span>悦沐塑颜皮肤管理后台</span>
      </div>
      <el-button type="info" @click="logout" style="margin-top: 12px;margin-bottom: 12px">退出</el-button>
    </el-header>
    <!--页面主体区-->
    <el-container>
      <!--侧边栏-->
      <el-aside width="200px">
        <el-menu background-color="#333744" text-color="#fff" router >
          <el-submenu v-for="(item,index) in $router.options.routes" :index="index + ''" v-if="item.show">
            <template slot="title"><i class="el-icon-setting"></i>{{item.name}}</template>
            <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path"
            :class="$route.path==item2.path?'is-active':''" v-if="item2.show">{{item2.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    methods: {
      logout(){
        window.sessionStorage.clear()
        this.$router.push('/')
      }
    }
}
</script>

<style scoped>
  .home-container {
    height: 100%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-content: center;
    color: #ffffff;
    font-size: 20px;
  }

  .el-header div {
    display: flex;
    align-content: center;
  }
  .el-header div span {
    margin-left: 15px;
  }
  .el-header div img {
    margin-left: 15px;
    padding-left: 0;
  }

  .el-aside {
    background-color: #333744;
  }

  .el-main {
    background-color: #eaedf1;
  }


</style>