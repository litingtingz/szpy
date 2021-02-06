<template>
  <div>
    <el-form
      :model="dialogData"
      status-icon
      :rules="rules"
      size="mini"
      ref="form"
      :label-width="labelWidth"
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
                  :value-format="cx.dateType=='dateJ'?'yyyyMMdd':'yyyy-MM-dd'"
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
    <div class="page-btn-box" v-if="dialogType=='ck'">
      <el-button size="mini" type="info" round @click="cancel">关闭</el-button>
    </div>
    <div class="page-btn-box" v-else>
      <el-button size="mini" type="primary" round @click="save('form')">保存</el-button>
      <el-button size="mini" type="info" round @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
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
    labelWidth:{
      type:String,
      default:'137px'
    }
  },
  data(){
    return{
      rules:(this.rulsName=='gthd'&&this.dialogType!='ck')?{
        crj_name: [{ required: true, message: "此项必填", trigger: "blur" }],
        crj_nationality: [{ required: true, message: "此项必填", trigger: "blur" }],
      }:(this.rulsName=='wblztx'&&this.dialogType=='xz')?{
        givenName: [{ required: true, message: "此项必填", trigger: "blur" }],
        gender: [{ required: true, message: "此项必填", trigger: "blur" }],
        birthday: [{ required: true, message: "此项必填", trigger: "blur" }],
        nationality: [{ required: true, message: "此项必填", trigger: "blur" }],
        passportType: [{ required: true, message: "此项必填", trigger: "blur" }],
        passportno: [{ required: true, message: "此项必填", trigger: "blur" }],
        phone: [{ required: true, message: "此项必填", trigger: "blur" }],
        address: [{ required: true, message: "此项必填", trigger: "blur" }],
        suboffice: [{ required: true, message: "此项必填", trigger: "blur" }],
        policestation: [{ required: true, message: "此项必填", trigger: "blur" }],
      }:{},
    }
  },
  mounted(){},
  methods:{
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
      this.$emit('joinBtnFnc',{data:data,value:value,key:key})
    },
    cancel() {
      this.$emit("dialogCancel");
    }
  }
}
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