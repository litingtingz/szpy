<template>
  <div class="head">
    <div class="head-logo"></div>
    <div class="head-nav">
      <div
        class="head-nav-item"
        :class="{'head-nav-item-hover':active==nind}"
        v-for="(nn,nind) in $store.state.menu"
        :key="nind"
        @click="toLeftMenu(nn,nind)"
      >
        <img v-if="active==nind" :src="nn.menu_url?require('@/assets/images/menu/'+nn.menu_url+'_1_1.png'):require('@/assets/images/menu/ywgl_1_1.png')" />
        <img v-else :src="nn.menu_url?require('@/assets/images/menu/'+nn.menu_url+'_1.png'):require('@/assets/images/menu/ywgl_1.png')" />
        
        <!-- <img v-if="active==nind" :src="require('@/assets/images/menu/'+nn.menu_url+'_1_1.png')" />
        <img v-else :src="require('@/assets/images/menu/'+nn.menu_url+'_1.png')" /> -->

        <div class="ml-10">{{nn.menu_name}}</div>
      </div>
      <div class="user-box">
        <img class="user-tx mr-10" src="@/assets/images/main/tx.png" />
        <div class="user-msg">
          <div class="user-name">{{$store.state.user.xm}}</div>
          <div class="user-dd" :title="$store.state.user.xtyhbmmc">
            {{$store.state.user.xtyhbmmc}}
            <i class="el-icon-location"></i>
          </div>
        </div>
        <div class="user-logout" style="border-right:1px solid rgb(130, 124, 124);margin-left:15px" @click="$router.push({name:'Home'});$store.dispatch('aGetHttp',false)">
          <img src="@/assets/images/main/home.png" />
        </div>
        <div class="user-logout" @click="logout">
          <img src="@/assets/images/main/exit.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    headData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      msg: "我是头部",
      headMenu: [],
      active: "0"
    };
  },
  created() {
    this.getNav();
  },
  watch:{
    $route:{
      handler(val){
        console.log('route==',val)
        if(val.query.turn){
          for(var k=0;k<this.$store.state.menu.length;k++){
            for(var i=0;i<this.$store.state.menu[k].childrenMenu.length;i++){
              for(var j=0;j<this.$store.state.menu[k].childrenMenu[i].childrenMenu.length;j++){
                if(this.$store.state.menu[k].childrenMenu[i].childrenMenu[j].menu_url == val.query.turn){
                  this.active = k;
                  this.toLeftMenu(this.$store.state.menu[k],k,i,j,val.query);
                  // console.log('header',this.$store.state.menu[k],k,i,j)
                }
              }
            }
          }
        }
        if(val.name == 'Home'){
          this.$store.dispatch("aGetHome", true); //是否隐藏菜单标志
          this.active = "5"
        }else{
          this.$store.dispatch("aGetHome", false); //是否隐藏菜单标志
        }
        // else{
        //   this.$store.state.menu.forEach((ktem,k) => {
        //     ktem.childrenMenu.forEach((item,i) => {
        //       item.childrenMenu.forEach((jtem,j) => {
        //         if(jtem.menu_url == val.name){
        //           // console.log('val.name=',jtem.menu_url,val.name)
        //           this.active = k
        //           this.toLeftMenu(ktem,k,i,j,val.query);
        //         }
        //       })
        //     })
        //   });
        // }
      },
      deep:true,
      immediate: true
    }
  },
  methods: {
    getNav() {
      // if(this.$route.name == 'Frame'){
      //   this.toLeftMenu(this.$store.state.menu[0], 0);
      // }
      if(this.$route.name == 'Home' || this.$store.state.isFirst){
        this.$router.push({ name: "Home" });
        this.active = '5'
        this.$store.dispatch("aGetFirst", false); //是否首次登陆
      }else{
        this.toLeftMenu(this.$store.state.menu[0], 0);
      }
    },
    toLeftMenu(item, index ,active1,active2,query) {
      console.log(1, item,index);
      this.active = index;
      this.$store.commit("getLeftMenu", item.childrenMenu);
      this.$store.commit("getMenuTo",{active1:active1,active2:active2,query:query})
      this.$store.dispatch("aGetHome", false); //是否隐藏菜单标志
    },
    logout() {
      let url = this.$store.state.aurl;
      window.sessionStorage.clear();
      this.$store.state.user = {};
      this.$store.state.menu = [];
      this.$store.state.token = "";
      this.$store.state.leftMenu = [];
      this.$store.state.itstate = false;
      if (url) {
        window.location.href = url.replace(/login\?/, "logout?");
      } else {
        this.$router.push({ name: "Login" });
        // location.reload();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head {
  height: 69px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px solid #295287;
}
.head-logo {
  margin-left: 14px;
  width: 516px;
  height: 46px;
  background: url(../assets/images/main/title_1.png);
}
.head-nav {
  /* width: 905px; */
  height: 100%;
  display: flex;
  align-items: center;
}
.head-nav-item {
  color: #8c9eb5;
  height: 100%;
  font-size: 15px;
  display: flex;
  align-items: center;
  background: #1c3f6c;
  border-radius: 40px 0 0 40px;
  padding: 0 40px 0 20px;
  margin-left: -30px;
  cursor: pointer;
}
.head-nav-item:hover,
.head-nav-item-hover {
  color: #ffffff;
  background: #173356;
}
.user-box {
  background: #1c3f6c;
  height: 100%;
  display: flex;
  align-items: center;
  color: #ffffff;
  margin-left: 2px;
  padding-left: 15px;
}
.user-name {
  font-size: 18px;
}
.user-dd {
  font-size: 14px;
  color: #9fb8fb;
  max-width: 230px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.user-logout {
  height: 100%;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 22, 49, 0.4);
  /* margin-left: 15px; */
}
</style>
