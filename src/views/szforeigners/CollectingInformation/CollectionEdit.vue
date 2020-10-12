<template>
    <div>
    <el-row>
       <Jbxx
        :dialogType="dialogType"
        :dialogData="jbxxdiaData"
        :dialogImgData="dialogImgData"
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
              dialogImgData: {
                type: Array,
                default: () => []
              },
             
       },
        data(){
           return{
             
           }
        },
        mounted(){
            console.log(this.jbxxdiaData,'--6');
        },
        methods:{
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
               console.log(this.jbxxdiaData,'=========');
                 this.$emit('dialogDis',{
                        data: this.jbxxdiaData,
                    })
                },
        }
}
</script>