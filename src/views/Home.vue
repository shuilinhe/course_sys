<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="16" class="col-one">
          <div class="logo"><img src="../assets/xueyuanlogo.webp"/></div>
          <div class="header_name"><span>排课系统</span></div>
          <!-- <div class="user_img"> -->
        </el-col>

        <el-col :span="1" :offset="23" class="col-two">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </el-col>
      </el-row>

    </el-header>

    <el-container class="aside_container">
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :router="true"
          active-text-color="#409eff"
        >
          <el-menu-item
            :index="'/' + item.path"
            v-for="item in menulist"
            :key="item.id"
            
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.authName }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <!--welcome占位符 -->
        <router-view />
      </el-main>

    </el-container>

  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      this.menulist = [
        {id: "1",authName: "督导教师信息",path: "supervisor",icon: "el-icon-s-custom",},
        {id: "2",authName: "任课教师信息",path: "teacher",icon: "el-icon-user",},
        {id: "3",authName: "课程信息",path: "coursetag",icon: "el-icon-school",},
        {id: "4",authName: "数据回收站",path: "recycle",icon: "el-icon-delete",},
      ];
    },
  },
};
</script>

<style>
body{
  background-color: #e9eef3;
  margin: 0px;
}
.el-container{
  height: 100%;
}
.el-header {
  /* background-color: #b3c0d1; */
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
  margin-bottom: 20px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 762px;
  border-radius: 5px;
}

.el-main {
  padding: 0px 20px !important;
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 60px;

}
.el-avator {
  position: absolute;
  right: 0;
}
.title {
  position: absolute;
  left: 30px;
  font-size: 32px;
  font-weight: 900;
}
.col-one {
  position: relative;
}
.col-two {
  position: relative;
  margin-top: 10px;
}
/* .title-icon img{
  position: absolute;
  left: 0;
  font-size: 30px;
  width: 40px;
} */
.header_name{
  font-size: 33px;
  font-weight: 900;
  position: absolute;
  left:60px;
  /* top:2px; */
  color:#333
}
.logo{
  float: left;
  position: absolute;
  left:15px;
  top:10px;
}
.logo img{
  width: 40px;
  
}
</style>