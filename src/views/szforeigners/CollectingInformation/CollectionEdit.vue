<template>
    <div>
    <el-row>
        <div style="text-align:right;margin-bottom:10px" v-if='bntshow'>
            <el-button type="primary" size="mini" @click="getnext(0)">上一条</el-button> 
            <el-button type="primary" size="mini" @click="getnext(1)">下一条</el-button>
        </div>
       <Jbxx
        :dialogType="dialogType"
        :dialogData="jbxxdiaDataN"
        :dialogImgData="dialogImgData"
        :seachData="seachData"
        :cxData="$cdata.foreigners.znCollectlistIntranet.jbxxEdit"
        @dialogSave="dialogSave"
        ref="jbxx"
      ></Jbxx>
    
         <el-row :gutter="0" type="flex" align="middle" justify="center" style="margin-bottom:10px;padding-top:10px;border-top:1px solid #eeeeee">
           <el-col :span="10" style="text-align:left;font-size:16px;font-weight:bold">临住信息列表</el-col>
           <el-col :span="12">
              <div class="double-box">
                  <div class="double">
                    <el-date-picker
                      v-model="cx1.pd.startTime"
                      type="date"
                      placeholder="开始时间"
                      value-format="yyyy-MM-dd"
                      size="mini"
                    ></el-date-picker>
                  </div>
                  <div>-</div>
                  <div class="double">
                    <el-date-picker
                      v-model="cx1.pd.endTime"
                      type="date"
                      placeholder="结束时间"
                      value-format="yyyy-MM-dd"
                      size="mini"
                    ></el-date-picker>
                  </div>
                </div>

           </el-col>
             <el-col :span="2" style="text-align:right"><el-button type="primary" size="mini" @click="getTable1">搜索</el-button></el-col>
         </el-row>
     
        <Table
          :lbData="$cdata.foreigners.znCollectlistIntranet.lzData"
          :isSelect="false"
          :isPl="false"
          :isEdit="false"
          :clearSort="clearSort"
          @pageSizeFnc="pageSizeFnc"
          @pageNumFnc="pageNumFnc"
          @sortChange="sortChange"
          @rowClick="rowClick"
          :tableData="jbxxtableData"
          ref="jbxxTable"
        ></Table>

      <div class="page-btn-box">
        <el-button size="mini" round type="primary"  v-if="dialogType!='ck'" @click="save('form')">保存</el-button>
        <el-button size="mini" round type="danger"  v-if="dialogType!='ck'" @click="setdis">无效数据</el-button>
        <el-button size="mini" round type="info" @click="cancel">取消</el-button>
      </div>
     </el-row>
    </div>
</template>
<script>
import Jbxx from "@/components/CzxxwhEdit/jbxx.vue";
import Table from "@/components/Table.vue";
export default {
      components: { Jbxx,Table },
       props:{
              jbxxdiaData:{
                  type: Object,
                  default: () => {}
               },
              dialogType:{
                type: String,
                default: ""
              },
              seachData:{
                 type: Object,
                 default: () => {}
              },
            
             
       },
        data(){
           return{
             dialogImgData:[],
             jbxxtableData:{
              list: [],
              total: 0,
              pageSize: 10,
              pageNum: 1
            },
            jbxxdiaDataN:this.jbxxdiaData,
            cx1: {
              pd:{},
              pageSize: 10,
              pageNum: 1,
            },
            clearSort:0,
            bntshow:true,
            pages:1, // 每页记录数
            pagen:this.seachData.pageS, // 页码（第几页）
            total:-1, // 总记录数
            isHandle: false // 当前数据是否已处理
           }
        },
        mounted(){
      
            var obj={};
            obj.type='y1001';
            obj.zp=this.jbxxdiaDataN.imgpath
            this.dialogImgData.push(obj);
            if(this.pages){this.bntshow=true;}else{this.bntshow=false;}
            this.bengin();
            
        },
        methods:{
          bengin(){
            if(this.jbxxdiaDataN){
            this.cx1.pd.zjhm=this.jbxxdiaDataN.passportNumber
            this.cx1.pd.gjdq=this.jbxxdiaDataN.countryCode
            this.getTable1(true);
            }
          },
           getnext(t){

            if(t==0){
                if (this.pagen <= 1) {
                    this.alertNoData();
                    return;
                }
                //上一条
                this.pagen=this.pagen-1
            }else if(t==1) {
                if (this.total != -1 && this.pagen >= this.total) {
                    this.alertNoData();
                    return;
                }
                //下一条 如果当前记录已处理（保存/无效数据），下一条还是当前页码
                if (! this.isHandle) {
                    this.pagen= this.pagen+1
                }
            }
          
             let p={
               'pageNum':this.pagen,
               'pageSize':this.pages,
               'pd':this.seachData.pd,
               'queryParams':this.seachData.queryParams,
               'user':this.seachData.user,
             }

                this.$api.post(
                  this.$api.aport5 + "/znCollectlistIntranet/listData",
                  p,
                  r => {
                      this.total = r.total;

                    if(r.records.length==0){
                        this.alertNoData();
                    }else{
                        this.isHandle = false;
                      this.jbxxdiaDataN = r.records[r.records.length-1];
                      this.dialogImgData=[];
                      if(this.jbxxdiaDataN){
                      var obj={};
                      obj.type='y1001';
                      obj.zp=this.jbxxdiaDataN.imgpath
                      this.dialogImgData.push(obj);
                      }
                  
                    }
                  }
                );
           

               this.bengin();
            },
              dialogSave(data){
                    this.$emit('dialogSave',{
                        type: data.type,
                        data: data.data,
                        editPage:this.editPage
                    })
                },
             save(){
                 this.isHandle = true;
                 this.$refs['jbxx'].save('form')
             },
             
             cancel() {
               this.$emit("dialogCancel");
             },
             setdis() {
                 this.isHandle = true;
                this.$emit('dialogDis',{
                    data: this.jbxxdiaDataN,
                 })
             },
              pageSizeFnc(data) {
                this.cx1.pageSize = data;
                this.getTable1();
              },
              rowClick(data){
               console.log(data);
              },
              getTable1(flag){
              if(flag){this.clearSort = new Date().getTime();delete this.cx1.order;delete this.cx1.direction }
                this.cx1.queryParams=this.cx1.pd;
                this.cx1.queryParams.flag='1';
                this.$api.post(this.$api.aport5 + "/znCollectlistIntranet/sjlistData", this.cx1, r => {
                  this.jbxxtableData.list = r.records;
                  this.jbxxtableData.total = r.total;
                 
                });
            },
             pageNumFnc(data) {
                this.cx1.pageNum = data;
                this.getTable1();
            },
             sortChange(data){
              this.cx1.order = data.prop;
              this.cx1.direction = data.direction;
             },
             alertNoData() {
                 this.$message({
                     message: "没有数据了!",
                     duration: 8000,
                     showClose: true,
                     type: "success"
                 });
             }
        }
}
</script>
<style  scoped>
.double-box {
  display: flex;
  justify-content: space-between;
}
.double {
  width: 48%;
}
</style>