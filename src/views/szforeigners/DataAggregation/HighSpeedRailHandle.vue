<template>
  <div class="page">
    <Inquire
		:cxData="cxData" 
    :cxShow="cxShow"
    :tabCInq="tabCInq"
    :cxCheck="cxCheck"
		:facxData="facxData" 
		:pd="cx.pd" 
		:cxPara="cx"
		@cxFnc="cxFnc" 
    @lcFnc="lcFnc" 
		@queryShowFnc="queryShowFnc"></Inquire>
		<div class="t-tab-top">
      <div class="tab-top-item tabImgActive_1 hand">高铁数据人工处理列表</div>
    </div>
		<div class="page-box">
      <!-- <div class="link-box">
        <el-link size="mini" :type="'primary'" round @click="detailDia('lz')">待办总数{{'100'}}条</el-link>
      </div> -->
      <Table
        :lbData="lbData"
        :page="tabPage"
        :isSelect="isSelect"
        :isTab="true"
        :isOther="isOther"
        :SDbCount="SDbCount"
        :isEdit="isEdit"
        :lbTab="lbTab"
        :lbBtn="lbBtn"
        :plBtn="plBtn"
        :tableData="tableData"
        :refName="''"
        :selection="selection"
        :pageSizeArr="pageSizeArr"
        :clearSort="clearSort"
        :expData="cx"
        :expUrl="$api.aport2+''"
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
      :cxData="$cdata.sjhj.gtsjrgcl.jsDia"
      :dialogData="dialogData"
       @dialogCancel="isShowDialog=false"
       @dialogSave="dialogSave"></Form>
      <DetailTable 
      v-else
      :key="timer"
      :dialogType="dialogType"
      :cxData="$cdata.sjhj.gtsjrgcl.clDia"
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
import DetailTable from "./GTHandleDetail.vue"
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
      cxData: [],
      cxCheck:this.$cdata.sjhj.gtsjrgcl.cxCheck,
      facxData: this.$cdata.sjhj.gtsjrgcl.facx,//快速查询项
      cxShow:true,//默认收起
      tabCInq:true,
      timeRange:0,
      isCxBtn:false,
      //列表
      tabPage:'0',
      isOther:true,
      isSelect:false,
      isEdit:false,//tab控制列表操作项
      lbTab:this.$cdata.sjhj.gtsjrgcl.lbTab,
			lbData: this.$cdata.sjhj.gtsjrgcl.lb1,
      lbBtn: this.$cdata.sjhj.gtsjrgcl.lbBtn,
      plBtn: this.$store.state.plBtn,
      SDbCount:0,
			pageSizeArr: [15, 100, 500],
      selection: [],
      multipleSelection:[],
      multipleArr:[],
			//业务数据
			cx: {
        pd: {},
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
    
    this.$store.dispatch("aGetDM", "xzqh");
    this.$store.dispatch('aGetDMPro', "dm_jwrysf");//身份
    this.$store.dispatch('aGetDMPro', "dm_jzztlx");//居住状态类型
    this.$store.dispatch('aGetDMPro', "dm_gzztlx");//工作状态类型
    this.$store.dispatch('aGetDMPro', "dm_spqfdb");//签发地
    this.$store.dispatch('aGetDMPro', "dm_bjjgkab");//入境口岸
    this.$store.dispatch('aGetDMPro', "dm_crjbs");//出入境状态
    this.$store.dispatch('aGetDMPro', "dm_pcswlb");//居住地所在派出所
    this.$store.dispatch('aGetDM', "wgr_sqsy");//停留事由&&入境事由

    this.$store.dispatch("aGetNation");//国家地区&出生地
    this.$store.dispatch("aGetGender");//性别
    this.$store.dispatch("aGetDMPro",'dm_rydylbb');//人员地域类别
    this.$store.dispatch("aGetDMPro",'dm_zyb');//职业
    this.$store.dispatch("aGetDM", "qzzl");
    this.$store.dispatch("aGetPassport");//性别
    this.$store.dispatch('aGetDM', "bjjgka");//
    

    this.$store.dispatch("aGetBackstatus",'1')//走访反馈状态
    this.$cdata.aGetArea()
    this.$cdata.jzdZrq()
    this.plBtn = this.plBtn.filter(item => ['cl'].indexOf(item.py) == -1);
    this.getDbCount();
    this.getTable(true);
  },
	methods:{
    getDbCount(){
      this.$api.post(this.$api.aport4+'/gtrg/getBbCount',{},r=>{
        this.SDbCount=r;
      })
    },
		cxFnc(data) {//只有已处理有查询按钮
      this.cx.pd = data;
      this.cx.pageNum = 1;
      this.getTable(true,true);
    },
    tabFnc(data) {
      this.tabPage = data;
      this.plBtn = this.$store.state.plBtn
      if(this.tabPage == '2'){
        this.cxData = this.$cdata.sjhj.gtsjrgcl.cx
        this.tabCInq = false
        this.isEdit = false;
        this.isOther = false;
        this.isSelect = false;
        this.lbData = this.$cdata.sjhj.gtsjrgcl.lb3
        this.plBtn = this.plBtn.filter(item => ['cl','js'].indexOf(item.py) == -1);
      }else if(this.tabPage == '1'){
        this.cxData = [];
        this.tabCInq = true;
        this.isEdit = true;
        this.isOther = false;
        this.isSelect = true;
        this.lbData = this.$cdata.sjhj.gtsjrgcl.lb1
        this.plBtn = this.plBtn.filter(item => ['js'].indexOf(item.py) == -1);
      }else{
        this.cxData = [];
        this.isEdit = false;
        this.tabCInq = true;
        this.isOther = true;
        this.isSelect = false;
        this.lbData = this.$cdata.sjhj.gtsjrgcl.lb1
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
    //接收
    // recieveFnc(){
    //   this.dialogTitle = '接收条数'
    //   this.dialogType = 'jsts'
    //   this.isShowDialog = true
    // },
    //下拉框联动
    lcFnc(data){
      if(data.key.dm == "inhabi_police_station"){
        // if(data.data == ""){
        //   this.$cdata.options.turnoutarea = [];
        //   data.obj.turnoutarea = '';
        // }else{
          this.$cdata.JoinZrq(data.data).then((data) =>{
            this.$store.state.turnoutarea = data
          })
        // }
      }
    },
		//查询条件转换查询
    queryShowFnc(flag){
      if(!flag&&this.facxData.length!=0){//快速查询
        this.getTable(true,false,this.cxQ)
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
      this.getTable(true,this.isCxBtn);
    },
    pageNumFnc(data) {
      this.cx.pageNum = data;
      this.getTable(true,this.isCxBtn);
		},
		//表格排序
		sortChange(data){
			this.cx.order = data.prop;
      this.cx.direction = data.direction
      this.getTable(false,this.isCxBtn);
		},
		// 查询列表数据
    getTable(flag,cbtn,pdQ) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      let url = ''
      if(!cbtn){//点击tab页请求
        this.isCxBtn = false
        this.cx.pd={
          db:this.tabPage,
          jsrybh:this.tabPage=='1'?this.$store.state.user.userId:''
        }
        url='/gtrg/getGtDBList'
      }else{//已处理点击查询按钮
        this.isCxBtn = true
        url='/gtrg/GetCxYcl'
      }
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
      this.$api.post(this.$api.aport4+'/gtrg/getGtxx',{gtwyid:this.multipleArr[this.diaPage]},r=>{
        this.dialogData = r;
        this.timer = new Date().getTime();
        if(this.diaPage > this.multipleArr.length-1){
          this.isShowDialog = false;
          this.getTable(true)
          this.diaPage=0;
        }
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
        if(this.multipleSelection.length==0){
          this.$message({
            message: "请先选择数据！",
            duration:13000,
            showClose: true,
            type: "warning"
          });
          return false;
        }
        this.$api.post(this.$api.aport4+'/gtrg/getGtxx',{gtwyid:this.multipleArr[0]},r=>{
          this.dialogData = r;
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
        this.$api.post(this.$api.aport4+'/gtrg/getGtxx',{gtwyid:data.data.gtwyid},r=>{
          this.dialogData = r;
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
      this.$api.post(this.$api.aport4 + '/gtrg/JsDbxx',p,r=>{
        this.$message({
          message: r.message,
          duration:8000,
          showClose: true,
          type: "success"
        });
        this.isShowDialog = false;
        this.getTable(true);
        this.getDbCount();
      })
    },
		//表格复选框选择
		SelectionChange(data){
      this.multipleSelection = data;
      this.multipleArr = [];
      this.multipleSelection.forEach((item)=>{
        this.multipleArr=this.multipleArr.concat([item.gtwyid])
      })
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