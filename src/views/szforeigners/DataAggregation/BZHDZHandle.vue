<template>
  <div class="page">
    <Inquire
		:cxData="cxData" 
    :cxShow="cxShow"
    :cxCheck="cxCheck"
		:facxData="facxData" 
		:pd="cx.pd" 
		:cxPara="cx"
		@cxFnc="cxFnc" 
    @lcFnc="lcFnc" 
		@queryShowFnc="queryShowFnc"></Inquire>
		<div class="t-tab-top">
      <div class="tab-top-item tabImgActive_1 hand">标准化地址人工处理列表</div>
    </div>
		<div class="page-box">
      <Table
        :lbData="lbData"
        :page="tabPage"
        :isSelect="isSelect"
        :isTab="true"
        :isOther="isOther"
        :SDbCount="SDbCount"
        :ColIsShow="ColIsShow"
        :isEdit="isEdit"
        :lbTab="lbTab"
        :lbBtn="lbBtn"
        :plBtn="plBtn"
        :tableData="tableData"
        :selection="selection"
        :clearSort="clearSort"
        :expData="cx"
        :expUrl="$api.aport4+'/bzhdz/exportBzhdzData'"
        @tabFnc="tabFnc"
        @plFnc="plFnc"
        @pageSizeFnc="pageSizeFnc"
        @pageNumFnc="pageNumFnc"
        @blFnc="blFnc"
        @SelectionChange="SelectionChange"
        @rowClick="rowClick"
        @rowDbClick="blFnc"
        @sortChange="sortChange"
        @transSaveFnc="transSaveFnc"
      ></Table>
    </div>
    <Dialog :width="dialogType=='detail'||dialogType=='cl'||dialogType=='ck'?'1300px':'1000px'" 
      :top="dialogType=='detail'||dialogType=='cl'||dialogType=='ck'?'3vh':'15vh'" :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <Form
      v-if="dialogType=='js'"
      :dialogType="dialogType"
      :cxData="$cdata.sjhj.bzhdzcl.jsDia"
      :dialogData="dialogData"
       @dialogCancel="isShowDialog=false"
       @dialogSave="dialogSave"></Form>
      <DetailTable 
      v-else
      :key="timer"
      :dialogType="dialogType"
      :cxData="$cdata.sjhj.bzhdzcl.clDia"
      :dialogData="dialogData"
      :multipleArr="multipleArr"
      :pageRef="pageRef"
      :page="tabPage"
      @joinBtnFnc="joinBtnFnc"
      @dialogSave="dialogSave"
      @dialogHandleCancel="dialogHandleCancel"
      @clHandle="clHandle"
      @dialogCancel="isShowDialog=false"></DetailTable>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import DetailTable from "./BZHDZHandleDetail.vue"
import Form from "@/components/Form.vue";
export default {
	components: {
    Inquire,
    Table,
    Dialog,
    DetailTable,
    Form,
  },
	data(){
		return{
			//数据展示
			//查询项
      cxData:this.$cdata.sjhj.bzhdzcl.cxa,
      cxCheck:this.$cdata.sjhj.bzhdzcl.cxCheck,
      facxData: this.$cdata.sjhj.bzhdzcl.facx,//快速查询项
      cxShow:true,//默认收起
      timeRange:0,

      //列表
      tabPage:'0',
      isOther:false,
      isSelect:false,
      ColIsShow:false,
      isEdit:false,//tab控制列表操作项
      lbTab:this.$cdata.sjhj.bzhdzcl.lbTab,
			lbData: this.$cdata.sjhj.bzhdzcl.lb,
      lbBtn: this.$cdata.sjhj.bzhdzcl.lbBtn,
      plBtn: this.$store.state.plBtn,
      SDbCount:0,
      selection: [],
      multipleArr:[],
			//业务数据
			cx: {
        pd: {
          received_personnel:this.$store.state.user.xm,
          received_number:this.$store.state.user.userId,
          receiver:this.$store.state.user.bmbh,
          jb:this.$store.state.user.jb
        },
        pageSize: 15,
        pageNum: 1,
      },
      cxQ:{//快速查询
        pd: {},
        pageSize: 15,
        pageNum: 1,
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
			},
      clearSort:0,
      //弹窗数据
      dialogData:{},
      diaPage:0,
      timer:'',
      pageRef:'',
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
		}
  },
  mounted(){
    this.$store.dispatch("aGetNation");//国家地区&出生地
    this.$store.dispatch("aGetDM", "qzzl");
    this.$cdata.aGetArea()
    this.$cdata.jzdZrq()
    this.plBtn = this.plBtn.filter(item => ['cl'].indexOf(item.py) == -1);
    // this.getDbCount();
    this.getTable(true);
    this.getSpInit();
  },
  watch:{
    $route:{
      handler(val){
        if(val.query.turn == 'HighSpeedRailHandle'){
          this.$nextTick(()=>{
            this.tabFnc(val.query.page)
          })
        }
      },
      deep:true,
      immediate: true
    }
  },
	methods:{
    // getDbCount(){
    //   this.$api.post(this.$api.aport4+'/gtrg/getBbCount',{},r=>{
    //     this.SDbCount=r;
    //   })
    // },
    getSpInit(){
      this.$cdata.qxgl.getSjBm(this.$store.state.user.bmbh).then(data => {
        this.$store.dispatch("aGetssdw", {
          bmbh: "320500000000",
          type: "ssfj"
        });
        if (this.$store.state.user.jb == 2) {
          this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "sspcs" });
        } else if (this.$store.state.user.jb == 3) {
          this.$store.dispatch("aGetssdw", { bmbh: data.fj, type: "sspcs" });
        }
      });
    },
		cxFnc(data) {//只有已处理有查询按钮
      this.cx.pd = data;
      this.cx.pageNum = 1;
      this.getTable(true);
    },
    tabFnc(data) {
      this.tabPage = data;
      this.plBtn = this.$store.state.plBtn
      if(this.tabPage == '2' || this.tabPage == '3'){//已完成&&未标准化
        this.cxData = this.$cdata.sjhj.bzhdzcl.cxb
        this.isEdit = false;
        this.isOther = false;
        this.isSelect = false;
        this.ColIsShow = true;
        this.plBtn = this.plBtn.filter(item => ['cl','js'].indexOf(item.py) == -1);
      }else if(this.tabPage == '1'){//已接收
        this.cxData = this.$cdata.sjhj.bzhdzcl.cxa;
        this.isEdit = true;
        this.isOther = false;
        this.isSelect = true;
        this.ColIsShow = false;
        this.plBtn = this.plBtn.filter(item => ['js'].indexOf(item.py) == -1);
      }else{
        this.cxData = this.$cdata.sjhj.bzhdzcl.cxa;
        this.isEdit = false;
        this.isOther = false;
        this.isSelect = false;
        this.ColIsShow = false;
        this.plBtn = this.plBtn.filter(item => ['cl'].indexOf(item.py) == -1);
      }
      this.cx.pageNum = 1;
      this.cx.pageSize = 10;
      this.getTable(true);
    },
    //证件号码核查
    joinBtnFnc(data){
      console.log('data==',data)
    },
    //下拉框联动
    lcFnc(data){
      if(data.key.dm == "inhabi_police_station"){
        this.$cdata.JoinZrq(data.data).then((data) =>{
          this.$store.state.turnoutarea = data
        })
      }
    },
		//查询条件转换查询
    queryShowFnc(flag){
      if(!flag&&this.facxData.length!=0){//快速查询
        this.getTable(true,this.cxQ)
      }else{
        this.getTable(true)
      }
    },
    //简表数据 子组件通知父组件改表格数据
    transSaveFnc(data){
      this.lbData = data
    },
		// 获取分页等信息
    pageSizeFnc(data) {
      this.cx.pageSize = data;
      this.getTable(true);
    },
    pageNumFnc(data) {
      this.cx.pageNum = data;
      this.getTable(true);
		},
		//表格排序
		sortChange(data){
			this.cx.order = data.prop;
      this.cx.direction = data.direction
      this.getTable(false);
		},
		// 查询列表数据
    getTable(flag,pdQ) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      let url = '/bzhdz/getBzhdzList'
      this.cx.pd.db = this.tabPage
      delete this.cx.pd.source;
      delete this.cx.pd.source_uuid;
      this.$api.post(this.$api.aport4 + url, pdQ||this.cx, r => {
				this.tableData = r;
      });
    },
    dialogHandleCancel(){
      this.isShowDialog = false;
      this.getTable(true)
    },
    //批量处理 入库&无效
    clHandle(){
      this.diaPage++;
      if(this.diaPage > this.multipleArr.length-1){
        this.isShowDialog = false;
        this.getTable(true)
        this.diaPage=0;
        return
      }
      this.cx.pd.source=this.multipleArr[this.diaPage].source;
      this.cx.pd.source_uuid=this.multipleArr[this.diaPage].source_uuid;
      this.$api.post(this.$api.aport4+'/bzhdz/getBzhdzList',this.cx,r=>{
        this.dialogData = r.list[0];
        this.timer = new Date().getTime();
        
      })
    },
		//批量按钮
		plFnc(data){
      this.dialogTitle = data.menu_name;
      this.dialogType = data.py;
      if(data.py == 'js'){
        this.dialogData={};
        this.isShowDialog = true
      }else if(data.py == 'cl'){
        if(this.multipleArr.length==0){
          this.$message({
            message: "请先选择数据！",
            duration:13000,
            showClose: true,
            type: "warning"
          });
          return false;
        }
        this.cx.pd.source=this.multipleArr[0].source;
        this.cx.pd.source_uuid=this.multipleArr[0].source_uuid;
        this.$api.post(this.$api.aport4+'/bzhdz/getBzhdzList',this.cx,r=>{
          this.dialogData = r.list[0];
          this.timer = new Date().getTime();
          this.isShowDialog = true;
        })
      }
		},
		//列表内按钮&&双击行
		blFnc(data){
      this.dialogType = data.btn.button_type;
      this.dialogTitle = data.btn.button_name;
      if(data.double){
        if(this.tabPage == '2'){//已处理 展示详情
          this.dialogType = 'ck'
          this.dialogTitle = '详情'
        }else if(this.tabPage == '0'){//未接收 双击不开弹窗
          this.dialogType = ''
        }else{
          this.dialogType = 'detail'
          this.dialogTitle = '详情'
        }
      }
      if(this.dialogType == 'detail'||this.dialogType == 'ck'){
        this.cx.pd.source=data.data.source;
        this.cx.pd.source_uuid=data.data.source_uuid
        this.$api.post(this.$api.aport4+'/bzhdz/getBzhdzList',this.cx,r=>{
          this.dialogData = r.list[0];
          this.timer = new Date().getTime();
          this.isShowDialog = true;
        })
      }
    },
    dialogSave(data){
      if(data.type=='js'){
        this.recieveSave(data)
      }
    },
    //接收保存
    recieveSave(data){
      let p=data.data
      p.received_personnel = this.$store.state.user.xm
      p.received_number = this.$store.state.user.userId
      p.receiver = this.$store.state.user.bmbh
      this.$api.post(this.$api.aport4 + '/bzhdz/JsDbxx',p,r=>{
        this.$message({
          message: r.message,
          duration:8000,
          showClose: true,
          type: "success"
        });
        this.isShowDialog = false;
        this.getTable(true);
        // this.getDbCount();
      })
    },
		//表格复选框选择
		SelectionChange(data){
      this.multipleArr = data;
    },
		//点击行
		rowClick(data){
      this.selection = [];
      this.selection.push(data.data);
		},
	}
};
</script>
<style scoped>
</style>