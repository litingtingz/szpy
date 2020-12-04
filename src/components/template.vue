<template>
  <div class="page">
    <Inquire 
		:cxData="cxData" 
		:facxData="facxData" 
		:pd="cx.pd" 
		:cxPara="cx"
		@cxFnc="cxFnc" 
		@queryShowFnc="queryShowFnc"
    @commandfnc="commandfnc"></Inquire>
		<div class="t-tab-top">
      <div class="tab-top-item hand" @click="tabTopClick(1)">
        <img :src="pageState==1?tabImgActive_1:tabImg_1" alt />
        <span>下发数据</span>
      </div>
      <div class="tab-top-item hand ml--33" @click="tabTopClick(2)">
        <img :src="pageState==2?tabImgActive_2:tabImg_2" alt />
        <span class="t-leftT">新增数据</span>
      </div>
    </div>
		<div class="page-box">
      <Table
        :clzt="pageState"
        :lbData="lbData"
        :isSelect="true"
        :lbBtn="lbBtn"
        :plBtn="plBtn"
        :tableData="tableData"
        :refName="'zxhc'"
        :selection="selection"
        :pageSizeArr="pageSizeArr"
        :czWidth="'130'"
        :clearSort="clearSort"
        :expData="cx"
        :expUrl="$api.aport2+''"
        @plFnc="plFnc"
        @pageSizeFnc="pageSizeFnc"
        @pageNumFnc="pageNumFnc"
        @blFnc="blFnc"
        @SelectionChange="SelectionChange"
        @rowClick="rowClick"
        @rowDbClick="blFnc"
        @sortChange="sortChange"
      ></Table>
    </div>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Table from "@/components/Table.vue";
// import Dialog from "@/components/Dialog.vue";
// import Form from "@/components/Form.vue";
export default {
	components: {
    Inquire,
    Table,
    // Dialog,
    // Form,
  },
	data(){
		return{
			tabImg_1: require("../../../assets/images/main/tab_2.png"),
      tabImgActive_1: require("../../../assets/images/main/tab_2_pre.png"),
      tabImg_2: require("../../../assets/images/main/tab_1.png"),
      tabImgActive_2: require("../../../assets/images/main/tab_1_pre.png"),
			//数据展示
			//查询项
			cxData: this.$cdata.zxhc.zxhcgl.cx,
			facxData: this.$cdata.zxhc.zxhcgl.facx,//快速查询项
			//列表
			lbData: this.$cdata.zxhc.zxhcgl.lb,
      lbBtn: this.$cdata.zxhc.zxhcgl.lbBtn,
			plBtn: this.$store.state.plBtn,
			pageSizeArr: [15, 100, 500],
			selection: [],
			//业务数据
			cx: {
        pd: {},
        pageSize: 15,
        pageNum: 1,
      },
      cxQ:{//快速查询
        pd: {
          jb : this.$store.state.user.jb,
          bmbh : this.$store.state.user.bmbh,
        },
        pageSize: 15,
        pageNum: 1,
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
			},
			pageState:1,
      clearSort:0,
		}
  },
  // directives: {
  //   drag: {
  //     // 指令的定义
  //     bind: (el) => {
  //       let odiv = el; //获取当前元素
  //       let left = "";
  //       let top = "";
  //       let leftImg = "";
  //       let topImg = "";
  //       el.onmousedown = e => {
  //         //算出鼠标相对元素的位置
  //         // console.log("el===", el, el.getElementsByTagName("img")[0]);
  //         let oImg = el.getElementsByTagName("img")[0];
  //         // console.log("oImg==", oImg);
  //         if (e.target.tagName == "IMG") {
  //           // oImg.style.position = "relative";
  //           console.log("onmousedown", oImg.offsetLeft);
  //           //算出鼠标相对元素的位置
  //           let disX = e.clientX - oImg.offsetLeft;
  //           let disY = e.clientY - oImg.offsetTop;

  //           // let off_left = oImg.offsetLeft;
  //           // let off_top = oImg.offsetTop;
  //           // console.log("img=",oImg, off_left);
  //           e.preventDefault();
  //           document.onmousemove = e => {
  //             // console.log("移动", e);
  //             //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
  //             // console.log("e.clientX", e.clientX);
  //             // console.log("disX", disX);
  //             // console.log("oImg.offsetLeft", oImg.offsetLeft);
  //             leftImg = e.clientX - disX - 40;
  //             topImg = e.clientY - disY - 40;
  //             // console.log('leftImg==',leftImg,e.clientX,disX)
  //             // leftImg = e.clientX - disX - off_left;
  //             // topImg = e.clientY - disY - off_top;

  //             // leftImg = e.clientX - disX - oImg.offsetLeft;
  //             // topImg = e.clientY - disY;
  //             //绑定元素位置到positionX和positionY上面
  //             //移动当前元素
  //             oImg.style.left = leftImg + "px";
  //             oImg.style.top = topImg + "px";
  //             oImg.style.right = "auto";
  //             oImg.style.bottom = "auto";
  //           };
  //           document.onmouseup = () => {
  //             document.onmousemove = null;
  //             document.onmouseup = null;
  //           };
  //         } else {
  //           let disX = e.clientX - odiv.offsetLeft;
  //           let disY = e.clientY - odiv.offsetTop;
  //           document.onmousemove = e => {
  //             //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
  //             left = e.clientX - disX;
  //             top = e.clientY - disY;
  //             //绑定元素位置到positionX和positionY上面
  //             //移动当前元素
  //             odiv.style.left = left + "px";
  //             odiv.style.top = top + "px";
  //             odiv.style.right = "auto";
  //             odiv.style.bottom = "auto";
  //           };
  //           document.onmouseup = () => {
  //             document.onmousemove = null;
  //             document.onmouseup = null;
  //           };
  //         }
  //       };
  //     }
  //   }
  // },
	methods:{
		cxFnc(data) {
      this.cx.pd = data;
      this.cx.pageNum = 1;
      this.getTable(true);
		},
		//查询条件转换查询
    queryShowFnc(flag){
      if(!flag){//快速查询
        this.getTable(true,this.cxQ)
      }else{
        this.getTable(true)
      }
    },
		//筛选条件 快速查询
    commandfnc(data){
      for(var key in data.obj){
        this.cxQ.pd[data.obj[key].dmx] = data.obj[key].dm;
      }
      this.getTable(true,this.cxQ)
		},
		tabTopClick(val){
			this.pageState = val;
			
		},
		// 获取分页等信息
    pageSizeFnc(data) {
      this.cx.pageSize = data;
      this.getTable();
    },
    pageNumFnc(data) {
      this.cx.pageNum = data;
      this.getTable();
		},
		//表格排序
		sortChange(data){
			this.cx.order = data.prop;
      this.cx.direction = data.direction
      this.getTable();
		},
		// 查询用户列表
    getTable(flag,pdQ) {
			if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
			this.cx.pd.jb = this.$store.state.user.jb;
      this.cx.pd.bmbh = this.$store.state.user.bmbh;
			this.cx.pd.clzt = this.pageState;
			this.cx.pd.cljg = '1';
      this.$api.post(this.$api.aport2 + "/issueData/getIssueDataPage", pdQ||this.cx, r => {
				this.tableData.list = r.list;
				this.tableData.total = r.total
      });
    },
		//批量按钮
		plFnc(){

		},
		//列表内按钮&&双击行
		blFnc(){},
		//表格复选框选择
		SelectionChange(){},
		//点击行
		rowClick(){

		},
	}
};
</script>
<style scoped>
</style>