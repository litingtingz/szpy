<template>
  <div class="page">
    <Inquire 
    :cxData="$cdata.czxx.bhqs.cx"
    :cxCheck="$cdata.czxx.bhqs.cxCheck" 
    :cxButton="$cdata.czxx.bhqs.cxButton"
    :pd="cx" 
    :cxPara="cx" 
    @cxFnc="cxFnc" 
    @lcFnc="lcFnc"
    @quickView="quickView"
    @dateChangeFun="dateChangeFun"></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item tabImgActive_1 hand">常住变化趋势</div>
    </div>
    <div class="page-box">
      <div style="padding:20px 0px 0 20px">
        <p class="trend-title">计算维度</p>
        <div class="trend-radio">
          <el-radio-group v-model="analysisTypeCx" @change="calcuFun()">
            <el-radio v-for="(item,ind) in analysisType" :key="ind" :label="item.dm">{{item.mc}}</el-radio>
          </el-radio-group>
          <div class="trend-page-btn-box">
            <el-button size="mini" type="success" :icon="numChange==true?'el-icon-open':'el-icon-turn-off'" circle style="font-size:16px" :title="numChange==true?'关闭数字':'展示数字'" @click="numCF"></el-button>
            <el-button size="small" class="cx-btn" type="success" round @click="btnClick(btnText)">{{btnText}}</el-button>
          </div>
        </div>
        <Charts :key="timeRange" :optData="optData" :Cheight="'400px'" @chartClick="chartClick"></Charts>
      </div>
    </div>
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
       <el-checkbox  class="quire-check" v-model="tablePd.sfqc" :true-label="'1'" :false-label="''" :checked="true" @change="checkChange">是否去重</el-checkbox>
      <CzTable
      :key="timeRangeD"
      :pd="tablePd"
      :dialogType="dialogType"
      :dialogData="dialogData"
      @dialogCancel="isShowDialog=false"></CzTable>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Dialog from "@/components/Dialog.vue";
import Charts from "@/components/Charts.vue";
import CzTable from "./CzTable.vue"
export default {
  components: { Inquire,Charts,Dialog,CzTable },
  data() {
    return {
      cx: {
        resident_type:'',
        history_time_begin:'',
        history_time_end:'',
        time_begin:'',
        time_end:''
      },
      timeRange:0,
      timeRangeD:0,
      analysisType:[
        {
          mc:'性别',
          dm:'gender'
        },
        {
          mc:'国家地区',
          dm:'nationality'
        },
        {
          mc:'证件种类',
          dm:'paper_type'
        },
        {
          mc:'签证种类',
          dm:'visa_type'
        },
        {
          mc:'身份',
          dm:'degree_code'
        },
        {
          mc:'人员地域类别',
          dm:'personnel_area_type'
        },
        {
          mc:'居留事由',
          dm:'reside_reason'
        },
        {
          mc:'年龄段',
          dm:'age'
        },
      ],
      analysisTypeCx:'',
      btnText:'合并',
      optData:{},
      //弹窗
      tablePd:{},
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: [],
      numChange:true,
    };
  },
  mounted() {
    // this.cx.history_time_begin = this.$fnc.format(new Date(new Date().getTime() - 30*24*60*60*1000),'yyyy-mm-dd');
    this.cx.history_time_begin = '2017-07-01'
    this.cx.history_time_end = this.$fnc.format(new Date().getTime(),'yyyy-mm-dd');
    this.$store.dispatch("aGetGender");
    this.$store.dispatch("aGetPassport");
    this.$store.dispatch("aGetNation");
    this.$store.dispatch("aGetDM",'qzzl');
    this.$store.dispatch("aGetDMPro",'dm_jwrysf');
    this.$store.dispatch('aGetDM', "wgr_sqsy");//入境事由
    this.$store.dispatch('aGetDM', "jltlsy");//居留事由
    // this.$store.dispatch("aGetDMPro",'dm_pcswlb');
    this.$store.dispatch("aGetDMPro",'dm_rydylbb');//人员地域类别
    this.$cdata.cusCountry();
    this.$cdata.jzdZrq()
    // this.chartShow();
    this.getSpInit();
  },
  computed: {
    ScreenChange() {
      return {left:this.$store.state.leftWid,right:this.$store.state.rightWid};
    }
  },
  watch:{
    ScreenChange(newVal,oldVal){
      console.log('===',newVal,oldVal)
      this.timeRange = new Date().getTime()
    }
  },
  methods: {
    getSpInit(){
      this.$cdata.qxgl.getSjBm(this.$store.state.user.bmbh).then(data => {
        this.$store.dispatch("aGetssdw", {
          bmbh: "320500000000",
          type: "ssfj",
        });
        if (this.$store.state.user.jb == 2) {
          if(data.fj){
            this.cx.jzd_ssfj = data.fj
            this.cx.gzd_ssfj = data.fj
          }else{
            this.cx.jzd_ssfj = data.bmbh
            this.cx.gzd_ssfj = data.fj
          }
          this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "sspcs" });
          this.cx.jzd_ssfjdis = true;
          this.cx.gzd_ssfjdis = true;
          this.getChart();
        } else if (this.$store.state.user.jb == 3) {
          this.$store.dispatch("aGetssdw", { bmbh: data.fj, type: "sspcs" });
          this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "zrq" });
          this.cx.jzd_ssfj = data.fj;
          this.cx.gzd_ssfj = data.fj;
          this.cx.workplace_police_station = data.bmbh;
          this.cx.inhabi_police_station = data.bmbh;
          this.cx.jzd_ssfjdis = true;
          this.cx.gzd_ssfjdis = true;
          this.cx.workplace_police_stationdis = true;
          this.cx.inhabi_police_stationdis = true;
          this.getChart();
        }else{
          this.getChart();
        }
      });
    },
    // 获取查询参数
    cxFnc(data) {
      this.cx = data;
      this.cx.analysisType = this.analysisTypeCx
      this.getChart();
    },
    dateChangeFun(data){
      if((data.key == "time_begin" && data.value) || (data.key == "time_end" && data.value)){
        this.cx.history_time_begin = ''
        this.cx.history_time_end = ''
      }
      if((data.key == "history_time_begin" && data.value) || (data.key == "history_time_end" && data.value)){
        this.cx.time_begin = ''
        this.cx.time_end = ''
      }
    },
    lcFnc(data) {
      console.log(data)
      if(data.key.dm == 'jzd_ssfj'){
        if(data.data == ""){
          data.obj.inhabi_police_station = "";
        }else if(data.obj.inhabi_police_station){
          data.obj.inhabi_police_station = "";
        }
        this.$store.dispatch("aGetssdw", { bmbh: data.data, type: "sspcs",ptype:'jzd'});
      }
      if(data.key.dm == "gzd_ssfj"){
        if(data.data == ""){
          data.obj.workplace_police_station = ""
        }else if(data.obj.workplace_police_station){
          data.obj.workplace_police_station = "";
        }
        this.$store.dispatch("aGetssdw", { bmbh: data.data, type: "sspcs",ptype:'gzd'});
      }
    },
    quickView(data){
      this.cx[data.item] = data.data
      // this.cx.timeUnit = data;
      this.getChart();
    },
    btnClick(data){
      if(data == '合并'){
        if(!this.analysisTypeCx){
          this.$message({
            message: '无拆分数据，无需合并！',
            duration: 13000,
            showClose: true,
            type: "warning"
          });
        }else{
          this.cx.analysisType = '';
          this.getChart();
          this.btnText="拆分"
        }
      }else if(data == '拆分'){
        this.cx.analysisType = this.analysisTypeCx
        this.getChart();
        this.btnText="合并"
      }
    },
    calcuFun(){
      this.cx.analysisType = this.analysisTypeCx
      this.getChart();
    },
    numCF(){
      this.numChange = !this.numChange
      this.getChart();
    },
    getChart(){
      this.$api.post(this.$api.aport4+'/residetrend/trendchart',this.cx,r=>{
        if(this.cx.analysisType){//多条线
          let double={
            type: 'line',
            smooth: 0.7,
            symbolSize: 8,
            symbol: "emptyCircle", //设定为实心点
            label: {
              show: this.numChange,
              fontSize: 14,
              position:'right',
              // color: "#000",
              fontWeight:'bold'
            },
            lineStyle: {
              width: 3,
            },
          }
          let dataReal = [];
          r.series.forEach(item => {
            let dataItem =  Object.assign({},item,double)
            dataReal.push(dataItem)
          })
          this.chartShow(r.xAxis.data,dataReal,r.legend.data)
        }else{//单条线
          let single = [
                {
                  type: "line",
                  smooth: 0.7,
                  symbolSize: 8,
                  symbol: "emptyCircle", //设定为实心点
                  itemStyle: {
                    normal: {
                      color: "#5486F9",
                      borderWidth: 2
                    }
                  },
                  label: {
                    show: this.numChange,
                    fontSize: 14,
                    color: "#000",
                    fontWeight:'bold'
                  },
                  lineStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                          offset: 0, color: '#862CFE' // 0% 处的颜色
                      }, {
                          offset: 1, color: '#5C4CFC' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    },
                    width: 5,
                    shadowColor: "rgba(134,44,254, 0.7)",
                    shadowBlur: 20,
                    shadowOffsetY: 10,
                    shadowOffsetX: 10,
                  },
                  data: r.series[0].data,
                }
              ]
          this.chartShow(r.xAxis.data,single,[])
        }
      })
    },
    chartShow(xdata,series,legend) {
      this.optData = {
        grid: {
          x: 45,
          y: 40,
          x2: 70
        },
        color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#FCAC62', '#F86948', '#30BFDA','#AA30DF','#30BFDA', '#0FACFA','#749f83'],
        // color:['#FCAC62','#F86948', '#AA30DF', '#30BFDA', '#0FACFA','#749f83',  '#ca8622', '#bda29a','#6e7074', '#1ACCE8', '#c4ccd3'],
        legend: {
          data: legend,
          icon:'pin'
        },
        xAxis: {
          type: "category",
          data: xdata,
          boundaryGap: false,
          axisPointer: {
            type: "none"
          },
          axisLine: {
            //去除x坐标轴
            lineStyle: {
              color: "#eee"
            }
          },
          axisLabel: {
            show: true, //这行代码控制着坐标轴x轴的文字是否显示
            color: "#919294",
            fontSize: 12
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "50%"],
          axisLine: {
            //去除y坐标轴
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            show: true, //这行代码控制着坐标轴的文字是否显示
            color: "#919294",
            fontSize: 12
          },
          axisPointer: {
            //去除鼠标hover样式
            type: "none"
          },
          axisTick: {
            //去掉坐标刻度线
            show: false
          },
          splitLine: {
            //网格线
            show: true,
            lineStyle: {
              color: ["#ddd"],
              type: "dashed"
            }
          }
        },
        series: series
      };
      this.timeRange = new Date().getTime();
    },
    checkChange(){
      this.timeRangeD = new Date().getTime()
    },
    chartClick(data){
      this.tablePd = Object.assign({sfqc:'1'},this.cx)
      this.tablePd.xAxis = data.name
      this.tablePd.id = data.seriesId
      this.dialogTitle="列表"
      this.isShowDialog = true
      this.timeRangeD = new Date().getTime()
    },
  }
};
</script>