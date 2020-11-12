<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
    <el-backtop target="#app" :visibility-height="50">
      <div class="backbtn el-icon-arrow-up"></div>
    </el-backtop>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "App",
  provide() {
    //孙组件运用祖组件的方法或data  祖组件返回relaod，孙组件inject['reload']接收
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  created() {
    // window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
  },
  mounted() {
    window.onbeforeunload = e => {
      console.log(e)
      // e = e || window.event;
      // if (e) {
      //   e.returnValue = "11122222";
      // }
      window.location.href = "http://tyyh.szh.js:9080/cas/logout";
      // return "关闭提示";
    };
    // window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    // window.addEventListener('unload', e => this.unloadHandler(e))
  },
  destroyed() {
    // window.removeEventListener("beforeunload", e =>
    //   this.beforeunloadHandler(e)
    // );
  },
  methods: {
    unloadHandler(e) {
      console.log(e);
      window.location.href = "http://tyyh.szh.js:9080/cas/logout";
    },
    beforeunloadHandler(e) {
      console.log(e);
      window.location.href = "http://tyyh.szh.js:9080/cas/logout";
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style>
@import "assets/css/reset.css";
@import "assets/css/style.css";
.backbtn {
  height: 100% !important;
  width: 100% !important;
  background-color: #626262 !important;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12) !important;
  border-radius: 5px !important;
  text-align: center !important;
  line-height: 40px !important;
  color: #fff !important;
  font-size: 18px;
}

.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
.el-backtop {
  background-color: transparent !important;
}
</style>
