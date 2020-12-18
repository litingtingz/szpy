<template>
  <div>
    <el-row type="flex" class="page-inner-box">
      <el-col :span="24">
        <Table
          :page="tabPage"
          :lbData="lbData"
          :isSelect="false"
          :isTab="isTab"
          :isPl="false"
          :isEdit="isEdit"
          :lbBtn="$cdata.sjhj.gtsjcx.inLbBtn"
          :lbTab="lbTab"
          :tableData="tableData"
          :clearSort="clearSort"
          :expData="cx"
          :expUrl="$api.aport1+'/zrq/exportZrqMj'"
          @blFnc="blFnc"
          @tabFnc="tabFnc"
          @pageSizeFnc="pageSizeFnc"
          @pageNumFnc="pageNumFnc"
          @sortChange="sortChange"
        ></Table>
      </el-col>
    </el-row>
    <div class="page-btn-box">
      <!-- <el-button size="mini" type="primary" round @click="save">保存</el-button> -->
      <el-button size="mini" type="info" round @click="cancel">关闭</el-button>
    </div>
  </div>
</template>
<script>
import Table from "@/components/Table.vue";

export default {
  components: { Table },
  props: {
    dialogType: {
      type: String,
      default: ""
    },
    dialogData: {
      type: Object,
      default: () => {}
    },
    lbRow:{
      type: Object,
      default: () => {}
    },
    pageRef:{
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // 【业务数据】
      lbData:[],
      lbTab:[],
      tabPage:'0',
      isTab:false,
      isEdit:true,
      cx: {
        pd: this.lbRow,
        pageSize: 10,
        pageNum: 1,
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      clearSort:0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      if(this.pageRef == 'lz'){
        this.isTab = false;
        this.lbData = this.$cdata.sjhj.gtsjcx.lzxxTableEdit
        this.isEdit = false
      }else{
        this.isTab = true;
        this.lbData = this.$cdata.sjhj.gtsjcx.czxxTableEdit
        this.lbTab = this.$cdata.sjhj.gtsjcx.lbTabEdit
        this.isEdit = true;
      }
      this.begin();
    })
  },
  methods: {
    sortChange(data){
      this.cx.order = data.prop;
      this.cx.direction = data.direction;
      this.getTable();
    },
    tabFnc(data) {
      this.tabPage = data;
      this.cx.pageNum = 1;
      this.cx.pageSize = 10;
      this.getTable(true);
    },
    // 查询用户列表
    getTable(flag) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      this.cx.pd.resident_type = this.tabPage
      let url = ''
      if(this.pageRef == 'lz'){
        url = '/gtrg/GetCtxxLzCx'
      }else{
        url = '/gtrg/GetCtxxCzCx'
      }
      this.$api.post(this.$api.aport4 + url, this.cx, r => {
        this.tableData.list = r.list;
        this.tableData.total = r.total;
        this.tableData.pageSize = r.pageSize;
        this.tableData.pageNum = r.pageNum
      });
    },
    // 表格内操作
    blFnc(data){
      if(data.btn.button_type == "ck"){
        let routeData = this.$router.resolve({
          path: '/CzCTXQ',
          query:{onlyId:data.data.personnel_id}
        });
        window.open(routeData.href, '_blank');
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
    cancel() {
      this.$emit("dialogCancel");
    },
    // 开始
    begin() {
     this.getTable();
    }
  }
};
</script>
<style scoped>
</style>