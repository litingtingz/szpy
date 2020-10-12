<template>
    <div>
    <el-row>
        <div style="text-align:right;margin-bottom:10px">
            <el-button type="primary" size="mini" @click="getnext(0)">上一条</el-button> 
            <el-button type="primary" size="mini" @click="getnext(1)">下一条</el-button>
        </div>
       <Jbxx
        :dialogType="dialogType"
        :dialogData="jbxxdiaData"
        :dialogImgData="dialogImgData"
        :seachData="seachData"
        :cxData="$cdata.foreigners.znCollectlistIntranet.jbxxEdit"
        @dialogSave="dialogSave"
        ref="jbxx"
      ></Jbxx>
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
export default {
      components: { Jbxx },
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
           }
        },
        mounted(){
      
            var obj={};
            obj.type='y1001';
            obj.zp=this.jbxxdiaData.imgpath
            this.dialogImgData.push(obj);
        },
        methods:{
           getnext(t){
            
            if(t==0){
                //上一条
               this.seachData.pageSize=this.seachData.pageSize-1
            }else if(t==1)
            {
                //下一条
                this.seachData.pageSize=this.seachData.pageSize+1
            }
          if(this.seachData.pageNum!=0){
                this.$api.post(
                  this.$api.aport5 + "/znCollectlistIntranet/listData",
                  this.seachData,
                  r => {
                    
                    if(this.seachData.pageSize>r.records.length){
                       this.$message({
                         message: "没有数据了!",
                         duration: 8000,
                         showClose: true,
                         type: "success"
                        });
                    }else{
                      this.jbxxdiaData = r.records[r.records.length-1];
                      this.dialogImgData=[];
                      if(this.jbxxdiaData){
                      var obj={};
                      obj.type='y1001';
                      obj.zp=this.jbxxdiaData.imgpath
                      this.dialogImgData.push(obj);
                      }
                  
                    }
                  }
                );
              }else{
                this.$message({
                      message: "没有数据了!",
                      duration: 8000,
                      showClose: true,
                      type: "success"
                    });
               }
            },
              dialogSave(data){
                    this.$emit('dialogSave',{
                        type: data.type,
                        data: data.data,
                        editPage:this.editPage
                    })
                   
                },
               save(){
                 this.$refs['jbxx'].save('form')
                },
                cancel() {
                this.$emit("dialogCancel");
                },
                setdis() {
             
                 this.$emit('dialogDis',{
                        data: this.jbxxdiaData,
                    })
                },
        }
}
</script>