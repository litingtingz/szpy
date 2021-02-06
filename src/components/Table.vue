<template>
  <div class="table-box">
    <div class="table-other" v-if="isTab||isPl">
      <div class="table-tab-box" v-if="isTab">
        <span
          class="hand"
          :class="{'tab_active':page1==lt.dm}"
          v-for="(lt,lti) in lbTab"
          :key="lti"
          @click="lbTabFun(lt.dm)"
        >{{lt.mc}}</span>
      </div>
      <div class="table-btn-box" id="plBtn" v-if="isPl">
        <el-popover
          placement="left"
          trigger="hover"
          popper-class="color-des">
          <div v-if="colorDes.length!=0">
            <div v-for="(color,inds) in colorDes" :key="inds">
              <p>{{color.xflb}}</p>
               <ul>
                <li v-for="(item,ind) in color.colorList" :key="ind">
                  <span style="width:20px;height:20px;display:inline-block;vertical-align: middle;" class="mr-10" :style="{backgroundColor:item.gdyssh}"></span>
                  <span style="flex:1;">{{item.ysshbz}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div v-else>无颜色说明</div>
          <span class="mr-10" slot="reference" v-show="(refName=='hczf'&&clzt1==1)||(refName=='zrqzf'&&clzt1==1)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fuse-"></use>
            </svg>
          </span>
          <!-- <i class="mr-10 iconfont" slot="reference" circle type="success" size="mini" v-show="(refName=='hczf'&&clzt1==1)||(refName=='zrqzf'&&clzt1==1)">&#xe617;</i> -->
        </el-popover>
        <template v-for="(pb,pbi) in plBtn">
          <el-button
            size="mini"
            :type="'primary'"
            :disabled="LbDisable"
            round
            v-if="pb.button_type==2"
            @click="plBtnFun(pb)"
            :key="pbi"
          >{{pb.button_name||pb.menu_name}}</el-button>
        </template>
      </div>
       <div class="table-other-box" :style="{right:otherTab}" v-if="isOther">
        <el-link :underline="false">待办总数{{SDbCount}}条</el-link>
      </div>
    </div>
    <el-table
      size="small"
      :ref="refName"
      border
      :highlight-current-row="isHighlight"
      header-row-class-name="table-header"
      header-cell-class-name="table-header-cell"
      :data="tableData.list"
      style="width: 100%"
      :row-style="rowBackground"
      :span-method="objectSpanMethod"
      @row-click="rowClick"
      @row-dblclick="rowDbClick"
      @selection-change="handleSelectionChange"
      @select="selectPage"
      @select-all="selectPage"
      @sort-change="sortChange">
      <el-table-column v-if="isSelect" align="center" type="selection" width="50"></el-table-column>
      <!-- 颜色填充 -->
      <template v-for="(lb,i) in lbData">
        <el-table-column
          align="left"
          show-overflow-tooltip
          :key="i"
          v-if="lb.color"
          :prop="lb.dm"
          :label="lb.cm"
          :width="lb.width"
          :sortable="isSort">
            <template slot-scope="scope">
              <span style="width:20px;height:20px;display:inline-block;vertical-align: middle;" :style="{backgroundColor:scope.row.gdyssh}"></span>
            </template>
        </el-table-column>
        <!-- 按钮显示 -->
        <el-table-column
          align="left"
          show-overflow-tooltip
          :key="i"
          v-else-if="lb.button"
          :prop="lb.dm"
          :label="lb.cm"
          :width="lb.width"
          :sortable="isSort">
            <template slot-scope="scope">
              <el-button
              style="width: 100%" 
              size="mini"  
              :type="scope.row.crjwyid==btnId||scope.row.valid=='1'?'success':'primary'"
              :disabled="LbDisable"
              @click="lbSpecialBtn(scope.row.crjwyid)">{{scope.row[lb.dm]}}</el-button>
            </template>
        </el-table-column>
         <!-- 按钮显示(通用) -->
        <el-table-column
          align="left"
          show-overflow-tooltip
          :key="i"
          v-else-if="lb.btnCommon"
          :prop="lb.dm"
          :label="lb.cm"
          :width="lb.width"
          :sortable="isSort">
            <template slot-scope="scope">
              <el-button
              style="width: 100%" 
              size="mini"  
              :type="scope.row[lb.only]==btnId||scope.row.valid=='1'?'success':'primary'"
              :disabled="LbDisable"
              @click="lbSpecialBtnCommon(scope.row,lb.dm,scope.row[lb.only])">{{scope.row[lb.dm]}}</el-button>
            </template>
        </el-table-column>
        <!-- 字体链接显示 -->
        <el-table-column
          align="left"
          show-overflow-tooltip
          :key="i"
          v-else-if="lb.textLink"
          :prop="lb.dm"
          :label="lb.cm"
          :width="lb.width"
          :sortable="isSort">
            <template slot-scope="scope">
              <el-link type="primary" @click="lbTextClick(scope.row,scope.column)">{{scope.row[lb.dm]}}</el-link>
            </template>
        </el-table-column>
        <!-- 序号 -->
        <el-table-column
          :key="i"
          type="index"
          :label="lb.cm"
          v-else-if="lb.typeindex">
        </el-table-column>
        <!-- 图片显示 -->
        <el-table-column
          align="left"
          show-overflow-tooltip
          :key="i"
          v-else-if="lb.img"
          :prop="lb.dm"
          :label="lb.cm"
          :width="lb.width"
          :sortable="isSort">
            <template slot-scope="scope">
             <div style="cursor:pointer;position: relative;"> 
               <img 
                @click="imgclick(isimgclick,scope.row.imgpath)" 
                style="cursor:pointer" 
                :src="getimglist(scope.row.imgpath)" 
                class="yimg">
              </div>
            </template>
        </el-table-column>
        <!-- 字符串截取 -->
        <el-table-column
          align="left"
          show-overflow-tooltip
          v-else-if="lb.subS"
          :key="i"
          :prop="lb.dm"
          :label="lb.cm"
          :width="lb.width"
          :sortable="isSort">
          <template slot-scope="scope">
            {{scope.row[lb.dm] | subString}}
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          show-overflow-tooltip
          v-else-if="lb.isShow&&ColIsShow"
          :key="i"
          :prop="lb.dm"
          :label="lb.cm"
          :width="lb.width"
          :sortable="isSort"
        ></el-table-column>
        <!-- 常规 -->
        <el-table-column
          align="left"
          show-overflow-tooltip
          v-else-if="!lb.isShow"
          :key="i"
          :prop="lb.dm"
          :label="lb.cm"
          :width="lb.width"
          :sortable="isSort"
        ></el-table-column>
      </template>
      <el-table-column :width="czWidth" align="center" label="操作" v-if="isEdit">
        <template slot-scope="scope">
          <template v-for="(lbt,lbi) in lbBtn">
            <span :key="lbi" class="btn-span">
              <img
                class="btn-img"
                :src="require('@/assets/images/btn/'+lbt.icon+'.png')"
                @click="handleClick(scope.row,lbt)"
                :title="lbt.button_name"
                v-if="lbt.icon"
              />
              <el-switch
                v-model="scope.row.ustatusBoolean"
                active-color="#13ce66"
                inactive-color="#ff4949"
                v-else-if="lbt.switch"
                active-text="启用"
                inactive-text="禁止"
                class="switchStyle"
                @change="handleClick(scope.row,lbt)">
              </el-switch>
              <el-button
                style="margin:0 5px"
                :style="{'color':lbt.color_type=='1'?'#d78df5':'#7FCEFF'}"
                @click="handleClick(scope.row,lbt,scope.$index)"
                type="text"
                size="small"
                v-else-if="!lbt.user_ctrl||(lbt.user_ctrl==scope.row.status&&!lbt.status)||(lbt.user_ctrl==scope.row.sfyx&&!lbt.status)
                ||(lbt.user_ctrl==scope.row.whetherUpdateState&&!lbt.control)
                ||(lbt.control&&page1=='1'&&clzt1==1&&((scope.row.backstatus_desc=='无效地址'||!scope.row.backstatus_desc))&&(scope.row.datatype!='3')&&(scope.row.datatype!='4')&&(scope.row.datatype!='5'))
                || (lbt.user_ctrl==scope.row.isDelete && lbt.status)
                || (lbt.user_ctrl==scope.row.compareStatus && scope.row.checkStatus=='2')"
              >{{lbt.button_name}}</el-button>
            </span>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div align="center" class="mtb-10" v-if="isPagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.pageNum"
        :page-sizes="pageSizeArr"
        :page-size="tableData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
      ></el-pagination>
    </div>
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <Trans
        :key="timer"
        :transData="transData"
        :pointData="pointData"
        :dialogType="dialogType"
        @transSave="transSave"
        @dialogCancel="isShowDialog=false"></Trans>
    </Dialog>
     <div id="big-img-box" v-drag v-if="isimgclick">
        <el-image-viewer :on-close="()=>{isimgclick=false}" :url-list="imglist" />
      </div>
  </div>
</template>
<script>
import Dialog from "./Dialog.vue";
import Trans from "./Transfer.vue"
export default {
  components: { Dialog, Trans,
   "el-image-viewer": () =>
      import("element-ui/packages/image/src/image-viewer")
    },
    // 父元素传的参数
  props: {
    lbType: {
      type: String,
      default: ""
    },
    // 【内层列表tab】
    page: {
      type: String,
      default: ""
    },
    // 【外层列表tab】
    clzt: {
      type: Number,
      default: 0,
    },
    //内层tab是否展示
    isTab: {
      type: Boolean,
      default: false
    },
    //表格是否高亮
    isHighlight:{
      type: Boolean,
      default: true
    },
    //tab 其他展示项
    isOther:{
      type: Boolean,
      default: false
    },
    //表格批量按钮是否展示
    isPl: {
      type: Boolean,
      default: true
    },
    //暂时废弃
    disPlBtn: {
      type: Boolean,
      default: false
    },
    //ref 名字
    refName: {
      type: String,
      default: "aa"
    },
    //表格的多选框列是否展示 默认不展示
    isSelect: {
      type: Boolean,
      default: false
    },
    //表格操作列是否展示
    isEdit: {
      type: Boolean,
      default: true
    },
    //暂时无用
    isRowClick: {
      type: Boolean,
      default: true
    },
    //表格分页是否展示
    isPagination: {
      type: Boolean,
      default: true
    },
    //表格是否排序
    isSort: {
      type: [String, Boolean],
      default: 'custom'
    },
    //表格分页 每页展示条数分组
    pageSizeArr: {
      type: Array,
      default: () => [10, 20, 30, 40]
    },
    // cxData: {
    //   type: Array,
    //   default: () => []
    // },
    //表格表头数据
    lbData: {
      type: Array,
      default: () => []
    },
    //简表 特殊处理
    lbControlData: {
      type: Array,
      default: () => []
    },
    //列表操作列的按钮数据
    lbBtn: {
      type: Array,
      default: () => []
    },
    //列表的批量按钮数据 因为权限控制 一般是从vuex取值
    plBtn: {
      type: Array,
      default: () => []
    },
    //列表的tab数据
    lbTab: {
      type: Array,
      default: () => []
    },
    //列表表格数据
    tableData: {
      type: Object,
      default: () => {}
    },
    //列表多选框选中数据
    selection: {
      type: Array,
      default: () => []
    },
    //列表操作列的宽度
    czWidth: {
      type: String,
      default: "auto"
    },
    //监听数据 是否清除排序
    clearSort: {
      type: Number,
      default:0
    },
    //数据导出需要传递的参数
    expData:{
      type:Object,
      default: () => {}
    },
    //导出路径
    expUrl:{
      type:String,
      default:''
    },
    //导出excel格式
    expType:{
      type:String,
      default:'xlsx'
    },
    //颜色配置
    colorDes:{
      type:Array,
      default: () => []
    },
    //表格行合并
    tableMerge:{
      type:Object,
      default: () => {}
    },
    SDbCount:{
      type:Number,
      default:0
    },
    //禁止表格里的可操作项
    LbDisable:{
      type:Boolean,
      default:false,
    },
    //列表按钮 信息回填选中
    btnIsCheck:{
      type:String,
      default:''
    },
    //列表某一列显示&隐藏 与数据源的参数一并判断
    ColIsShow:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {
      pageNum: "1",
      pageSize: this.pageSizeArr[0],
      // order: "serial",
      // direction: 1,
      currentRow: 0,
      page1: this.lbTab.length > 0 ? this.lbTab[0].dm : this.page,
      clzt1:this.clzt,
      lbArr:this.lbData,//获取初始全部列表项
      jbArr:[],//已选择展示项
      isShowDialog: false,
      dialogTitle: "",
      dialogType:"",
      kgvalue:false,
      //穿梭框数据
      timer:'',
      transData:this.lbData,//数据来源（全部展示列表项）
      pointData:[],//选中项
      confirmFlag:true,
      expD:{},
      isimgclick: false,
      imglist:[],
      timeClick:null,
      btnId:'',
      otherTab:'',
    };
  },
  filters: {
    subString(value) {
      if (!value) return "";
      return value.slice(0,10);
    }
  },
  computed:{
    otherTabStyle(){
      let ret = this.plBtn.findIndex((v) => {
          return v.button_type == '2';
      });
      return ret>-1&&document.getElementById('plBtn')?document.getElementById('plBtn').offsetWidth:0
    }
  },
  watch: {
    selection(val) {
      this.$nextTick(function() {
        this.toggleSelection(val);
      });
    },
    otherTabStyle(val){
      // console.log('+++===',val)
      this.$nextTick(()=>{
        if(val){
          this.otherTab = document.getElementById('plBtn').offsetWidth+20 + 'px'
          // console.log('off',this.otherTab)
        }  
      })
    },
    lbTab(val) {
      if (val.length > 0) {
        this.page1 = val[0].dm;
      }
    },
    plBtn: {
      handler() {},
      deep: true
    },
    page(val) {
      this.page1 = val;
    },
    clzt(val){
      this.clzt1 = val;
    },
    //清除排序
    clearSort(){
      this.$nextTick(()=>{
        this.$refs[this.refName].clearSort()
      })
    },
  },
  mounted() {
    this.$nextTick(function() {
      this.toggleSelection(this.selection);
      if(this.$route.query.page){
        this.page1 = this.$route.query.page
      }
    });
  },
  // directives
  methods: {
    imgclick(data,path) {
      this.imglist=[this.$api.aport6+path];
      this.isimgclick = true;
    },
    getimglist(data){
      return  this.$api.aport6+data;
    },
    //列表内可复选按钮点击事件
    lbSpecialBtn(val){
      if(this.btnId == val){
        this.btnId = ''
      }else{
        this.btnId = val;
      }
      this.$emit('lbSpecialBtnFnc',{data:val})
    },
    lbSpecialBtnCommon(data,key,value){
      if(this.btnId == value){
        this.btnId = ''
      }else{
        this.btnId = value
      }
      this.$emit('lbSpecialBtnFncCommon',{data:data,key:key,val:this.btnId})
    },
    //列表内可点击文字事件
    lbTextClick(row,column){
      this.$emit('lbTextClickFnc',{row:row,column:column})
    },
    //默认当前行高亮
    cRowHighlight(){
      this.$refs[this.refName].setCurrentRow(this.tableData.list[0],true)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.$emit("pageSizeFnc", this.pageSize);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.$emit("pageNumFnc", this.pageNum);
    },
    handleSelectionChange(val) {//当选择项发生变化时会触发该事件
      // console.log('选择',val);
      this.$emit("SelectionChange", val);
    },
    selectPage(val,ref){//当用户手动勾选数据行的 Checkbox 时触发的事件   跨页选中需要手动触发
      // console.log('手动触发==',val)
      this.$emit("selectPageFnc",{data:val,refName:ref})
    },
    rowBackground(row){
      if(this.refName=='cjxx'){
          return{
             "background-color":row.row.checkStatus==3 && this.clzt==0?"#CEE9FB":''
          }
      }else{
        return{
          "background-color":row.row.yjssys
        }
      }
      
    },
    objectSpanMethod({column ,rowIndex }){
        for(var i in this.tableMerge){
          if(i == column.property){
            const _row = this.tableMerge[i][rowIndex];//代表合并行的行数
            const _col = _row > 0 ? 1 : 0;
            return {
              rowspan: _row,
              colspan: _col,
            };
          }
        }
    },
    toggleSelection(rows) {//选中行
      if (rows) {
        this.$nextTick(() =>{
          rows.forEach(row => {
            this.$refs[this.refName].toggleRowSelection(row, true);
          });
        })
      } else {
        this.$refs[this.refName].clearSelection();
      }
    },
    rowClick(row,column) {//点击行
      clearTimeout(this.timeClick);  
      this.timeClick = setTimeout(()=>{
        if (!this.isRowClick) {
          return false;
        }
        if(column && column.label=="操作"&&(this.refName=='hczf'||this.refName=='address')){
          return false;
        }
        // console.log('danji-',event)
        this.$emit("rowClick", { type: this.lbType, data: row });
      },300)
    },
    rowDbClick(row, column, cell, event){
      clearTimeout(this.timeClick);
      console.log(row, column, cell, event,'---');
      this.$emit("blFnc", { btn:'', data: row ,double:true});
    },
    handleClick(row, btn,index) {
      this.$emit("blFnc", { btn: btn, data: row ,index:index});
    },
    lbTabFun(val) {
      this.$emit("tabFnc", val);
    },
    async plBtnFun(val) {
      if(val.py == 'jb'){//简表
        this.dialogTitle = val.menu_name;
        this.dialogType = val.py;
        this.timer = new Date().getTime();
        if(this.refName=="hczf"){
          if(this.page1!='1'){
            this.transData = this.transData.filter(item => ['datasources_desc'].indexOf(item.dm) == -1);
          }else{
            this.transData = this.lbControlData
          }
        }
        this.isShowDialog = true;
      }
      if(val.py == 'dc'){//导出
        let expName = this.$store.state.breadcrumb[this.$store.state.breadcrumb.length-1].menu_name;
        this.expD = Object.assign({},this.expData)
        this.expD.menu_name = this.$store.state.breadcrumb[this.$store.state.breadcrumb.length-1].menu_name;
        this.expD.btn_name = val.menu_name;
        this.expD.user = this.$store.state.user;
        if(this.expD.pd){this.expD.pd.listName = this.lbData;}
        this.expD.pageSize = 10000;
        if(this.tableData.list.length==0){
          this.$message({
            message: "无可导出数据！",
            showClose: true,
            duration:13000,
            type: "warning"
          });
          return false;
        }
        if(this.tableData.total>10000){//导出条数大于10000条
          this.$message({
            message: "导出数据不能大于10000条！",
            showClose: true,
            duration:13000,
            type: "warning"
          });
          return false;
        }
        this.expD.pageNum = 1
        this.$api.post(this.expUrl,this.expD,'','','blob',this.expType,expName)
      }
      // if(val.py == 'dc'){//导出
      //   let expName = this.$store.state.breadcrumb[this.$store.state.breadcrumb.length-1].menu_name;
      //   this.expD = Object.assign({},this.expData)
      //   this.expD.menu_name = this.$store.state.breadcrumb[this.$store.state.breadcrumb.length-1].menu_name;
      //   this.expD.btn_name = val.menu_name;
      //   this.expD.user = this.$store.state.user;
      //   if(this.expD.pd){this.expD.pd.listName = this.lbData;}
      //   this.expD.pageSize = 2000;
      //   if(this.tableData.list.length==0){
      //     this.$message({
      //       message: "无可导出数据！",
      //       showClose: true,
      //       duration:13000,
      //       type: "warning"
      //     });
      //     return false;
      //   }
      //   if(this.tableData.total<=2000){//导出条数小于2000条
      //     this.expD.pageNum = 1
      //     this.$api.post(this.expUrl,this.expD,'','','blob',this.expType,expName)
      //   }else{
      //     for(var i=1;i<=Math.ceil(this.tableData.total/2000);i++){
      //       this.expD.pageNum = i
      //         await this.$confirm('将导出'+i+'个文件，将导出 '+(i)*2000 +' 条，是否继续导出?','提示',{
      //           confirmButtonText: '确定',
      //           cancelButtonText: '取消',
      //           type: 'warning'
      //         }).then(async() => {
      //           await this.$api.post(this.expUrl,this.expD,'','','blob',this.expType,expName)
      //         }).catch(() => {
      //           this.$message({
      //             type: 'info',
      //             message: '已取消导出'
      //           })
      //           this.confirmFlag = false
      //         })
      //         if(!this.confirmFlag){
      //           this.confirmFlag = true
      //           return false
      //         }
      //     }
      //   }
      // }
      this.$emit("plFnc", val);
    },
    // 简表保存
    transSave(data){
      this.jbArr = [];
      this.lbArr.forEach(item1 => {
        data.forEach(item2 => {
          if(item1.dm == item2){
            this.jbArr.push(item1)
          }
        })
      });
      if(this.jbArr.length!=0){
        this.pointData=this.jbArr;
        this.$emit('transSaveFnc',this.jbArr);
      }
      this.isShowDialog = false;
    },
    sortChange(column){
      column.order=="ascending"?column.order='asc':column.order=="descending"?column.order='desc':column.order=null
      if(column.prop.includes('_desc')){column.prop=column.prop.replace("_desc","");}
      this.$emit("sortChange",{prop:column.prop,direction:column.order})
    },
  }
};
</script>
<style scoped>
.yimg{width: 60px!important; height: 35px!important;}
.table-other {
    position: relative;
    height: 34px;
    border-bottom: 1px solid #e2e7ed;
    margin-bottom: 12px;
    /* display: flex;
    justify-content: space-between; */
  }
.table-tab-box {
    position: absolute;
    left: 0;
}
.table-other-box{
  position: absolute;
}
.table-tab-box span {
    font-size: 12px;
    color: #9ea5bf;
    margin-right: 20px;
    display: inline-block;
    padding: 0 2px 10px;
    box-sizing: border-box;
}

.tab_active {
    color: #2576dc;
    border-bottom: 3px solid #2576dc;
}
.table-btn-box {
  position: absolute;
  right: 0;
}
.btn-span {
  display: inline-block;
  vertical-align: middle;
}
.btn-img {
  width: 20px;
  margin: 0 5px;
  vertical-align: middle;
  cursor: pointer;
}

</style>
<style>
.switchStyle .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
 
}
.switchStyle .el-switch__label--left {
  z-index: 9;
  left: 6px;
}
.switchStyle .el-switch__label--right {
  z-index: 9;
  left: -14px;
}
.switchStyle .el-switch__label.is-active {
  display: block;
}
.switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 60px !important;

}
</style>