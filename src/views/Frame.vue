<template>
  <div>
    <div :class="$store.state.itstate?'frameT':'frame'">
      <Header :headData="$store.state.menu" v-show="!$store.state.itstate"></Header>
      <el-container>
        <Left :leftMenu="$store.state.leftMenu" v-show="!$store.state.itstate&&!$store.state.isHome"></Left>
        <el-main class="main">
          <Breadcrumb v-show="!$store.state.itstate&&!$store.state.isHome"></Breadcrumb>
          <router-view />
        </el-main>
        <Right v-show="!$store.state.itstate"></Right>
      </el-container>
    </div>
  </div>
  
</template>
<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Left from "@/components/Left.vue";
import Right from "@/components/Right.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "Frame",
  components: {
    Header,
    Left,
    Right,
    Breadcrumb
  },
  data() {
    return {
      headData: [],
      turnPage:'',
      leftShow:true,
    };
  },
  mounted() {
    if(window.location.href.includes('Home')){
      console.log("store", window.location.href,!this.$store.state.itstate,this.$store.state.isHome);
      this.$store.dispatch("aGetHome", true); //是否隐藏菜单标志
    }else{
      this.$store.dispatch("aGetHome", false); //是否隐藏菜单标志
    }
  },
  methods: {}
};
</script>
<style scoped>
.frame {
  background: url(../assets/images/main/bg.jpg);
  background-size: 100% 100%;
  min-height: 100vh;
}
.frameT {
  background: #fff;
  background-size: 100% 100%;
  min-height: 100vh;
}
.main {
  overflow: hidden !important;
  min-height: 91vh;
  padding: 8px 20px 20px;
}
</style>>
