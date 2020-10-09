<template>
  <div class="page">
    <Inquire :cxData="cxData" :pd="cx.pd" :cxPara="cx" @cxFnc="cxFnc"></Inquire>
    <div class="t-tab-top">
      <!-- <div class="tab-top-item tabImgActive_1 hand">
        <img src="../../../assets/images/main/tab_2_pre.png" alt />
        <span>采集信息列表</span>
      </div> -->
      <div class="tab-top-item hand" :class="(cx.pd.compare_status=='0' && cx.pd.check_status=='1')?'tabImgActive_1':'tabImg_1'" @click="tabTopClick('0','1')">全部待接收</div>
      <div class="tab-top-item hand" :class="(cx.pd.compare_status=='0' && cx.pd.check_status=='2')?'tabImgActive_2':'tabImg_2'" @click="tabTopClick('0','2')">全部待处理</div>
      <div class="tab-top-item hand" :class="(cx.pd.compare_status=='0' && cx.pd.check_status=='3')?'tabImgActive_2':'tabImg_2'" style="margin-left:-18px" @click="tabTopClick('0','3')">全部已处理</div>
      <div class="tab-top-item hand" :class="(cx.pd.compare_status=='1' && cx.pd.check_status=='1')?'tabImgActive_2':'tabImg_2'" style="margin-left:-18px" @click="tabTopClick('1','1')">本人任务</div>
      <div class="tab-top-item hand" :class="(cx.pd.compare_status=='1' && cx.pd.check_status=='2')?'tabImgActive_2':'tabImg_2'" style="margin-left:-18px" @click="tabTopClick('1','2')">本人待处理</div>
      <div class="tab-top-item hand" :class="(cx.pd.compare_status=='1' && cx.pd.check_status=='3')?'tabImgActive_2':'tabImg_2'" style="margin-left:-18px" @click="tabTopClick('1','3')">本人已处理</div>
    </div>
    <div class="page-box">
      <el-row :gutter="20">
        <el-col :span="24">
          <Table
            lbType="yhtb"
            :lbData="lbData"
            :isSelect="true"
            :isEdit="isEdit"
            :lbBtn="lbBtn"
            :plBtn="plBtn"
            :disPlBtn="disPlBtn"
            :tableData="tableData"
            :clearSort="clearSort"
            :expData="cx"
            :czWidth="'350'"
            :expUrl="$api.aport1+'/userController/exportUserInfo'"
            @pageSizeFnc="pageSizeFnc"
            @pageNumFnc="pageNumFnc"
            @rowClick="rowClick"
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
        v-if="isShowDialog"
        :cxData="labelData"
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
import Dialog from "@/components/Dialog.vue";
import Table from "@/components/Table.vue";

import Form from "@/components/Form.vue";
export default {
  components: {
    Inquire,
    Table,
    Dialog,
    Form
  },
  data() {
    return {
      tabImgActive_1: require("../../../assets/images/main/tab_2_pre.png"),
      // 【展示数据】
      isSelect: true,
      isEdit: true,
      cxData: this.$cdata.foreigners.znCollectlistIntranet.cx,
      lbData: this.$cdata.foreigners.znCollectlistIntranet.lb,
      lbBtn: this.$cdata.foreigners.znCollectlistIntranet.lbBtn,
      plBtn: this.$store.state.plBtn,
      // 【业务数据】
      cx: {
        pd: { userType: "0", valid: "1",compare_status:'0', check_status:'1'},
        pageSize: 10,
        pageNum: 1,
        queryParams: null,
        user: this.$store.state.user
        // order: "",
        // direction: ''
      },
      disPlBtn: false,
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      clearSort:0,
      selection: [],
      tableData2: { list: [] },
      tableData3: { list: [] },
      treeData1: [],
      treeProps1: {
        label: "menu_name",
        children: "childrenMenu"
      },
      defaultChecked1: [],
      // 弹窗数据,
      currentRow: {},
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: [],
      userRoleData: [],
     
    };
  },
  mounted() {
    this.cx.queryParams = this.cx.pd;
    this.getTable();
    // this.begin();

    // 加载 国家地区 下拉选
    this.$store
      .dispatch("aGetCountryCode", { })
      .then(() => {});
  },

  methods: {
    tabTopClick(m,n){
       this.cx.pd.compare_status = m;
       this.cx.pd.check_status=n;
       this.cx.pageNum = 1;
       
       
      this.getTable(true);
    },
    btnClick(py) {
      if (py == "bc") {
        this.saveUserRoleInfo();
      } else if (py == "qc") {
        this.cancel();
      }
    },
    //简表数据 子组件通知父组件改表格数据
    transSaveFnc(data){
      this.lbData = data
    },
    // 获取查询参数
    cxFnc(data) {
      this.cx.pd = data;
      this.cx.queryParams = data;
      this.cx.pageNum = 1;
      console.log("用户类型", data);
      // this.disPlBtn = data.userType == 0 ? true : false;
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
      this.cx.direction = data.direction
      this.getTable();
    },
    // 查询用户列表
    getTable(flag) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      this.$api.post(
        this.$api.aport5 + "/znCollectlistIntranet/listData",
        this.cx,
        r => {
          console.log(r);
          this.tableData.list = r.records;
          this.tableData.total = r.total;
                 // pageSize: 10,
                 // pageNum: 1

        }
      );
    },

   
    // 点击表格行
    rowClick() {
     
    },
    // 批量操作
    plFnc(data) {
      console.log("批量处理", data);
      this.dialogTitle = data.menu_name;
      this.dialogType = data.py;
      this.labelData = this.$cdata.qxgl.yhgl[data.py];
      if (data.py == "xj") {
        this.dialogData = {};
        this.isShowDialog = true;
      } else if (data.py == "xg") {
        this.dialogData = this.currentRow;
        console.log(this.dialogData);
        if (JSON.stringify(this.dialogData) == "{}") {
          this.$message({
            message: "请先选择用户",
            showClose: true,
            duration:13000,
            type: "warning"
          });
          return false;
        } else if (this.dialogData.userType == "系统用户") {
          this.$message({
            message: "该用户为系统用户，不可修改",
            showClose: true,
            duration:13000,
            type: "warning"
          });
          return false;
        }
        this.isShowDialog = true;
        // this.dialogData = data.data;
      } else if (data.py == "sc") {
        this.dialogData = this.currentRow;

        if (JSON.stringify(this.dialogData) == "{}") {
          this.$message({
            message: "请先选择用户",
            showClose: true,
            duration:13000,
            type: "warning"
          });
          return false;
        } else if (this.dialogData.userType == "系统用户") {
          this.$message({
            message: "该用户为系统用户，不可修改",
            showClose: true,
            duration:13000,
            type: "warning"
          });
          return false;
        }
        this.delUser(this.dialogData);
      } else if (data.py == "plmmcz") {
        this.isShowDialog = true;
      } else if (data.py == "plscsjmm") {
        this.batchRandomPassword();
      }
    },
    // 表格内操作
    blFnc(data) {
      this.dialogTitle = data.btn.button_name;
      this.dialogType = data.btn.button_type;
      if (data.btn.button_type == "mmcz") {
        this.labelData = this.$cdata.qxgl.yhgl.plmmcz;
        this.isShowDialog = true;
        this.dialogData = data.data;
      } else if (data.btn.button_type == "scsjmm") {
        // this.isShowDialog = true;
        // this.dialogData = data.data;
        this.batchRandomPassword(data.data);
      }
    },
    dialogSave(data) {
      console.log(data);
      if (data.type == "xj") {
        this.saveUser(data.data);
      } else if (data.type == "xg") {
        this.updateOtherUserInfo(data.data);
      } else if (data.type == "plmmcz") {
        this.batchUpdateUserPassword(data.data);
      } else if (data.type == "mmcz") {
        this.batchUpdateUserPassword(data.data, this.currentRow);
      }
    },
    // 新增用户
    saveUser(data) {
      let p = data;
      p.userType = "1";
      console.log(data);
      this.$api.post(this.$api.aport1 + "/userController/saveUser", p, r => {
        this.$message({
          message: r.message,
          showClose: true,
          duration:8000,
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
      });
    },
    // 修改用户
    updateOtherUserInfo(data) {
      this.$api.post(
        this.$api.aport1 + "/userController/updateOtherUserInfo",
        data,
        r => {
          this.$message({
            message: r.message,
            showClose: true,
            duration:8000,
            type: "success"
          });
          this.getTable();
          this.isShowDialog = false;
        }
      );
    },
    // 删除用户
    delUser(data) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let p = {
          userId: data.userId,
          status: "0"
        };
        this.$api.post(
          this.$api.aport1 + "/userController/updateOtherUserInfo",
          p,
          () => {
            this.$message({
              message: "删除成功",
              showClose: true,
              duration:8000,
              type: "success"
            });
            this.getTable();
          }
        );
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      });
    },
    // 重置密码
    batchUpdateUserPassword(data, rowData) {
      console.log("重置密码", data, rowData);
      let p = data;
      p.userType = this.cx.pd.userType;
      p.list = rowData ? [{ serial: rowData.userId, type: rowData.type }] : [];
      this.$api.post(
        this.$api.aport1 + "/userController/batchUpdateUserPassword",
        p,
        r => {
          this.$message({
            message: r.message,
            showClose: true,
            duration:8000,
            type: "success"
          });
          this.getTable();
          this.isShowDialog = false;
        }
      );
    },
    // 生成随机密码
    batchRandomPassword(rowData) {
      this.$confirm("是否确认生成随机密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let p = {};
        p.userType = this.cx.pd.userType;
        p.list = rowData
          ? [{ serial: rowData.userId, type: rowData.type }]
          : [];
        this.$api.post(
          this.$api.aport1 + "/userController/batchRandomPassword",
          p,
          r => {
            this.$message({
              message: r.message,
              showClose: true,
              duration:8000,
              type: "success"
            });
            this.getTable();
            this.isShowDialog = false;
          }
        );
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消'
        })
      });
    },
    userRole(data) {
      this.userRoleData = data;
    },
    // 用户关联角色添加取消
    saveUserRoleInfo() {
      let p = {
        list: this.userRoleData,
        userId: this.currentRow.userId
      };
      this.$api.post(
        this.$api.aport1 + "/userRoleController/saveUserRoleInfo",
        p,
        r => {
          this.$message({
            message: r.message,
            showClose: true,
            duration:8000,
            type: "success"
          });
          this.getTable();
          // this.isShowDialog = false;
        }
      );
    },
    begin() {
      this.getTable();
      this.tableData2 = { list: [] };
      this.tableData3 = { list: [] };
      this.treeData1 = [];
    }
  }
};
</script>