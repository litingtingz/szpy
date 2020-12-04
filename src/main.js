import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import '../theme/index.css'
import router from './router'
import store from './store'
import api from './api/index.js'
import http from './request/api.js'
import fnc from './base/fnc.js'
import cdata from './base/cdata.js'
import echarts from "echarts";
import vcolorpicker from 'vcolorpicker'
import './assets/icon/iconfont.css'
import './assets/icon/iconfont.js'

Vue.config.productionTip = false
document.title = "苏州市公安局·涉外综合分析研判系统"
Vue.prototype.$api = api
Vue.prototype.$http = http
Vue.prototype.$fnc = fnc
Vue.prototype.$cdata = cdata
Vue.prototype.$echarts = echarts;
Vue.use(vcolorpicker)
var bv = fnc.getBroswerAndVersion()
console.log(bv)
// console.log("navigator", fnc.getBroswerAndVersion(), fnc.getBroswerAndVersion().indexOf('Chrome'), bv.substring(6))
// if (bv.indexOf('Chrome') < 0) {
//   window.location.href = "#/OtherPage"
// }
// else if (parseInt(bv.substring(6)) < 79) {
//   window.location.href = "#/OtherPage"

// }
Vue.directive('drag',{
  bind:(el) => {
    let odiv = el; //获取当前元素
    let left = "";
    let top = "";
    let leftImg = "";
    let topImg = "";
    el.onmousedown = e => {
      //算出鼠标相对元素的位置
      // console.log("el===", el, el.getElementsByTagName("img")[0]);
      let oImg = el.getElementsByTagName("img")[0];
      // console.log("oImg==", oImg);
      if (e.target.tagName == "IMG") {
        // oImg.style.position = "relative";
        console.log("onmousedown", oImg.offsetLeft);
        //算出鼠标相对元素的位置
        let disX = e.clientX - oImg.offsetLeft;
        let disY = e.clientY - oImg.offsetTop;

        // let off_left = oImg.offsetLeft;
        // let off_top = oImg.offsetTop;
        // console.log("img=",oImg, off_left);
        e.preventDefault();
        document.onmousemove = e => {
          // console.log("移动", e);
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          // console.log("e.clientX", e.clientX);
          // console.log("disX", disX);
          // console.log("oImg.offsetLeft", oImg.offsetLeft);
          leftImg = e.clientX - disX - 40;
          topImg = e.clientY - disY - 40;
          // console.log('leftImg==',leftImg,e.clientX,disX)
          // leftImg = e.clientX - disX - off_left;
          // topImg = e.clientY - disY - off_top;

          // leftImg = e.clientX - disX - oImg.offsetLeft;
          // topImg = e.clientY - disY;
          //绑定元素位置到positionX和positionY上面
          //移动当前元素
          oImg.style.left = leftImg + "px";
          oImg.style.top = topImg + "px";
          oImg.style.right = "auto";
          oImg.style.bottom = "auto";
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      } else {
        let disX = e.clientX - odiv.offsetLeft;
        let disY = e.clientY - odiv.offsetTop;
        document.onmousemove = e => {
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          left = e.clientX - disX;
          top = e.clientY - disY;
          //绑定元素位置到positionX和positionY上面
          //移动当前元素
          odiv.style.left = left + "px";
          odiv.style.top = top + "px";
          odiv.style.right = "auto";
          odiv.style.bottom = "auto";
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    };
  }
})
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
