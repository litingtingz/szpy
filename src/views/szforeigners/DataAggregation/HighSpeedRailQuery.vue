<template>
  <div class="page">
    <Inquire 
		:cxData="cxData" 
    :cxCheck="cxCheck"
    :cxButton="$cdata.sjhj.gtsjcx.cxButton"
		:facxData="facxData" 
		:pd="cx.pd" 
		:cxPara="cx"
		@cxFnc="cxFnc" 
    @lcFnc="lcFnc" 
    @cascaderFnc="cascaderFnc"
    @quickViewMult="quickViewMult"
    @quickView="quickView"
		@queryShowFnc="queryShowFnc"></Inquire>
		<div class="t-tab-top">
      <div class="tab-top-item tabImgActive_1 hand">高铁数据查询列表</div>
    </div>
		<div class="page-box" style="position:relative">
      <!-- <div class="link-box">
        <el-link size="mini" :type="'primary'" round @click="detailDia('lz')">临住信息{{'100'}}条</el-link>
        <el-link class="ml-10" size="mini" :type="'primary'" round @click="detailDia('cz')">常住信息{{'100'}}条</el-link>
      </div> -->
      <Table
        :lbData="lbData"
        :isEdit="false"
        :lbBtn="lbBtn"
        :plBtn="plBtn"
        :tableData="tableData"
        :refName="''"
        :selection="selection"
        :pageSizeArr="pageSizeArr"
        :clearSort="clearSort"
        :expData="cx"
        :expUrl="$api.aport2+''"
        @plFnc="plFnc"
        @pageSizeFnc="pageSizeFnc"
        @pageNumFnc="pageNumFnc"
        @blFnc="blFnc"
        @lbTextClickFnc="lbTextClickFnc"
        @SelectionChange="SelectionChange"
        @rowClick="rowClick"
        @rowDbClick="blFnc"
        @sortChange="sortChange"
        @transSaveFnc="transSaveFnc"
      ></Table>
    </div>
    <Dialog :width="'1300px'" 
      :top="'3vh'" :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <DetailTable 
      :key="timer"
      :dialogType="dialogType"
      :lbRow="lbRow"
      :pageRef="pageRef"
      @dialogSave="dialogSave"
      @dialogCancel="isShowDialog=false"></DetailTable>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import DetailTable from "./GTQueryDetail.vue"
// import Form from "@/components/Form.vue";
export default {
	components: {
    Inquire,
    Table,
    Dialog,
    DetailTable
    // Form,
  },
	data(){
		return{
			//数据展示
			//查询项
      cxData: this.$cdata.sjhj.gtsjcx.cx,
      cxCheck:this.$cdata.sjhj.gtsjcx.cxCheck,
			facxData: this.$cdata.sjhj.gtsjcx.facx,//快速查询项
			//列表
			lbData: this.$cdata.sjhj.gtsjcx.lb,
      lbBtn: this.$cdata.sjhj.gtsjcx.lbBtn,
			plBtn: this.$store.state.plBtn,
			pageSizeArr: [15, 100, 500],
			selection: [],
			//业务数据
			cx: {
        pd: {
          sfgl : '0',
          cfzmh: '0',
          ddzmh: '0',
          gtsz:[],
        },
        pageSize: 15,
        pageNum: 1,
      },
      gtszOld:[],
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
      timer:'',
      pageRef:'',
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      lbRow:{}
		}
  },
  mounted(){
    this.$store.dispatch("aGetDM", "qzzl");
    this.$store.dispatch("aGetDM", "xzqh");
    this.$store.dispatch('aGetDMPro', "dm_jwrysf");//身份
    this.$store.dispatch('aGetDMPro', "dm_jzztlx");//居住状态类型
    this.$store.dispatch('aGetDMPro', "dm_gzztlx");//工作状态类型
    this.$store.dispatch('aGetDMPro', "dm_spqfdb");//签发地
    this.$store.dispatch('aGetDMPro', "dm_bjjgkab");//入境口岸
    this.$store.dispatch('aGetDMPro', "dm_crjbs");//出入境状态
    this.$store.dispatch('aGetDMPro', "dm_pcswlb");//居住地所在派出所
    this.$store.dispatch("aGetDMPro",'dm_rydylbb');//人员地域类别
    this.$store.dispatch('aGetDM', "wgr_sqsy");//停留事由&&入境事由
    this.$store.dispatch("aGetNation");//国家地区&出生地
    this.$store.dispatch("aGetGender");//国家地区&出生地
    
    this.$store.dispatch("aGetBackstatus",'1')//走访反馈状态
    this.$cdata.aGetArea()
    this.$cdata.jzdZrq()
    this.getTable(true);
  },
	methods:{
		cxFnc(data) {
      this.cx.pd = data;
      this.cx.pageNum = 1;
      this.getTable(true);
    },
    //下拉框联动
    lcFnc(){},
		//查询条件转换查询
    queryShowFnc(flag){
      if(!flag&&this.facxData.length!=0){//快速查询
        this.getTable(true,this.cxQ)
      }else{
        this.getTable(true)
      }
    },
    cascaderFnc(data){
      // 是否与上次的类型相同
      let changeFlag = false
      let changeItem = []
      let checkArr = []
      if(this.gtszOld.length==0){
        this.cx.pd[data.key] = data.data
      }else{
        data.data.forEach((item)=>{
          if(item[0]!==this.gtszOld[0][0]){
            changeFlag = true;
            changeItem.push(item)
          }
        })
      }
      //一级菜单切换，确保单选
      if(changeFlag){
        this.cx.pd[data.key] = changeItem;
      }
      //给后台组值
      this.cx.pd[data.key].forEach((item)=>{
        this.cx.pd[item[1]] = item[0]
        checkArr.push(item[1])
      })
      if(!checkArr.includes('gt_is_station')){
        this.cx.pd.gt_is_station = ''
      }
      if(!checkArr.includes('gt_is_arrived')){
        this.cx.pd.gt_is_arrived = ''
      }
      this.gtszOld = this.cx.pd[data.key]
    },
    //查询条件 单选按钮
    quickView(data){
      this.cx.pd[data.item] = data.data
    },
    //查询条件多选按钮
    quickViewMult(data){
      if(!data.data.includes(data.key)){
        this.cxData.forEach((item) => {
          if(item.distype == data.key&&(Object.prototype.hasOwnProperty.call(this.cx.pd, item.dm))){
            this.cx.pd[item.dm] = undefined
          }
        });
      }
      if(data.data.length==1){
        if(data.data[0] == 'lz'){
          this.cx.pd.sfgl = '2'
        }else if(data.data[0] == 'cz'){
          this.cx.pd.sfgl = '1'
        }
      }else if(data.data.length == 2){
        this.cx.pd.sfgl = '3'
      }else{
        this.cx.pd.sfgl = '0'
      }
      this.getTable(true)
    },
    lbTextClickFnc(data){
      if(data.column.property == 'czcs'){
        this.pageRef = 'cz'
        this.dialogTitle = '常住信息'
        this.dialogType = 'cz'
        if(data.row.czcs == '0'){
          this.$message({
            message: '暂无数据！',
            duration: 8000,
            showClose: true,
            type: "warning"
          });
          return
        }
      }else{
        this.pageRef = 'lz'
        this.dialogTitle = '临住信息'
        this.dialogType = 'lz'
         if(data.row.lzcs == '0'){
          this.$message({
            message: '暂无数据！',
            duration: 8000,
            showClose: true,
            type: "warning"
          });
          return
        }
      }
      this.lbRow = Object.assign({},this.cx.pd,data.row)
      this.lbRow.gjdq = data.row.crj_nationality
      this.lbRow.zjhm = data.row.gt_passportno
      this.timer=new Date().getTime();
      this.isShowDialog = true;
    },
    //简表数据 子组件通知父组件改表格数据
    transSaveFnc(data){
      this.lbData = data
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
      this.$api.post(this.$api.aport4 + "/gtrg/GetCtxxCx", pdQ||this.cx, r => {
				this.tableData.list = r.list;
        this.tableData.total = r.total;
        this.tableData.pageSize = r.pageSize;
        this.tableData.pageNum = r.pageNum
      });
    },
		//批量按钮
		plFnc(data){
      this.dialogTitle = data.menu_name;
      this.dialogType = data.py;
		},
		//列表内按钮&&双击行
		blFnc(){
      // this.dialogType = data.btn.button_type;
      // this.dialogTitle = data.btn.button_name;
      // this.onlyId = data.data.personnel_id;
      // if(data.double){
      //   this.dialogType = 'edit',
      //   this.dialogTitle = '编辑'
      // }
      // if(this.dialogType == 'edit'){
      //   // this.jbxxdiaData = Object.assign({},data.data)//赋值基本信息
      //   // this.getJbxxPho();
      //   this.timer = new Date().getTime();
      //   this.isShowDialog = true;
      // }
    },
    getJbxxPho(){},
    editSave(data){
      let url='';
      if(data.editPage=='1'){
        url="/czry/updateCzRyxx"
      }else if(data.editPage=='2'){
        url="/czjzd/updateCzJzdxx"
      }else if(data.editPage=='3'){
        url="/czgzd/updateCzGzdxx"
      }
      this.$api.post(this.$api.aport4 + url,data.data,r=>{
        this.$message({
            message: r.message,
            duration: 8000,
            showClose: true,
            type: "success"
          });
          this.getTable();
          this.selection = [];
      })
    },
    dialogSave(data){
      if(data.type=='edit'){
        this.editSave(data)
        console.log('zhuye',data)
        // this.isShowDialog = false
      }
    },
		//表格复选框选择
		SelectionChange(){},
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