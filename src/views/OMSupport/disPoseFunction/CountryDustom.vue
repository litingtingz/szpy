<template>
  <div class="page">
    <Inquire 
		:cxData="cxData" 
		:facxData="facxData" 
		:pd="cx.pd" 
		:cxPara="cx"
		@cxFnc="cxFnc" 
		@queryShowFnc="queryShowFnc"></Inquire>
		<div class="t-tab-top">
      <div class="tab-top-item hand tabImgActive_1">自定义配置列表</div>
    </div>
		<div class="page-box">
      <el-row :gutter="20">
        <el-col :span="24">
          <Table
            lbType="gjlx"
            :page="page"
            :isTab="true"
            :lbTab="$cdata.pzgl.zdygj.lbTab"
            :lbData="lbData"
            :lbBtn="lbBtn"
            :plBtn="plBtn"
            :tableData="tableData"
            :refName="'zdygj'"
            :pageSizeArr="pageSizeArr"
            :clearSort="clearSort"
            :expData="cx"
            :expUrl="$api.aport2+''"
            @plFnc="plFnc"
            @pageSizeFnc="pageSizeFnc"
            @pageNumFnc="pageNumFnc"
            @blFnc="blFnc"
            @tabFnc="tabFnc"
            @SelectionChange="SelectionChange"
            @rowClick="rowClick"
            @rowDbClick="blFnc"
            @sortChange="sortChange"
          ></Table>
        </el-col>
        <el-col :span="24" v-if="gjCountShow">
          <Table
            lbType="gjCount"
            :lbData="$cdata.pzgl.zdygj.gjCount"
            :lbBtn="$cdata.pzgl.zdygj.gjCBtn"
            :isSelect="false"
            :isPl="false"
            :isEdit="false"
            :isSort="false"
            :tableData="tableData2"
            :isPagination="false"
            @rowClick="rowClick"
          ></Table>
        </el-col>
      </el-row>
    </div>
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <Form
        v-if="isShowDialog"
        :rulsName="'zdygj'"
        :cxData="labelData"
        :transData="$store.state.nationality"
        :dialogType="dialogType"
        :dialogData="dialogData"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
      ></Form>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import Form from "@/components/Form.vue";
export default {
	components: {
    Inquire,
    Table,
    Dialog,
    Form,
  },
	data(){
		return{
			//数据展示
			//查询项
			cxData: this.$cdata.pzgl.zdygj.cx,
			facxData: this.$cdata.pzgl.zdygj.facx,//快速查询项
			//列表
			lbData: this.$cdata.pzgl.zdygj.lb,
      lbBtn: this.$cdata.pzgl.zdygj.lbBtn,
			plBtn: this.$store.state.plBtn,
			pageSizeArr: [15, 100, 500],
			//业务数据
			cx: {
        pd: {},
        pageSize: 15,
        pageNum: 1,
      },
      cx_1:{
        pd: {},
        pageSize: 15,
        pageNum: 1,
      },
      cxQ:{//快速查询
        pd: {},
        pageSize: 15,
        pageNum: 1,
      },
      page:'1',
      gjCountShow:false,
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      tableData2:{list:[]},
      clearSort:0,

      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: this.$cdata.pzgl.zdygj.xjLabel,
		}
  },
  mounted(){
    this.$store.dispatch("aGetNation");
    this.getTable(true);
  },
	methods:{
		cxFnc(data) {
      this.cx.pd = data;
      this.cx.pageNum = 1;
      this.getTable(true);
    },
    tabFnc(data){
      this.page = data
      this.getTable()
    },
		//查询条件转换查询
    queryShowFnc(flag){
      if(!flag){//快速查询
        this.getTable(true,this.cxQ)
      }else{
        this.getTable(true)
      }
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
      this.cx.pd.sfyx = this.page
      this.$api.post(this.$api.aport4 + "/country/getCustomCountryType", pdQ||this.cx, r => {
				this.tableData.list = r.list;
				this.tableData.total = r.total
      });
    },
    getGjlxFun(id){
      this.cx_1.pd.uuid = id;
      this.$api.post(this.aport4 + '/country/getCustomCountry',this.cx_1,r=>{
        this.tableData2 = r
        this.gjCountShow = true
      })
    },
		//批量按钮
		plFnc(data){
      this.dialogType = data.py
      if(data.py == 'xj'){
        this.dialogData = {};
        this.isShowDialog = true;
      }
    },
    dialogSave(data){
      if(data.type == 'xj'){
        this.xjSave(data.data)
      }else if(data.type == 'edit'){
        this.editSave(data.data)
      }
    },
    xjSave(data){
      if(!data.countryList||data.countryList.length == 0){
        this.$message({
          message: '自定义项不能为空！',
          showClose: true,
          duration:13000,
          type: "warning"
        });
        return
      }
      this.$api.post(this.$api.aport4 + '/country/addCustomCountry',data,r=>{
        this.$message({
          message: r,
          showClose: true,
          duration:8000,
          type: "success"
        });
        this.getTable(true);
        this.isShowDialog = false;
      })
    },
    editSave(data){
      if(!data.countryList||data.countryList.length == 0){
        this.$message({
          message: '自定义项不能为空！',
          showClose: true,
          duration:13000,
          type: "warning"
        });
        return
      }
      this.$api.post(this.$api.aport4 + '/country/updateCustomCountryType',data,r=>{
        this.$message({
          message: r,
          showClose: true,
          duration:8000,
          type: "success"
        });
        this.getTable(true);
        this.isShowDialog = false;
      })
    },
		//列表内按钮&&双击行
		blFnc(data){
      this.dialogTitle = data.btn.button_name;
      this.dialogType = data.btn.button_type;
      if(data.btn.button_type == 'edit'){
        if(data.data.sfyx == '0'){//状态无效
          this.$message({
            message: '请先启用！',
            showClose: true,
            duration:13000,
          });
          return
        }else{
          this.labelData = this.$cdata.pzgl.zdygj.xjLabel;
          this.dialogData = data.data;
          this.$api.post(this.$api.aport4 + '/country/getCustomCountryDM',{uuid:data.data.uuid},r=>{
             this.$set(this.dialogData,'countryList',r)
             this.isShowDialog = true;
          })
        }
      }else if(data.btn.button_type == 'delete'){
        console.log('==')
      }else if(this.dialogType == 'ty' || this.dialogType == 'qy'){
        this.enableDisableFun(data.data)
      }
    },
    enableDisableFun(data){
      let p={
        uuid:data.uuid,
        sfyx:data.sfyx=='0'?'1':'0'
      }
      this.$api.post(this.$api.aport4 + '/country/enableDisable',p,r=>{
        this.$message({
          message: r,
          showClose: true,
          duration:8000,
          type: "success"
        });
        this.getTable(true)
      })
    },
		//表格复选框选择
		SelectionChange(){},
		//点击行
		rowClick(){
      // if(data.type == 'gjlx'){
      //   this.getGjlxFun(data.data.uuid)
      // }
		},
	}
};
</script>
<style scoped>

</style>