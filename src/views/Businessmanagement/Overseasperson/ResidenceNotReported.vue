<template>
  <div class="page">
    <Inquire 
    :cxData="$cdata.zxhc.wblztx.cx" 
    :pd="cx.pd" 
    :cxPara="cx" 
    @cxFnc="cxFnc" 
    @lcFnc="lcFnc"></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item tabImgActive_1 hand">未报临住提醒列表</div>
    </div>
    <div class="page-box">
      <el-row :gutter="20">
        <el-col :span="24">
          <Table
            :lbData="lbData"
            :isSelect="false"
            :plBtn="$store.state.plBtn"
            :tableData="tableData"
            :clearSort="clearSort"
            :expData="cx"
            :expUrl="$api.aport2+'/wblztx/exportWblztxData'"
            @rowClick="rowClick"
            @pageSizeFnc="pageSizeFnc"
            @pageNumFnc="pageNumFnc"
            @plFnc="plFnc"
            @blFnc="blFnc"
            @sortChange="sortChange"
            @transSaveFnc="transSaveFnc"
          ></Table>
        </el-col>
      </el-row>
    </div>
    <!-- 弹窗 -->
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <Form
        :cxData="labelData"
        :dialogType="dialogType"
        :dialogData="dialogData"
        :labelWidth="'107px'"
        :rulsName="'wblztx'"
        ref="wblzForm"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
        @formLcFnc="lcFnc"
      ></Form>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import Form from "@/components/FormRule.vue";
// import Trans from "@/components/Transfer.vue"

export default {
  components: { Inquire, Table, Dialog, Form},
  data() {
    return {
      cx: {
        pd: {},
        pageSize: 10,
        pageNum: 1,
        user:this.$store.state.user
      },
      lbData:this.$cdata.zxhc.wblztx.lb,
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      currentRow: {},
      clearSort:0,
      // 弹窗数据,
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: [],
    };
  },
  mounted() {
    this.getSpInit();
  },
  methods: {
    // 单位信息
    getSpInit(){
      this.$cdata.qxgl.getSjBm(this.$store.state.user.bmbh).then(data => {
        this.$store.dispatch("aGetssdw", {
          bmbh: "320500000000",
          type: "ssfj"
        });
        if (this.$store.state.user.jb == 2) {
          if(data.fj){
            this.cx.pd.suboffice = data.fj
          }else{
            this.cx.pd.suboffice = data.bmbh
          }
          this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "sspcs" });
          this.cx.pd.subofficedis = true;
        } else if (this.$store.state.user.jb == 3) {
          this.$store.dispatch("aGetssdw", { bmbh: data.fj, type: "sspcs" });
          this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "zrq" });
          this.cx.pd.suboffice = data.fj;
          this.cx.pd.policestation = data.bmbh;
          this.cx.pd.subofficedis = true;
          this.cx.pd.policestationdis = true;
        }
      });
    },
    //简表数据 子组件通知父组件改表格数据
    transSaveFnc(data){
      this.lbData = data
    },
    // 获取查询参数
    cxFnc(data) {
      this.cx.pd = data;
      this.getTable(true);
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
    sortChange(data){
      this.cx.order = data.prop;
      this.cx.direction = data.direction;
      this.getTable();
    },
    // 查询列表
    getTable(flag) {
      if(flag){
        this.clearSort = new Date().getTime();
        delete this.cx.order;
        delete this.cx.direction 
      }
      this.$api.post(this.$api.aport2 + "/wblztx/getWblztxPage", this.cx, r => {
        this.tableData = r;
      });
    },
    // 点击表格行
    rowClick(data) {
      this.currentRow = data.data;
    },
    lcFnc(data) {
      if (data.key.dm == "suboffice") {
        if (data.data == "") {
          data.obj.policestation = "";
        }
        if (data.obj.policestation) {
          data.obj.policestation = "";
        }
        this.$store.dispatch("aGetssdw", { bmbh: data.data, type: "sspcs" });
      }
    },
    // 批量操作
    plFnc(data) {
      this.dialogTitle = data.menu_name;
      this.dialogType = data.py;
      if (data.py == "xz") {
        this.labelData = this.$cdata.zxhc.wblztx.xzDia;
        this.dialogData = {};
        this.$cdata.qxgl.getSjBm(this.$store.state.user.bmbh).then(data => {
          this.$store.dispatch("aGetssdw", {
            bmbh: "320500000000",
            type: "ssfj"
          });
          if (this.$store.state.user.jb == 2) {
            if(data.fj){
              this.dialogData.suboffice = data.fj
            }else{
              this.dialogData.suboffice = data.bmbh
            }
            this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "sspcs" });
            this.dialogData.subofficedis = true;
          } else if (this.$store.state.user.jb == 3) {
            this.$store.dispatch("aGetssdw", { bmbh: data.fj, type: "sspcs" });
            this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "zrq" });
            this.dialogData.suboffice = data.fj;
            this.dialogData.policestation = data.bmbh;
            this.dialogData.subofficedis = true;
            this.dialogData.policestationdis = true;
          }
        });
        this.isShowDialog = true;
        this.$refs.wblzForm.clearValid();
      }
    },
    // 表格内操作
    blFnc() {},
    dialogSave(data) {
      if (data.type == "xz") {
        this.xzSave(data.data);
      }
    },
    xzSave(data) {
      let p=data;
      p.userId = this.$store.state.user.userId
      p.bmbh = this.$store.state.user.bmbh
      this.$api.post(this.$api.aport2 + "/wblztx/addWblztxData", p, r => {
        this.$message({
          message: r,
          showClose: true,
          duration:8000,
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
      });
    },
  }
};
</script>