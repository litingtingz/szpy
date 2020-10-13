<template>
  <div class="page">
    <Inquire
      :cxData="cxData"
      :facxData="facxData"
      :pd="cx.pd"
      :cxPara="cx"
      @cxFnc="cxFnc"
      @lcFnc="lcFnc"
      @queryShowFnc="queryShowFnc"
    ></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item tabImgActive_1 hand">采集语音信息列表</div>
    </div>
    <div class="page-box">
      <Table
        :page="page"
        :lbData="lbData"
        :isSelect="true"
        :lbBtn="lbBtn"
        :plBtn="plBtn"
        :lbTab="lbTab"
        :isTab="false"
        :isEdit="isEdit"
        :tableData="tableData"
        :refName="'foreigners'"
        :selection="selection"
        :pageSizeArr="pageSizeArr"
        :czWidth="'160'"
        :clearSort="clearSort"
        :expData="cx"
        :expUrl="$api.aport2 + '/specialCheck/exportData'"
        @plFnc="plFnc"
        @tabFnc="tabFnc"
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
    <Dialog
      :width="dialogType != 'edit' && dialogType != 'ck' ? '800px' : '1300px'"
      :isShowDialog="isShowDialog"
      :title="dialogTitle"
      @hideDialog="isShowDialog = false"
    >
      <Form
        :cxData="labelData"
        :dialogData="dialogData"
        :dialogType="dialogType"
        :rulsName="'cjyylbs'"
        ref="cjyyForm"
        @dialogSave="dialogSave"
        @dialogCancel="isShowDialog = false"
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
  data() {
    return {
      tabImg_1: require("../../../assets/images/main/tab_2.png"),
      tabImgActive_1: require("../../../assets/images/main/tab_2_pre.png"),
      tabImg_2: require("../../../assets/images/main/tab_1.png"),
      tabImgActive_2: require("../../../assets/images/main/tab_1_pre.png"),
      //数据展示
      //查询项
      cxData: this.$cdata.foreigners.cjyylb.cx,
      facxData: this.$cdata.foreigners.cjyylb.facx, //快速查询项
      //列表
      isEdit: true,
      lbData: this.$cdata.foreigners.cjyylb.lb,
      lbBtn: this.$cdata.foreigners.cjyylb.lbBtn,
      lbTab: this.$cdata.foreigners.cjyylb.lbTab,
      plBtn: this.$store.state.plBtn,
      pageSizeArr: [15, 100, 500],
      selection: [],
      page: "0",
      //业务数据
      cx: {
        pd: {},
        pageSize: 15,
        pageNum: 1,
      },
      cxQ: {
        //快速查询
        pd: {},
        pageSize: 15,
        pageNum: 1,
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1,
      },
      pageState: 1,
      clearSort: 0,
      issueDataIds: [],
      //弹窗数据
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: this.$cdata.foreigners.cjyylb.labelData,
      timer: "",
      onlySerial: "",
      resopd:{},
    };
  },
  mounted() {
    this.$cdata.qxgl.getSjBm(this.$store.state.user.bmbh).then(() => {
      //所属分局
      this.$store.dispatch("aGetssdw", { bmbh: "320500000000", type: "ssfj" });
    });

    this.getSpInit();

    this.getTable(true);
    
  },
  methods: {
    //下拉框联动
    lcFnc(data) {
      if (data.key.dm == "subBureauCode") {
        if (data.data == "") {
          data.obj.policeStationCode = "";
        }
        if (data.obj.policeStationCode) {
          data.obj.policeStationCode = "";
        }
        this.$store.dispatch("aGetssdw", { bmbh: data.data, type: "sspcs" });
      }
    },
 
    //所属派出所
    getSpInit() {
      this.$cdata.qxgl.getSjBm(this.$store.state.user.bmbh).then((data) => {
        this.$store.dispatch("aGetssdw", {
          bmbh: "320500000000",
          type: "ssfj",
        });
        if (this.$store.state.user.jb == 2) {
          //级别 2 是分局
          if (data.fj) {
            this.cx.pd.subBureauCode = data.fj;
          } else {
            this.cx.pd.subBureauCode = data.bmbh;
          }
          this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "sspcs" });
          this.cx.pd.subBureauCodedis = true; //true 分局有值
        } else if (this.$store.state.user.jb == 3) {
          //级别 2 是派出所
          this.$store.dispatch("aGetssdw", { bmbh: data.fj, type: "sspcs" });
          this.cx.pd.subBureauCode = data.fj;
          this.cx.pd.policeStationCode = data.bmbh;
          this.cx.pd.subBureauCodedis = true;
          this.cx.pd.policeStationCodedis = true; //true 派出所有值 置灰
        }
      });
    },
    
   
    cxFnc(data) {
      this.cx.pd = data;
      this.cx.queryParams=data;
      this.cx.pageNum = 1;
      this.getTable(true);
    },
    //查询条件转换查询
    queryShowFnc(flag) {
      if (!flag) {
        //快速查询
        this.getTable(true, this.cxQ);
      } else {
        this.getTable(true);
      }
    },
    tabFnc(data) {
      this.page = data;
      this.cx.pageNum = 1;
      this.issueDataIds = [];
      this.$cdata.zxhc.zxhcLbbtn("3", this.page).then((data) => {
        this.lbBtn = data;
      });
      if (this.page == "1") {
        this.isEdit = false;
      } else {
        this.isEdit = true;
      }
      if (this.page != "0") {
        this.plBtn = this.plBtn.filter((item) => ["xf"].indexOf(item.py) == -1);
      } else {
        this.plBtn = this.$store.state.plBtn;
      }
      this.getTable(true);
    },
    //导入--导出错误信息
    expFun() {
      this.isShowDialog = false;
      this.getTable();
    },
    //简表数据 子组件通知父组件改表格数据
    transSaveFnc(data) {
      this.lbData = data;
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
    sortChange(data) {
      this.cx.order = data.prop;
      this.cx.direction = data.direction;
      this.getTable();
    },
    //表格复选框选择
    SelectionChange(data) {
      this.issueDataIds = [];
      for (var i = 0; i < data.length; i++) {
        this.issueDataIds.push(data[i].serial);
      }
    },
    // 查询用户列表
    getTable(flag, pdQ) {
      if (flag) { //表示不用排序
        this.cx.user=this.$store.state.user;
        this.clearSort = new Date().getTime();
        delete this.cx.order;
        delete this.cx.direction;
      }
      
      this.$api.post(
        this.$api.aport5 + "/znAudioIntranet/listData",
        pdQ || this.cx,
        (r) => {
          this.tableData.list = r.records;
          this.tableData.total = r.total;
        }
      );
    },
    //批量按钮 表格上面的那层按钮
    plFnc(data) {
      this.dialogTitle = data.menu_name;
      this.dialogType = data.py;
      if (data.py == "xz") {
        this.labelData = this.$cdata.foreigners.cjyylb.labelData;
        this.dialogData = {};
         
         this.isShowDialog = true;
       
        if (this.$refs.cjyyForm) {
          this.$refs.cjyyForm.clearValid();
        }
      }
    },
  
    //列表内按钮&&双击行
    blFnc(data) {
      this.dialogType = data.btn.button_type;
      this.dialogTitle = data.btn.button_name;
      if (this.$refs.cjyyForm) {
        this.$refs.cjyyForm.clearValid();
      }
    
      if (data.double) {
        this.dialogType = "edit";
        this.dialogTitle = "编辑";
      }
      if (this.dialogType == "del") {
       
       if(data.data.isDelete==0){
           this.$message({
                    message: "所选的语音信息为无效数据！",
                    duration: 8000,
                    showClose: true,
                    type: "error",
             });
             return;
       }

        this.$confirm("是否设置为无效数据？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
     
          .then(() => {
              var uus=[];
            
              if(data.data.audioId){
                  uus.push(data.data.audioId+'');
              }
                 let p={
                     'user':this.$store.state.user,
                     'params':uus
                 };
            this.$api.post(
              this.$api.aport5 + "/znAudioIntranet/deltoIsDelete",
              p,
              (r) => {
                if(r.data){
                    this.$message({
                    message: "操作成功",
                    duration: 8000,
                    showClose: true,
                    type: "success",
                    });
                    this.getTable();
                }else{
                    this.$message({
                    message: r.msg?r.msg:'操作失败',
                    duration: 8000,
                    showClose: true,
                    type: "error",
                    });
                }
              }
            );
            
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      } else if (this.dialogType == "edit") {
        this.labelData = this.$cdata.foreigners.cjyylb.labelData;
        this.dialogData = Object.assign({}, data.data);
        this.isShowDialog = true;
      } else if (this.dialogType == "ck") {
        this.labelData = this.$cdata.foreigners.cjyylb.labelData;
        this.dialogData = Object.assign({}, data.data);
        this.isShowDialog = true;
      }
      
    },
    //编辑保存
    editSave(data) {
     let p={
              'user':this.$store.state.user,
              'params':data
        }
      this.$api.post(
        this.$api.aport5 + "/znAudioIntranet/save",
        p,
        (r) => {
           if(r.data){
           this.$message({
            message: "修改成功",
            duration: 8000,
            showClose: true,
            type: "success",
          });
          this.getTable();
          this.isShowDialog = false;
          }else{
            this.$message({
                message: r.msg?r.msg:'修改失败',
                duration: 8000,
                showClose: true,
                type: "error",
            });
          }
        }
      );
    },

    xzSave(data) {
    //   let p = Object.assign({}, data);
    //   p.dataType = "3";
    //   p.create_user_id = this.$store.state.user.userId;
      let p={
          'params':data,
          'user':this.$store.state.user,
      };
      this.$api.post(
        this.$api.aport5 + "/znAudioIntranet/save",
        p,
        (r) => {
          if(r.data){
           this.$message({
            message: "保存成功",
            duration: 8000,
            showClose: true,
            type: "success",
          });
          this.getTable();
          this.isShowDialog = false;
          }else{
        
            this.$message({
                message: r.msg,
                duration: 8000,
                showClose: true,
                type: "success",
            });
          }
         
        }
      );
    },
    dialogSave(data) {
    
      if (data.type == "edit") {
        this.editSave(data.data);
      } else if (data.type == "xf") {
        this.xfSave(data);
      } else if (data.type == "xz") {
        this.xzSave(data.data);
      }
    },
    //点击行
    rowClick() {},
  },
};
</script>
<style scoped>
</style>