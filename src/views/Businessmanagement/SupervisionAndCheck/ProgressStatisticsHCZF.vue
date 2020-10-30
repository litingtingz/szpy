<template>
  <div class="page">
    <Inquire 
		:cxData="cxData" 
		:facxData="facxData" 
		:pd="cx" 
		:cxPara="cx"
		@cxFnc="cxFnc" 
		@queryShowFnc="queryShowFnc"></Inquire>
		<div class="t-tab-top">
      <div class="tab-top-item hand" :class="pageState==1?'tabImgActive_1':'tabImg_1'" @click="tabTopClick(1)">
        分、县局
      </div>
      <div class="tab-top-item hand" :class="pageState==2?'tabImgActive_2':'tabImg_2'" @click="tabTopClick(2)">
        派出所
      </div>
    </div>
		<div class="page-box">
      <Table
        :clzt="pageState"
        :lbData="lbData"
        :isSelect="false"
        :isEdit="false"
        :isPagination="false"
        :plBtn="plBtn"
        :tableData="tableData"
        :refName="'hczfjdb'"
        :selection="selection"
        :clearSort="clearSort"
        :tableMerge="tableMerge"
        :expData="cx"
        :expUrl="$api.aport2+''"
        @plFnc="plFnc"
        @blFnc="blFnc"
        @SelectionChange="SelectionChange"
        @rowClick="rowClick"
        @rowDbClick="blFnc"
        @sortChange="sortChange"
        @transSaveFnc="transSaveFnc"
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
			cxData: this.$cdata.zxhc.jdtj.cx,
			facxData: this.$cdata.zxhc.jdtj.facx,//快速查询项
			//列表
      lbData: this.$cdata.zxhc.jdtj.lbFxj,
			plBtn: this.$store.state.plBtn,
			selection: [],
			//业务数据
			cx: {},
      cxQ:{},
      tableData: {
        list: [],
        total: 0,
			},
			pageState:1,
      clearSort:0,

      tableMerge:{},
		}
	},
	methods:{
		cxFnc(data) {
      this.cx = data;
      this.getTable(true);
    },
    rowspan(spanArr, position, spanName,firstName) {
      this.tableData.list.forEach((item, index) => {
        if (index === 0) {
          spanArr.push(1);
          position = 0;
        } else {
          if (this.tableData.list[index][spanName] === this.tableData.list[index - 1][spanName] && this.tableData.list[index][firstName] === this.tableData.list[index - 1][firstName] && this.tableData.list[index][firstName]) {
            spanArr[position] += 1;
            spanArr.push(0);
          } else {
            spanArr.push(1);
            position = index;
          }
        }
      });
    },
		//查询条件转换查询
    queryShowFnc(flag){
      if(!flag){//快速查询
        this.getTable(true,this.cxQ)
      }else{
        this.getTable(true)
      }
    },
		tabTopClick(val){
      this.pageState = val;
      if(val == 1){
        this.lbData = this.$cdata.zxhc.jdtj.lbFxj
      }else{
        this.lbData = this.$cdata.zxhc.jdtj.lbPcs
      }
      this.getTable(true);
		},
		//表格排序
		sortChange(data){
			this.cx.order = data.prop;
      this.cx.direction = data.direction
      this.getTable();
    },
    //简表数据 子组件通知父组件改表格数据
    transSaveFnc(data){
      this.lbData = data
    },
		// 查询用户列表
    getTable(flag,pdQ) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      this.tableMerge={};
			this.cx.type = this.pageState + '';
      this.$api.post(this.$api.aport2 + "/issueDataStatistics/getIssueDataStatisticsData", pdQ||this.cx, r => {
        this.tableData.list = r;
        this.tableMerge.xh = [];
        this.rowspan(this.tableMerge.xh, this.testPosition1,'xh','xh');
        this.tableMerge.ssfj = [];
        this.rowspan(this.tableMerge.ssfj, this.testPosition1,'ssfj','xh');
        // this.lbData.forEach((item)=>{
        //   this.tableMerge[item.dm] = [];
        //   this.rowspan(this.tableMerge[item.dm], this.testPosition1, item.dm,this.lbData[0].dm);
        // })
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