<template>
  <div>
    <el-form
      :model="dialogData"
      status-icon
      :rules="rules"
      size="mini"
      ref="form"
      :label-width="'137px'"
      class="form-ruleForm"
      :disabled="dialogType=='ck'||editAllJz">
      <el-row :gutter="30" type="flex" align="middle" justify="center">
        <el-col :span="24">
          <el-col :span="cx.col?cx.col:8" v-for="(cx,i) in cxData" :key="i">
            <el-form-item :label="cx.cm" :prop="cx.dm" :title="cx.cm">
              <template v-if="cx.type=='input'">
                <el-input  v-model="dialogData[cx.dm]" :disabled="cx.dis" :maxlength="cx.max"></el-input>
              </template>
              <template v-if="cx.type=='inputNumber'">
                <el-input v-model="dialogData[cx.dm]" :disabled="cx.dis"  type="number"></el-input>
              </template>
              <template v-if="cx.type=='joinInput'">
                <el-input v-model="dialogData[cx.dm]" :disabled="joinFlag"></el-input>
              </template>
               <template v-if="cx.type=='joinBtn'">
                <el-row type="flex" justify="space-between">
                  <el-col :span="17"><el-input v-model="dialogData[cx.dm]"></el-input></el-col>
                  <el-col :span="6" style="text-align: right;">
                    <el-button type="success" size="mini" style="line-height: 0.9;" @click="joinBtnFnc(dialogData,dialogData[cx.dm],cx.dm)">{{cx.btnmc}}</el-button>
                  </el-col>
                </el-row>
              </template>
              <template v-else-if="cx.type=='select'">
                <!-- 取常量值 optype=true  取store值 optype=!true -->
                <el-select
                  v-model="dialogData[cx.dm]"
                  filterable
                  v-if="cx.optype"
                  clearable
                  :disabled="cx.dis||dialogData[cx.dm+'dis']"
                  placeholder="请选择"
                  @change="linkChange(cx,dialogData[cx.dm],dialogData)">
                  <el-option
                    v-for="item in $cdata.options[cx.dm]"
                    :key="item.dm"
                    :label="item.dm+' - '+item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="dialogData[cx.dm]"
                  filterable
                  v-else
                  clearable
                  :disabled="dialogData[cx.dm+'dis']||cx.dis"
                  placeholder="请选择"
                  @change="linkChange(cx,dialogData[cx.dm],dialogData)">
                  <el-option
                    v-for="(item,index) in $store.state[cx.dm]"
                    :key="index"
                    v-show="item.sfyx == 1||item.sfyx==undefined"
                    :label="item.dm+' - '+item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="cx.type=='datePicker'">
                <el-date-picker
                  v-model="dialogData[cx.dm]"
                  :disabled="cx.dis"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </template>
              <template v-else-if="cx.type=='datetimePicker'">
                <el-date-picker
                  v-model="dialogData[cx.dm]"
                  :disabled="cx.dis"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                ></el-date-picker>
              </template>
              <template v-else-if="cx.type=='double'">
                <div class="double-box">
                  <div class="double">
                    <el-date-picker
                      v-model="dialogData[cx.children[0].dm]"
                      :type="cx.children[0].type"
                      placeholder="选择开始日期"
                    ></el-date-picker>
                  </div>
                  <div>-</div>
                  <div class="double">
                    <el-date-picker
                      v-model="dialogData[cx.children[1].dm]"
                      :type="cx.children[1].type"
                      placeholder="选择结束日期"
                    ></el-date-picker>
                  </div>
                </div>
              </template>
              <template v-else-if="cx.type=='radio'">
                <el-radio-group v-model="dialogData[cx.dm]" @change="radioChange" class="form-radio" :disabled="cx.dis">
                  <el-radio
                    :label="item.dm"
                    v-for="(item,ind) in $store.state[cx.dm]"
                    :key="ind"
                  >{{item.mc}}</el-radio>
                </el-radio-group>
              </template>
              <template v-else-if="cx.type=='textarea'">
                <el-input
                  type="textarea"
                  :rows="1"
                  :disabled="cx.dis"
                  placeholder="请输入内容"
                  v-model="dialogData[cx.dm]">
                </el-input>
              </template>
            </el-form-item>
            <template v-if="cx.type=='line'">
                <span class="divider-text">{{cx.title}}</span>
                <el-divider></el-divider>
            </template>
            <template v-else-if="cx.type=='checkbox'">
              <el-checkbox v-model="dialogData[cx.dm]" :true-label="cx.trueLabel" :false-label="cx.falseLabel">{{cx.mc}}</el-checkbox>
            </template>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <div class="detail-table">
      <span class="divider-text">{{'出入境信息'}}</span><el-divider></el-divider>
      <el-row type="flex">
        <el-col :span="20">
          <Table
          class="gt-table"
          :lbData="$cdata.sjhj.gtsjrgcl.inLb"
          :isSelect="false"
          :plBtn="$cdata.sjhj.gtsjrgcl.inPlBtn"
          :lbBtn="lbBtn"
          :isHighlight="false"
          :btnIsCheck="btnIsCheck"
          :LbDisable="dialogType=='ck'"
          :clearSort="clearSort"
          @plFnc="plFnc"
          @blFnc="blFnc"
          @pageSizeFnc="pageSizeFnc"
          @pageNumFnc="pageNumFnc"
          @sortChange="sortChange"
          @lbSpecialBtnFnc="lbSpecialBtnFnc"
          :tableData="tableData"
        ></Table>
        </el-col>
        <el-col :span="4" class="colum-btn">
          <!-- <div> -->
            <el-button :disabled="dialogType=='ck'" v-if="dialogType!='ck'||(dialogType=='ck'&&dialogData.cljg=='1')" size="mini" :type="'success'" round @click="handleFun('1')">入库</el-button>
            <el-button :disabled="dialogType=='ck'" v-if="dialogType!='ck'||(dialogType=='ck'&&dialogData.cljg=='0')" size="mini" :type="'primary'" round @click="handleFun('0')">无效</el-button>
          <!-- </div> -->
        </el-col>
    </el-row>
    </div>
    <div class="page-btn-box">
      <el-button size="mini" type="info" round @click="cancel">关闭</el-button>
    </div>
    <Dialog
      width="1300px"
      :isShowDialog="isShowDialog"
      :title="dialogTitleRule"
      :appendtobody="true"
      @hideDialog="isShowDialog=false"
      :top="'8vh'">
      <FormRule
      :cxData="labelData"
      ref="gthandForm"
      :dialogType="dialogTypeRule"
      :dialogData="dialogDataRule"
      @dialogCancel="isShowDialog=false"
      @dialogSave="dialogSave"
      ></FormRule>
      </Dialog>
  </div>
</template>
<script>
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import FormRule from "@/components/FormRule.vue";
export default {
  components: { Table,Dialog,FormRule },
  props: {
    cxData: {
      type: Array,
      default: () => []
    },
    // 【内层列表tab】
    page: {
      type: String,
      default: ""
    },
    dialogType: {
      type: String,
      default: ""
    },
    dialogData: {
      type: Object,
      default: () => {}
    },
    joinFlag: {
      type: Boolean,
      default: true
    },
    joinZf:{
      type: Boolean,
      default: true
    },
    editAllJz:{
      type: Boolean,
      default: false,
    },
    rulsName:{
      type:String,
      default:''
    },
    //弹窗自定义名称
    diaCus:{
      type:String,
      default:''
    },
  },
  data() {
    return {
      rules:{},
      isJoinZf:false,
      btnIsCheck:'',
      isSfyx:'',
      cx: {
        pd: {},
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
      crjwyid:'',
      gtwyid:'',
      lbBtn:[],
      //二级弹窗
      dialogTitleRule:'',
      dialogTypeRule:'',
      dialogDataRule:{},
      labelData:[],
      isShowDialog:false,
      editId:''
    };
  },
  watch: {
    joinFlag(val){
      console.log('状态',val)
      this.isJoinFlag = val;
    },
  },
  mounted() {
    console.log('plBtn',this.$cdata.sjhj.gtsjrgcl.inPlBtn)
    if(this.page == '2'){
      this.btnIsCheck = this.dialogData.crjwyid
    }else{
      this.btnIsCheck = ''
    }
    if(this.page == '1'){this.isSfyx = '0';this.lbBtn = this.$cdata.sjhj.gtsjrgcl.inLbBtn;this.getTable(true)}
    if(this.page == '2'){this.isSfyx = '1';this.lbBtn = this.$cdata.sjhj.gtsjrgcl.inLbCkBtn;this.getTable(true)}
  },
  methods: {
    //此详情页无用
    save(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(valid){
              this.$emit("dialogSave", {
                type: this.dialogType,
                data: this.dialogData,
                btnType: type
              });
            }else {
              console.log("error submit!!");
              return false;
            }
        } 
      });
    },
    //移除表单校验
    clearValid() {
      this.$refs['form'].clearValidate();
    },
    radioChange(val){
      this.$emit("radioChange",val);
    },
    linkChange(key, val, dialogData) {
      this.$emit("formLcFnc", { key: key, data: val, obj: dialogData });
    },
    //input联合button的点击事件
    joinBtnFnc(data,value,key){
      console.log('hecha',data,value,key)
      let p={
        gtwyid:data.gtwyid,
        zjhm:value
      }
      this.$api.post(this.$api.aport4 + '/gtrg/HeCha',p,r=>{
        console.log(r)
        this.getTable(true)
        // if(r.code == '0'){
        //   this.$message({
        //     message: "没有出入境信息，请手动处理",
        //     duration:13000,
        //     showClose: true,
        //     type: "warning"
        //   });
        // }else if(r.code == '1'){
        //   this.isSfyx = '1'
        //   this.getTable(true)
        // }else if(r.code == '2'){
        //   this.isSfyx = '0'
        //   this.getTable(true)
        // }
      })
      this.$emit('joinBtnFnc',{data:data,value:value,key:key})
    },
    //新增&编辑
    dialogSave(data){
      if(data.type == 'xz'){
        this.xzSave(data.data);
      }else if(data.type=='edit'){
        this.editSave(data.data);
      }
    },
    xzSave(data){
      let p=data;
      p.received_personnel = this.$store.state.user.xm
      p.received_number = this.$store.state.user.userId
      p.receiver = this.$store.state.user.bmbh
      p.gtwyid = this.dialogData.gtwyid
      p.crjwyid = this.crjwyid
      this.$api.post(this.$api.aport4 + '/gtrg/AddCrjxx',p,r=>{
        this.$message({
          message: r.message,
          duration: 8000,
          showClose: true,
          type: "success"
        });
        this.getTable(true)
        this.isShowDialog = false
      })
    },
    editSave(data){
      let p=data;
      p.gtwyid = this.dialogData.gtwyid
      p.crjwyid = this.editId
      this.$api.post(this.$api.aport4 + '/gtrg/UpdateCrjxx',p,r=>{
        this.$message({
          message: r.message,
          duration: 8000,
          showClose: true,
          type: "success"
        });
        this.getTable(true)
        this.isShowDialog = false
      })
      console.log('edit',p)
    },
    //批量按钮
    plFnc(data){
      console.log(data)
      this.dialogTitleRule = data.menu_name
      this.dialogTypeRule = data.py
      if(this.dialogTypeRule == 'xz'){
        this.labelData = this.$cdata.sjhj.gtsjrgcl.inXzDia;
        this.dialogDataRule = {}
      }
      this.isShowDialog=true
      this.$refs.gthandForm.clearValid();
    },
    //列表内按钮
    blFnc(data){
      this.dialogTitleRule = data.btn.button_name,
      this.dialogTypeRule = data.btn.button_type
      this.labelData = this.$cdata.sjhj.gtsjrgcl.inXzDia
      // this.dialogDataRule = Object.assign({},data.data)
      if(!data.double){
        this.editId = data.data.crjwyid
        // console.log('==',data.data.crjwyid)
        let p={
          crjwyid:data.data.crjwyid,
          gtwyid:this.dialogData.gtwyid
        }
        this.$api.post(this.$api.aport4+'/gtrg/getCrjxxEnity',p,r=>{
          this.dialogDataRule = r
          this.isShowDialog = true
          this.$refs.gthandForm.clearValid();
        })
        
      }
    },
    //单击行
    // rowClick(data){
    //   this.crjwyid = data.row.crjwyid
    // },
    lbSpecialBtnFnc(data){
      this.crjwyid = data.data
    },
    sortChange(data){
      this.cx.order = data.prop;
      this.cx.direction = data.direction;
      this.getTable();
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
    // 查询用户列表
    getTable(flag) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      this.cx.pd.gtwyid = this.dialogData.gtwyid
      this.cx.pd.sfyx = this.isSfyx;
      this.$api.post(this.$api.aport4 + "/gtrg/getCrjxx", this.cx, r => {
        this.tableData = r;
      });
    },
    //入库&&无效
    handleFun(val){
      let p={
        cljg:val,
        crjwyid:this.crjwyid,
        gtwyid:this.dialogData.gtwyid,
        zjhm:this.dialogData.gt_passportno
      }
      if(this.tableData.list.length!=0&&this.crjwyid==''){
        this.$confirm('您未选择出入境信息，确定处理吗？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$api.post(this.$api.aport4+'/gtrg/Bcxx',p,r=>{
            console.log(r)
            this.$message({
              message: '处理成功',
              showClose: true,
              duration:8000,
              type: "success"
            });
            if(this.dialogType == 'cl'){
              this.$emit('clHandle')
            }else{
              this.$emit("dialogHandleCancel");
            }
          })
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消处理'
          })
        })
      }else{
        this.$api.post(this.$api.aport4+'/gtrg/Bcxx',p,r=>{
          console.log(r)
          this.$message({
            message: '处理成功',
            showClose: true,
            duration:8000,
            type: "success"
          });
          if(this.dialogType == 'cl'){
            this.$emit('clHandle')
          }else{
            this.$emit("dialogHandleCancel");
          }
        })
      }
    },
    cancel() {
      this.$emit("dialogCancel");
    }
  }
};
</script>
<style scoped>
.form {
  padding: 15px 15px 50x;
  border-bottom: 1px solid #295287;
  margin-bottom: 20px;
  color: #e1e8ee;
}
.cx-btn {
  margin-bottom: 18px;
}
.double-box {
  display: flex;
  justify-content: space-between;
}
.double {
  width: 48%;
}
.color-part{
  border-top: 1px solid #eee;
  padding: 10px 15px 5px 15px!important;
}
.transfer{
    display: flex;
    justify-content: center;
    width: 563px;
    /* text-align: center; */
}
</style>