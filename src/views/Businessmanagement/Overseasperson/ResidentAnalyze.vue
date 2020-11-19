<template>
  <div class="page">
    <Inquire 
    :cxData="$cdata.czxx.zhfx.cx" 
    :pd="cx.pd"
    :cxCheck="$cdata.czxx.zhfx.cxCheck"   
    :cxPara="cx" 
    @lcFnc="lcFnc"
    @cxFnc="cxFnc"
    @dateChangeFun="dateChangeFun"></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item hand" :class="tab=='1'?'tabImgActive_1':'tabImg_1'" @click="tabTopClick('1')">
        列表
      </div>
      <div class="tab-top-item hand" :class="tab=='2'?'tabImgActive_2':'tabImg_2'" @click="tabTopClick('2')">
        图表
      </div>
    </div>
    <div class="page-box">
      <el-row v-if="tab=='1'">
        <p class="trend-title mb-12">统计类别</p>
        <el-checkbox-group class="statistics-type" v-model="cx.pd.statiType">
          <el-checkbox v-for="(item,ind) in checkList" :key="ind" :label="item.dm">{{item.mc}}</el-checkbox>
        </el-checkbox-group>
        <Table
          :lbData="lbData"
          :isSelect="true"
          :lbBtn="lbBtn"
          :plBtn="plBtn"
          :tableData="tableData"
          :refName="'czzhfx'"
          :selection="selection"
          :pageSizeArr="pageSizeArr"
          :clearSort="clearSort"
          :expData="cx"
          :expUrl="$api.aport2+''"
          :tableMerge="tableMerge"
          @plFnc="plFnc"
          @pageSizeFnc="pageSizeFnc"
          @pageNumFnc="pageNumFnc"
          @blFnc="blFnc"
          @SelectionChange="SelectionChange"
          @rowClick="rowClick"
          @rowDbClick="blFnc"
          @sortChange="sortChange"
          @transSaveFnc="transSaveFnc"
        ></Table>
      </el-row>
      <el-row v-if="tab=='2'">
        
         <!-- TOP -->
        <el-col :xl="12" :lg="12" class="pad-15">
          <p class="chart-title mb-10">TOP</p>
          <div class="chart-outer ml-10">
            <div class="chart-outer-label">分析维度</div>
            <el-select class="chart-select" v-model="analyArr.type_4" @change="analyFun(4)" placeholder="请选择" size="medium">
              <el-option v-for="(item,ind) in analysis_3" :key="ind" :label="item.mc" :value="item.dm"></el-option>
            </el-select>
          </div>
          <div @click="chartDiaFun(4)"><Charts @chartAllClick="chartAllClick" :timeRange="timeRange_4" :optData="optData_4" :id="'4'"></Charts></div>
        </el-col>
        <!-- 变化趋势分析图 -->
        <!-- <el-col :xl="16" :lg="12" class="pad-15">
          <p class="chart-title mb-10">变化趋势分析图</p>
          <div class="chart-outer ml-10">
            <div class="chart-outer-label">分析维度</div>
            <el-select class="chart-select" v-model="analyArr.type_5" @change="analyFun(5)" placeholder="请选择" size="medium">
              <el-option v-for="(item,ind) in analysis_3" :key="ind" :label="item.mc" :value="item.dm"></el-option>
            </el-select>
          </div>
          <div @click="chartDiaFun(5)"><Charts @chartAllClick="chartAllClick" :key="timeRange_5" :optData="optData_5" :id="'5'"></Charts></div>
        </el-col> -->
        
        <!-- 国家地区 -->
        <el-col :xl="12" :lg="12" class="pad-15">
          <p class="chart-title mb-10">占比图</p>
          <div class="chart-outer ml-10">
            <div class="chart-outer-label">分析维度</div>
            <el-select class="chart-select" v-model="analyArr.type_3" @change="analyFun(3)" placeholder="请选择" size="medium">
              <el-option v-for="(item,ind) in analysis_3" :key="ind" :label="item.mc" :value="item.dm"></el-option>
            </el-select>
          </div>
          <div @click="chartDiaFun(3)"><Charts @chartAllClick="chartAllClick" :timeRange="timeRange_3" :optData="optData_3" :id="'3'"></Charts></div>
        </el-col>
        <!--  -->
        <el-col :xl="24" :lg="24" class="pad-15">
          <p class="chart-title mb-10">变化趋势分析图</p>
          <div class="chart-outer ml-10">
            <div class="chart-outer-label">分析维度</div>
            <el-select class="chart-select chart-ts"  v-model="analyArr.type_6" @change="analyFun(6)" placeholder="请选择" size="medium">
              <el-option v-for="(item,ind) in analysis_3" :key="ind" :label="item.mc" :value="item.dm"></el-option>
            </el-select>
          </div>
          <div @click="chartDiaFun(6)"><Charts @chartAllClick="chartAllClick" :key="timeRange_6" :Cheight="'400px'" :optData="optData_6" :id="'6'"></Charts></div>
        </el-col>
        <!-- 迁入量 -->
        <el-col :xl="12" :lg="12" class="pad-15">
          <p class="chart-title mb-10">迁入量</p>
          <div class="chart-outer ml-10">
            <div>
              <div class="chart-outer-label">分析维度</div>
              <el-select class="chart-select" v-model="analyArr.type_1" @change="analyFun(1)" placeholder="请选择" size="medium">
                <el-option v-for="(item,ind) in analysis_3" :key="ind" :label="item.mc" :value="item.dm"></el-option>
              </el-select>
            </div>
            <div style="margin-right: 70px;">
              <div class="chart-compare">同比：<span>{{InObj.y2y}}</span><i :class="InObj.y2y.includes('-')?'el-icon-bottom compare-icon icon-red':'el-icon-top compare-icon icon-green'"></i></div>
              <div class="chart-compare">环比：<span>{{InObj.m2m}}</span><i :class="InObj.m2m.includes('-')?'el-icon-bottom compare-icon icon-red':'el-icon-top compare-icon icon-green'"></i></div>
            </div>
          </div>
          <div @click="chartDiaFun(1)"><Charts :key="timeRange_1" :optData="optData_1" :id="'1'" @chartAllClick="chartAllClick"></Charts></div>
          <!-- <div class="chart-box">
            <div>
              <Charts
                :key="new Date().getTime()"
                :optData="optData_1_1"
                :id="'1_1'"
                :Cwidth="'125px'"
                :Cheight="'180px'"
              ></Charts>
              <div class="chart-tip">上期</div>
            </div>
            <div>
              <Charts
                :key="new Date().getTime()"
                :optData="optData_1_2"
                :id="'1_2'"
                :Cwidth="'125px'"
                :Cheight="'180px'"
              ></Charts>
              <div class="chart-tip">本期</div>
            </div>
            <div>
              <Charts
                :key="new Date().getTime()"
                :optData="optData_1_3"
                :id="'1_3'"
                :Cwidth="'125px'"
                :Cheight="'180px'"
              ></Charts>
              <div class="chart-tip">同期</div>
            </div>
          </div> -->
        </el-col>
        <!-- 迁出量 -->
        <el-col :xl="12" :lg="12" class="pad-15">
          <p class="chart-title mb-10">迁出量</p>
          <div class="chart-outer ml-10">
            <div>
              <div class="chart-outer-label">分析维度</div>
              <el-select class="chart-select" v-model="analyArr.type_2" @change="analyFun(2)" placeholder="请选择" size="medium">
                <el-option v-for="(item,ind) in analysis_3" :key="ind" :label="item.mc" :value="item.dm"></el-option>
              </el-select>
            </div>
            <div style="margin-right: 70px;">
              <div class="chart-compare">同比：<span>{{OutObj.y2y}}</span><i :class="OutObj.y2y.includes('-')?'el-icon-bottom compare-icon icon-red':'el-icon-top compare-icon icon-green'"></i></div>
              <div class="chart-compare">环比：<span>{{OutObj.m2m}}</span><i :class="OutObj.m2m.includes('-')?'el-icon-bottom compare-icon icon-red':'el-icon-top compare-icon icon-green'"></i></div>
            </div>
          </div>
          <div @click="chartDiaFun(2)"><Charts @chartAllClick="chartAllClick" :key="timeRange_2" :optData="optData_2" :id="'2'"></Charts></div>
          <!-- <div class="chart-box">
            <div>
              <Charts
                :key="new Date().getTime()"
                :optData="optData_2_1"
                :id="'2_1'"
                :Cwidth="'125px'"
                :Cheight="'180px'"
              ></Charts>
              <div class="chart-tip">上期</div>
            </div>
            <div>
              <Charts
                :key="new Date().getTime()"
                :optData="optData_2_2"
                :id="'2_2'"
                :Cwidth="'125px'"
                :Cheight="'180px'"
              ></Charts>
              <div class="chart-tip">本期</div>
            </div>
            <div>
              <Charts
                :key="new Date().getTime()"
                :optData="optData_2_3"
                :id="'2_3'"
                :Cwidth="'125px'"
                :Cheight="'180px'"
              ></Charts>
              <div class="chart-tip">同期</div>
            </div>
          </div> -->
        </el-col>
      </el-row>
    </div>
    <Dialog :isShowDialog="isShowDialog" :width="dialogType=='chart'?'90%':'1000px'" :class="dialogType=='chart'?'dia-height':''" :title="dialogTitle" @hideDialog="hideDialog">
      <CzTable
        v-if="dialogType == 'detail'"
        :key="timer"
        :pd="tablePd"
        :dialogType="dialogType"
        :dialogData="dialogData"
        :pageRef="pageRef"
        @dialogCancel="isShowDialog=false"></CzTable>
        <div v-else style="height:100%" ref="diacRef">
          <Charts  :Cheight="DiaHeight" :key="new Date().getTime()" :optData="optData_D"></Charts>
        </div>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Charts from "@/components/Charts.vue";
import Table from "@/components/Table.vue";
import CzTable from "../../AnalysisAndJudgment/AAJudge/CzTable.vue"
import Dialog from "@/components/Dialog.vue";

export default {
  components: { Inquire, Charts,Table,CzTable,Dialog },
  data() {
    return {
      cx: {
        pd: {
          statiType:[],
          resident_type:'',
          time_begin:'',
          time_end:'',
          history_time:'',
        },
        pageSize: 15,
        pageNum: 1,
      },
      InObj:{
        y2y:"",
        m2m:"",
      },
      OutObj:{
        y2y:"",
        m2m:"",
      },
      barGap:'90%',
      timeRange_1:0,
      timeRange_2:0,
      timeRange_3:0,
      timeRange_4:0,
      timeRange_5:0,
      timeRange_6:0,
      tab: "1",
      //列表数据
      lbData:this.$cdata.czxx.xxwhgl.lb,
      lbBtn: this.$cdata.czxx.zhfx.lbBtn,
			plBtn: this.$store.state.plBtn,
			pageSizeArr: [15, 100, 500],
      selection: [],
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
			},
      tableMerge:{},
      testArr2: [],
      testPosition1: 0,
      testPosition2: 0,

      clearSort:0,
      //列表统计
      checkList:[
        {
          dm:'gender',
          mc:'性别'
        },
        {
          dm:'nationality',
          mc:'国家地区'
        },
        {
          dm:'paper_type',
          mc:'证件种类'
        },
        {
          dm:'visa_type',
          mc:'签证种类'
        },
        {
          dm:'degree_code',
          mc:'身份'
        },
        {
          dm:'personnel_area_type',
          mc:'人员地域类别'
        },
        {
          dm:'age',
          mc:'年龄段'
        },
        {
          dm:'exit_entry_status',
          mc:'出入境状态'
        },
        {
          dm:'reside_reason',
          mc:'居留事由'
        },

        {
          dm:'jzd_ssfj',
          mc:'居住地分局'
        },
        {
          dm:'inhabi_police_station',
          mc:'居住地派出所'
        },
        {
          dm:'gzd_ssfj',
          mc:'工作地分局'
        },
        {
          dm:'workplace_police_station',
          mc:'工作地派出所'
        },
      ],
      tableHead:[
        {
          dm:'gender_desc',
          cm:'性别'
        },
        {
          dm:'nationality_desc',
          cm:'国家地区'
        },
        {
          dm:'paper_type_desc',
          cm:'证件种类'
        },
        {
          dm:'visa_type_desc',
          cm:'签证种类'
        },
        {
          dm:'degree_code_desc',
          cm:'身份'
        },
        {
          dm:'personnel_area_type_desc',
          cm:'人员地域类别'
        },
        {
          dm:'age',
          cm:'年龄段'
        },
        {
          dm:'exit_entry_status_desc',
          cm:'出入境状态'
        },
        {
          dm:'reside_reason_desc',
          cm:'居留事由'
        },
        {
          dm:'jzd_ssfj_desc',
          cm:'居住地分局'
        },
        {
          dm:'inhabi_police_station_desc',
          cm:'居住地派出所'
        },
        {
          dm:'gzd_ssfj_desc',
          cm:'工作地分局'
        },
        {
          dm:'workplace_police_station_desc',
          cm:'工作地派出所'
        },
      ],
      tableHeadReal:[
        {
          dm:'count',
          cm:'统计数量'
        },
      ],
      //弹窗
      tablePd:{},
      pageRef:'',
      timer:'',
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: [],
      //图表
      DiaHeight:'100%',
      analysis_3:[
        {
          dm:'gender',
          mc:'性别'
        },
        {
          dm:'nationality',
          mc:'国家地区'
        },
        {
          dm:'paper_type',
          mc:'证件种类'
        },
        {
          dm:'visa_type',
          mc:'签证种类'
        },
        {
          dm:'degree_code',
          mc:'身份'
        },
        {
          dm:'personnel_area_type',
          mc:'境外人员类别'
        },
        {
          dm:'age',
          mc:'年龄段'
        },
        {
          dm:'exit_entry_status',
          mc:'出入境状态'
        },
        {
          dm:'reside_reason',
          mc:'居留事由'
        },
        {
          dm:'jzd_ssfj',
          mc:'居住地分局'
        },
        {
          dm:'inhabi_police_station',
          mc:'居住地派出所'
        },
        {
          dm:'gzd_ssfj',
          mc:'工作地分局'
        },
        {
          dm:'workplace_police_station',
          mc:'工作地派出所'
        },
      ],
      sflbArr:[],
      analyArr:{
        type_1:'',
        type_2:'',
        type_3:'gender',
        type_4:'gender',
        type_5:'gender',
        type_6:'gender',
      },
      optData_D:{},
      optData_1:{},
      optData_1_1: {},
      optData_1_2: {},
      optData_1_3: {},

      optData_2:{},
      optData_2_1: {},
      optData_2_2: {},
      optData_2_3: {},

      optData_3: {},
      optData_4: {},
      optData_5: {},
      optData_6: {},
      chartType:0
    };
  },
  mounted() {
    this.cx.pd.history_time = this.$fnc.format(new Date().getTime(),'yyyy-mm-dd');
    this.$store.dispatch("aGetGender");
    this.$store.dispatch("aGetPassport");
    this.$store.dispatch("aGetNation");
    this.$store.dispatch("aGetBackstatus");
    this.$store.dispatch("aGetDM",'qzzl');
    this.$store.dispatch('aGetDM', "wgr_sqsy");//入境事由
    this.$store.dispatch('aGetDM', "jltlsy");//居留事由
    this.$store.dispatch("aGetDMPro",'dm_jwrysf');
    this.$store.dispatch("aGetDMPro",'dm_crjbs');
    this.$store.dispatch("aGetDMPro",'dm_rydylbb');
    this.$cdata.cusCountry();
    this.getSflb();
    this.getSpInit();
    if(document.body.clientWidth < 1500){
      this.barGap = '50%'
    }else{
      this.barGap = '90%'
    }
    // window.addEventListener("resize",((e)=>{
    //   console.log('e====',e)
    //   if(e.target.innerWidth < 1500){
    //     this.barGap = '50%'
    //     this.chartFun_1();
    //   }else{
    //     this.barGap = '90%'
    //     this.chartFun_1();
    //   }
    // }))
  },
  methods: {
    hideDialog(){
      this.isShowDialog=false
      // if(this.tab == '2'&&(this.chartType == 1||this.chartType == 2)){
      //   if(document.body.clientWidth < 1500){
      //     this.barGap = '50%'
      //   }else{
      //     this.barGap = '90%'
      //   }
      //   this.chartType == 1?this.chartFun_1():this.chartFun_2()
      // }
    },
    getSpInit(){
      this.$cdata.qxgl.getSjBm(this.$store.state.user.bmbh).then(data => {
        this.$store.dispatch("aGetssdw", {
          bmbh: "320500000000",
          type: "ssfj",
        });
        if (this.$store.state.user.jb == 2) {
          if(data.fj){
            this.cx.pd.jzd_ssfj = data.fj
            this.cx.pd.gzd_ssfj = data.fj
          }else{
            this.cx.pd.jzd_ssfj = data.bmbh
            this.cx.pd.gzd_ssfj = data.fj
          }
          this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "sspcs" });
          this.cx.pd.jzd_ssfjdis = true;
          this.cx.pd.gzd_ssfjdis = true;
          this.getTable();
        } else if (this.$store.state.user.jb == 3) {
          this.$store.dispatch("aGetssdw", { bmbh: data.fj, type: "sspcs" });
          this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "zrq" });
          this.cx.pd.jzd_ssfj = data.fj;
          this.cx.pd.gzd_ssfj = data.fj;
          this.cx.pd.workplace_police_station = data.bmbh;
          this.cx.pd.inhabi_police_station = data.bmbh;
          this.cx.pd.jzd_ssfjdis = true;
          this.cx.pd.gzd_ssfjdis = true;
          this.cx.pd.workplace_police_stationdis = true;
          this.cx.pd.inhabi_police_stationdis = true;
          this.getTable();
        }else{
          this.getTable();
        }
      });
    },
    dateChangeFun(data){
      if((data.key == "time_begin" && data.value) || (data.key == "time_end" && data.value)){
        this.cx.pd.history_time = ''
      }
      if(data.key == "history_time" && data.value){
        this.cx.pd.time_begin = ''
        this.cx.pd.time_end = ''
      }
    },
    // 获取查询参数
    getSflb(){
      this.$api.post(this.$api.aport4+'/comprehensive/sflb',null,r=>{
        this.sflbArr = r
      })
    },
    cxFnc(data) {
      if(this.tab == '1'){
        this.cx.pd = data;
        this.cx.pageNum = 1;
        this.getTable(true);
      }else{
        console.log('===',this.cx.pd)  
        this.chartsBegin()
      }
    },
    tabTopClick(index) {
      this.tab = index;
      if(this.tab == '1'){
        this.getTable();
      }else if(this.tab == '2'){
        this.chartsBegin()
      }
    },
    lcFnc(data) {
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
    //简表数据 子组件通知父组件改表格数据
    transSaveFnc(data){
      this.lbData = data
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
		sortChange(data){
			this.cx.order = data.prop;
      this.cx.direction = data.direction
      this.getTable();
    },
    rowspan(spanArr, position, spanName,firstName) {
        this.tableData.list.forEach((item, index) => {
          if (index === 0) {
            spanArr.push(1);
            position = 0;
          } else {
            if (this.tableData.list[index][spanName] === this.tableData.list[index - 1][spanName] && this.tableData.list[index][firstName] === this.tableData.list[index - 1][firstName] && this.tableData.list[index][firstName]) {
              spanArr[position] += 1;
              spanArr.push(0);
            } else {
              spanArr.push(1);
              position = index;
            }
          }
        });
      },
		// 查询用户列表
    getTable(flag,pdQ) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      if(this.cx.pd.statiType.length==0){
        this.tableMerge={};
        this.lbData = this.$cdata.czxx.xxwhgl.lb
        this.$api.post(this.$api.aport4 + "/comprehensive/listdata", pdQ||this.cx, r => {
          this.tableData.list = r.list;
          this.tableData.total = r.total;
          this.tableData.pageSize = r.pageSize;
          this.tableData.pageNum = r.pageNum
        });
      }else{
        this.$api.post(this.$api.aport4 + '/comprehensive/getGroupData',pdQ||this.cx, r => {
          this.tableData.list = r.list;
          this.tableData.total = r.total;
          this.tableData.pageSize = r.pageSize;
          this.tableData.pageNum = r.pageNum
          this.tableHeadReal = [
            {
              dm:'count',
              cm:'统计数量'
            },
          ];
          this.cx.pd.statiType.forEach((item) => {
            this.tableHead.forEach((jtem) => {
              if(item == jtem.dm||item+'_desc' == jtem.dm){
                this.tableHeadReal.splice(this.tableHeadReal.length-1,0,jtem)
              }
            })
          })
          this.lbData = this.tableHeadReal;
          this.lbData.forEach((item)=>{
            this.tableMerge[item.dm] = [];
            this.rowspan(this.tableMerge[item.dm], this.testPosition1, item.dm,this.lbData[0].dm);
          })
          // console.log('this.tableMerge',this.tableMerge)
        })
      }
    },
		//批量按钮
		plFnc(data){
      console.log(data)
      // this.dialogTitle = data.menu_name;
      // this.dialogType = data.py;
		},
		//列表内按钮&&双击行
		blFnc(data){
      // console.log(data)
      this.dialogType = data.btn.button_type;
      this.dialogTitle = data.btn.button_name;
      // this.onlyId = data.data.personnel_id;
      if(data.double){
        this.dialogType = 'detail',
        this.dialogTitle = '详情'
      }
      if(this.dialogType == 'detail'){
        if(this.cx.pd.statiType.length == 0){
          let routeData = this.$router.resolve({
            path: '/CzCTXQ',
            query:{onlyId:data.data.personnel_id}
          });
          window.open(routeData.href, '_blank');
        }else{
          this.pageRef="zhfx"//常住综合分析
          this.timer = new Date().getTime();
          this.tablePd = {};
          let queryPd = this.cx.pd;
          console.log('-',data.data,queryPd)
          let basicPd = this.$fnc.objCompare(data.data, queryPd);
          this.tablePd = Object.assign({},basicPd.obj2,basicPd.obj1)
          this.isShowDialog = true;
        }
      }
    },
    //表格复选框选择
		SelectionChange(){},
		//点击行
    rowClick(data){
      this.selection = [];
      this.selection.push(data.data);
    },
    analyFun(val){
      if(val == 1){this.chartFun_1()}
      if(val == 2){this.chartFun_2()}
      if(val == 3){this.chartFun_3()}
      if(val == 4){this.chartFun_4()}
      if(val == 5){this.chartFun_5()}
      if(val == 6){this.chartFun_6()}
    },
    chartAllClick(data){
      this.dialogType="chart"
      this.dialogTitle="图表"
      this.isShowDialog = true;
      this.chartType = data
      if(data == 1){this.chartFun_1();this.optData_D = this.optData_1;}
      if(data == 2){this.chartFun_2();this.optData_D = this.optData_2;}
      if(data == 3){this.chartFun_3();this.optData_D = this.optData_3;}
      if(data == 4){this.chartFun_4();this.optData_D = this.optData_4;}
      if(data == 5){this.chartFun_5();this.optData_D = this.optData_5;}
      if(data == 6){this.chartFun_6();this.optData_D = this.optData_6;}
      this.$nextTick(()=>{
        this.DiaHeight = this.$refs.diacRef.offsetHeight+'px'
        // this.barGap = "140%";
      })
    },
    chartDiaFun(val){
      console.log(val)
      // this.dialogType="chart"
      // this.dialogTitle="图表"
      // if(val == 1){this.chartFun_1();this.optData_D = this.optData_1;}
      // if(val == 2){this.chartFun_2();this.optData_D = this.optData_2;}
      // if(val == 3){this.chartFun_3();this.optData_D = this.optData_3;}
      // if(val == 4){this.chartFun_4();this.optData_D = this.optData_4;}
      // if(val == 5){this.chartFun_5();this.optData_D = this.optData_5;}
      // if(val == 6){this.chartFun_6();this.optData_D = this.optData_6;}
      // this.isShowDialog = true;
      // this.$nextTick(()=>{
      //   console.log(this.$refs.diacRef.offsetHeight)
      //   this.DiaHeight = this.$refs.diacRef.offsetHeight+'px'
      // })
    },
    chartsBegin(){
      /////
      this.chartFun_1();
      /////
      this.chartFun_2();
      /////
      this.chartFun_3()
      /////
      this.chartFun_4();
      /////
      this.chartFun_5();
      /////
      this.chartFun_6();
    },
    //
    chartShow_1_1() {
      this.optData_1_1 = {
        title: {
          text: "33",
          textStyle: {
            color: "#000",
            fontSize: 30
          },
          left: "45",
          top: "83"
        },
        angleAxis: {
          max: 100, // 满分
          // clockwise: false, // 逆时针
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: "category",
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          center: ["70", "100"],
          radius: "160%" //图形大小
        },
        series: [
          {
            type: "bar",
            data: [
              {
                name: "作文得分",
                value: 20,
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#31D8A0" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#21C2B3" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              }
            ],
            coordinateSystem: "polar", //极坐标
            roundCap: true, //有圆弧 只针对极坐标有效
            barWidth: 8,
            barGap: "-100%", // 两环重叠（如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。这在用柱子做背景的时候有用。）
            radius: ["20%", "52%"],
            z: 2 //柱状图组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
          },
          // {
          //   // 灰色环
          //   type: "bar",
          //   data: [
          //     {
          //       value: 100,
          //       itemStyle: {
          //         color: "#eee"
          //       }
          //     }
          //   ],
          //   coordinateSystem: "polar",
          //   roundCap: true,
          //   barWidth: 11,
          //   barGap: "-110%", // 两环重叠
          //   radius: ["20%", "53%"],
          //   z: 1
          // }
        ]
      };
    },
    chartShow_1_2() {
      this.optData_1_2 = {
        title: {
          text: "33",
          textStyle: {
            color: "#000",
            fontSize: 30
          },
          left: "45",
          top: "83"
        },
        angleAxis: {
          max: 100, // 满分
          // clockwise: false, // 逆时针
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: "category",
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          center: ["70", "100"],
          radius: "160%" //图形大小
        },
        series: [
          {
            type: "bar",
            data: [
              {
                name: "作文得分",
                value: 70,
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#FB7693" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#FDAE62" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              }
            ],
            coordinateSystem: "polar", //极坐标
            roundCap: true, //有圆弧 只针对极坐标有效
            barWidth: 8,
            barGap: "-100%", // 两环重叠（如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。这在用柱子做背景的时候有用。）
            radius: ["20%", "52%"],
            z: 2 //柱状图组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
          },
          {
            // 灰色环
            type: "bar",
            data: [
              {
                value: 100,
                itemStyle: {
                  color: "#eee"
                }
              }
            ],
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: 11,
            barGap: "-110%", // 两环重叠
            radius: ["20%", "53%"],
            z: 1
          }
        ]
      };
    },
    chartShow_1_3() {
      this.optData_1_3 = {
        title: {
          text: "33",
          textStyle: {
            color: "#000",
            fontSize: 30
          },
          left: "45",
          top: "83"
        },
        angleAxis: {
          max: 100, // 满分
          // clockwise: false, // 逆时针
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: "category",
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          center: ["70", "100"],
          radius: "160%" //图形大小
        },
        series: [
          {
            type: "bar",
            data: [
              {
                name: "作文得分",
                value: 70,
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#9D27EC" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#F167A2" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              }
            ],
            coordinateSystem: "polar", //极坐标
            roundCap: true, //有圆弧 只针对极坐标有效
            barWidth: 8,
            barGap: "-100%", // 两环重叠（如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。这在用柱子做背景的时候有用。）
            radius: ["20%", "52%"],
            z: 2 //柱状图组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
          },
          {
            // 灰色环
            type: "bar",
            data: [
              {
                value: 100,
                itemStyle: {
                  color: "#eee"
                }
              }
            ],
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: 11,
            barGap: "-110%", // 两环重叠
            radius: ["20%", "53%"],
            z: 1
          }
        ]
      };
    },
    //
    chartShow_2_1() {
      this.optData_2_1 = {
        title: {
          text: "33",
          textStyle: {
            color: "#000",
            fontSize: 30
          },
          left: "45",
          top: "83"
        },
        angleAxis: {
          max: 100, // 满分
          // clockwise: false, // 逆时针
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: "category",
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          center: ["70", "100"],
          radius: "160%" //图形大小
        },
        series: [
          {
            type: "bar",
            data: [
              {
                name: "作文得分",
                value: 70,
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#31D8A0" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#21C2B3" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              }
            ],
            coordinateSystem: "polar", //极坐标
            roundCap: true, //有圆弧 只针对极坐标有效
            barWidth: 8,
            barGap: "-100%", // 两环重叠（如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。这在用柱子做背景的时候有用。）
            radius: ["20%", "52%"],
            z: 2 //柱状图组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
          },
          {
            // 灰色环
            type: "bar",
            data: [
              {
                value: 100,
                itemStyle: {
                  color: "#eee"
                }
              }
            ],
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: 11,
            barGap: "-110%", // 两环重叠
            radius: ["20%", "53%"],
            z: 1
          }
        ]
      };
    },
    chartShow_2_2() {
      this.optData_2_2 = {
        title: {
          text: "33",
          textStyle: {
            color: "#000",
            fontSize: 30
          },
          left: "45",
          top: "83"
        },
        angleAxis: {
          max: 100, // 满分
          // clockwise: false, // 逆时针
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: "category",
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          center: ["70", "100"],
          radius: "160%" //图形大小
        },
        series: [
          {
            type: "bar",
            data: [
              {
                name: "作文得分",
                value: 70,
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#FB7693" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#FDAE62" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              }
            ],
            coordinateSystem: "polar", //极坐标
            roundCap: true, //有圆弧 只针对极坐标有效
            barWidth: 8,
            barGap: "-100%", // 两环重叠（如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。这在用柱子做背景的时候有用。）
            radius: ["20%", "52%"],
            z: 2 //柱状图组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
          },
          {
            // 灰色环
            type: "bar",
            data: [
              {
                value: 100,
                itemStyle: {
                  color: "#eee"
                }
              }
            ],
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: 11,
            barGap: "-110%", // 两环重叠
            radius: ["20%", "53%"],
            z: 1
          }
        ]
      };
    },
    chartShow_2_3() {
      this.optData_2_3 = {
        title: {
          text: "33",
          textStyle: {
            color: "#000",
            fontSize: 30
          },
          left: "45",
          top: "83"
        },
        angleAxis: {
          max: 100, // 满分
          // clockwise: false, // 逆时针
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: "category",
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          center: ["70", "100"],
          radius: "160%" //图形大小
        },
        series: [
          {
            type: "bar",
            data: [
              {
                name: "作文得分",
                value: 70,
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#9D27EC" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#F167A2" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              }
            ],
            coordinateSystem: "polar", //极坐标
            roundCap: true, //有圆弧 只针对极坐标有效
            barWidth: 8,
            barGap: "-100%", // 两环重叠（如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。这在用柱子做背景的时候有用。）
            radius: ["20%", "52%"],
            z: 2 //柱状图组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
          },
          {
            // 灰色环
            type: "bar",
            data: [
              {
                value: 100,
                itemStyle: {
                  color: "#eee"
                }
              }
            ],
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: 11,
            barGap: "-110%", // 两环重叠
            radius: ["20%", "53%"],
            z: 1
          }
        ]
      };
    },
    chartFun_1(){
      let cx_1 = {};
      cx_1 = JSON.parse(JSON.stringify(this.cx.pd))
      cx_1.analysisType = this.analyArr.type_1;
      cx_1.qcl = ''
      this.$api.post(this.$api.aport4 + '/comprehensive/periodComparison',cx_1,r=>{
        this.InObj.y2y = r.y2y;
        this.InObj.m2m = r.m2m;
        let double={
            type: "bar",
            barWidth: 10,
            barGap: this.barGap,
            showBackground: true,
            backgroundStyle: {
              // color: "#AA30DF",
              color: 'rgba(220, 220, 220, 0.3)',
              // opacity: 0.1,
              barBorderRadius: 30
            },
            itemStyle: {
              normal: {
                barBorderRadius: 10, //柱状图边角圆弧化
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#000",
                    fontSize: 12,
                    fontWeight:'bold'
                  }
                },
                // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   {
                //     offset: 0,
                //     color: "#AA30DF"
                //   },
                //   {
                //     offset: 1,
                //     color: "#CE4AC0"
                //   }
                // ])
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#D5C95D"
                  },
                  {
                    offset: 1,
                    color: "#C39E69"
                  }
                ])
              }
            },
        }
        let dataReal = [];
        r.series.forEach(item => {
          let dataItem = Object.assign({},item,double)
          dataReal.push(dataItem)
        })
        this.chartShow_1(r.xAxis.xAxis,dataReal)
        
      })
    },
    chartShow_1(xAxis,series){
      this.optData_1 = {
        tooltip: {},
        grid: {
          x: 0,
          y: 20
        },
        xAxis: [
          {
            type: "category",
            data: xAxis,
            axisPointer: {
              type: "none"
            },
            axisLine: {
              //去除x坐标轴
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              show: true, //这行代码控制着坐标轴x轴的文字是否显示
              color: "#919294",
              fontSize: 12
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              //去除y坐标轴
              lineStyle: {
                color: "#fff"
              }
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
              //去除网格线
              show: false
            }
          }
        ],
        series: series
      };
      this.timeRange_1 = new Date().getTime()
    },
    chartFun_2(){
      let cx_2 = {}
      cx_2 = JSON.parse(JSON.stringify(this.cx.pd))
      cx_2.analysisType = this.analyArr.type_2;
      cx_2.qcl = '1';
      this.$api.post(this.$api.aport4 + '/comprehensive/periodComparison2',cx_2,r=>{
        this.OutObj.y2y = r.y2y;
        this.OutObj.m2m = r.m2m;
        let double={
          type: "bar",
            barWidth: 10,
            showBackground: true,
            backgroundStyle: {
              // color: "#AA30DF",
              color: 'rgba(220, 220, 220, 0.3)',
              // opacity: 0.1,
              barBorderRadius: 30
            },
            itemStyle: {
              normal: {
                barBorderRadius: 10, //柱状图边角圆弧化
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#000",
                    fontSize: 12,
                    fontWeight:'bold'
                  }
                },
                color:((para)=>{
                  var colorList = [
                    {
                      c1:"#FCAC62",
                      c2:"#FC8C7E"
                    },
                    {
                      c1:"#F86948",
                      c2:"#E2453F"
                    },
                    {
                      c1:"#AA30DF",
                      c2:"#CE4AC0"
                    },
                    {
                      c1:"#30BFDA",
                      c2:"#1ACCE8"
                    },
                    {
                      c1:"#0FACFA",
                      c2:"#1ACCE8"
                    },
                    {
                      c1:"#FCAC62",
                      c2:"#FC8C7E"
                    },
                    {
                      c1:"#F86948",
                      c2:"#E2453F"
                    },
                    {
                      c1:"#AA30DF",
                      c2:"#CE4AC0"
                    },
                    {
                      c1:"#30BFDA",
                      c2:"#1ACCE8"
                    },
                    {
                      c1:"#0FACFA",
                      c2:"#1ACCE8"
                    }
                  ]
                  return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: colorList[para.dataIndex].c1
                    },
                    {
                      offset: 1,
                      color: colorList[para.dataIndex].c2
                    }
                  ])
                })
                // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   {
                //     offset: 0,
                //     color: "#AA30DF"
                //   },
                //   {
                //     offset: 1,
                //     color: "#CE4AC0"
                //   }
                // ])
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#D5C95D"
                  },
                  {
                    offset: 1,
                    color: "#C39E69"
                  }
                ])
              }
            },
        }
        let dataReal = [];
        r.series.forEach(item => {
          let dataItem = Object.assign({},item,double)
          dataReal.push(dataItem)
        })
        this.chartShow_2(r.xAxis.xAxis,dataReal)
        this.timeRange_2 = new Date().getTime()
      })
    },
    chartShow_2(xAxis,series){
      this.optData_2 = {
        tooltip: {},
        grid: {
          x: 0,
          y: 20
        },
        xAxis: [
          {
            type: "category",
            data: xAxis,
            axisPointer: {
              type: "none"
            },
            axisLine: {
              //去除x坐标轴
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              show: true, //这行代码控制着坐标轴x轴的文字是否显示
              color: "#919294",
              fontSize: 12
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              //去除y坐标轴
              lineStyle: {
                color: "#fff"
              }
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
              //去除网格线
              show: false
            }
          }
        ],
        series: series
      };
    },
    //国家地区
    chartFun_3(){
      let cx_3={};
      cx_3 = JSON.parse(JSON.stringify(this.cx.pd))
      cx_3.analysisType = this.analyArr.type_3;
      let chartName = '';
      this.analysis_3.forEach((item) => {
        if(item.dm == this.analyArr.type_3){
          chartName = item.mc
        }
      })
      this.$api.post(this.$api.aport4 + '/comprehensive/pieChart',cx_3,r=>{
        this.chartShow_3(r.legend.data,r.series[0].data,chartName);
        this.timeRange_3 = new Date().getTime()
      })
    },
    chartShow_3(legend,series,name) {
      this.optData_3 = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          itemWidth: 15, //修改icon图形大小
          itemHeight: 15, //修改icon图形大小
          type: "scroll",
          padding: [0, 0, 13, 0],
          textStyle: {
            color: "#919294"
          },
          data: legend
        },
        series: [
          {
            name:name,
            type: "pie",
            radius: ["35%", "50%"],
            center: ["50%", "45%"],
            avoidLabelOverlap: true,
            labelLine: {
              show: true,
              lineStyle: {
                width: 2
              }
            },
            label: {
              color: "#000",
              fontSize: 12,
              formatter: "{b}\n{c} ({d}%)"
            },
            itemStyle:{
              normal:{
                color:((para)=>{
                  var colorList = [
                    {
                      c1:"#FCAC62",
                      c2:"#FC8C7E"
                    },
                    {
                      c1:"#F86948",
                      c2:"#E2453F"
                    },
                    {
                      c1:"#AA30DF",
                      c2:"#CE4AC0"
                    },
                    {
                      c1:"#30BFDA",
                      c2:"#1ACCE8"
                    },
                    {
                      c1:"#0FACFA",
                      c2:"#1ACCE8"
                    },
                    {
                      c1:"#FCAC62",
                      c2:"#FC8C7E"
                    },
                    {
                      c1:"#F86948",
                      c2:"#E2453F"
                    },
                    {
                      c1:"#AA30DF",
                      c2:"#CE4AC0"
                    },
                    {
                      c1:"#30BFDA",
                      c2:"#1ACCE8"
                    },
                    {
                      c1:"#0FACFA",
                      c2:"#1ACCE8"
                    }
                  ]
                  return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: colorList[para.dataIndex].c1
                    },
                    {
                      offset: 1,
                      color: colorList[para.dataIndex].c2
                    }
                  ])
                })
              }
            },
            data:series
          }
        ]
      };
    },
    //TOP
    chartFun_4(){
      let cx_4={};
      cx_4 = JSON.parse(JSON.stringify(this.cx.pd))
      cx_4.analysisType = this.analyArr.type_4;
      let chartName = '';
      this.analysis_3.forEach((item) => {
        if(item.dm == this.analyArr.type_4){
          chartName = item.mc
        }
      })
      this.$api.post(this.$api.aport4 + '/comprehensive/topCount',cx_4,r=>{
        this.chartShow_4(r.xAxis.xAxis,r.series[0].data,chartName)
        this.timeRange_4 = new Date().getTime()
      })
    },
    chartShow_4(xAxis,series,name) {
      this.optData_4 = {
        tooltip: {},
        grid: {
          x: 0,
          y: 20
        },
        xAxis: [
          {
            type: "category",
            data: xAxis,
            axisPointer: {
              type: "none"
            },
            axisLine: {
              //去除x坐标轴
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              show: true, //这行代码控制着坐标轴x轴的文字是否显示
              color: "#919294",
              fontSize: 12
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              //去除y坐标轴
              lineStyle: {
                color: "#fff"
              }
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
              //去除网格线
              show: false
            }
          }
        ],
        series: [
          {
            name:name,
            type: "bar",
            barWidth: 10,
            showBackground: true,
            backgroundStyle: {
              color: "#1AC8EA",
              opacity: 0.1,
              barBorderRadius: 30
            },
            itemStyle: {
              normal: {
                barBorderRadius: 30, //柱状图边角圆弧化
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#000",
                    fontSize: 12,
                    fontWeight:'bold'
                  }
                },
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#1AC8EA"
                  },
                  {
                    offset: 1,
                    color: "#10ADFA"
                  }
                ])
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#D5C95D"
                  },
                  {
                    offset: 1,
                    color: "#C39E69"
                  }
                ])
              }
            },
            data: series
          }
        ]
      };
    },
    //
    chartFun_5(){
      let cx_5={};
      cx_5 = JSON.parse(JSON.stringify(this.cx.pd))
      cx_5.analysisType = this.analyArr.type_5;
      this.$api.post(this.$api.aport4 + '/residetrend/trendchart',cx_5,r=>{
        let series={
          type: "line",
            smooth: 0.7,
            symbolSize: 8,
            symbol: "emptyCircle", //设定为实心点
            // itemStyle: {
            //   normal: {
            //     // color: "#5486F9",
            //     borderWidth: 2
            //   }
            // },
            label: {
              // show: true,
              fontSize: 14,
              color: "#000",
              fontWeight:'bold'
            },
        }
        let dataReal = [];
        r.series.forEach(item => {
          let dataItem = Object.assign({},item,series)
          dataReal.push(dataItem)
        })
        this.chartShow_5(r.xAxis.data,dataReal,r.legend.data)
        this.timeRange_5 = new Date().getTime()
      })
    },
    chartShow_5(xAxis,series,legend) {
      this.optData_5 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: '10%',
          y: 40,
          x2: '10%',
          y2: 30
        },
        legend: {
          left: "center",
          width:'80%',
          // top: "bottom",
          // itemWidth: 15, //修改icon图形大小
          // itemHeight: 15, //修改icon图形大小
          type: "scroll",
          padding: [10, 0, 13, 0],
          textStyle: {
            color: "#919294"
          },
          data: legend
        },
        xAxis: {
          type: "category",
          data:xAxis,
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
              color: ["#eee"],
              type: "dashed"
            }
          }
        },
        series: series
      };
    },
    //
    chartFun_6(){
      let cx_6={};
      cx_6 = JSON.parse(JSON.stringify(this.cx.pd))
      cx_6.analysisType = this.analyArr.type_6;
      this.$api.post(this.$api.aport4+'/comprehensive/stackedBarChart',cx_6,r=>{
        let series = {
            type: "bar",
            stack: "总量",
            barWidth: 10,
            label: {
              show: true,
              color:'#000',
              position: "insideTop",
              fontWeight:'bold'
            },
            itemStyle:{
              normal:{
                barBorderRadius: 10, //柱状图边角圆弧化
                // color:((para)=>{
                //   var colorList = [
                //     {
                //       c1:"#FCAC62",
                //       c2:"#FC8C7E"
                //     },
                //     {
                //       c1:"#F86948",
                //       c2:"#E2453F"
                //     },
                //     {
                //       c1:"#AA30DF",
                //       c2:"#CE4AC0"
                //     },
                //     {
                //       c1:"#30BFDA",
                //       c2:"#1ACCE8"
                //     },
                //     {
                //       c1:"#0FACFA",
                //       c2:"#1ACCE8"
                //     },
                //     {
                //       c1:"#FCAC62",
                //       c2:"#FC8C7E"
                //     },
                //     {
                //       c1:"#F86948",
                //       c2:"#E2453F"
                //     },
                //     {
                //       c1:"#AA30DF",
                //       c2:"#CE4AC0"
                //     },
                //     {
                //       c1:"#30BFDA",
                //       c2:"#1ACCE8"
                //     },
                //     {
                //       c1:"#0FACFA",
                //       c2:"#1ACCE8"
                //     }
                //   ]
                //   return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //     {
                //       offset: 0,
                //       color: colorList[para.dataIndex].c1
                //     },
                //     {
                //       offset: 1,
                //       color: colorList[para.dataIndex].c2
                //     }
                //   ])
                // })
              },
              // emphasis:{
              //   color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              //       offset: 0,
              //       color: '#D5C95D'
              //     }, {
              //       offset: 1,
              //       color: '#C39E69'
              //     }])
              // },
            },
        }
        let dataReal = [];
        r.series.forEach(item => {
          let dataItem = Object.assign({},item,series)
          dataReal.push(dataItem)
        })
        this.$nextTick(()=>{
          this.chartShow_6(r.legend.data,r.xAxis.data,dataReal);
          this.timeRange_6 = new Date().getTime()
        })
      })
    },
    chartShow_6(legend,xAxis,series) {
      this.optData_6 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          width:'80%',
          // top: "bottom",
          // itemWidth: 15, //修改icon图形大小
          // itemHeight: 15, //修改icon图形大小
          type: "scroll",
          padding: [10, 0, 13, 0],
          data: legend
        },
        grid: {
          x: '10%',
          y: 40,
          x2: '10%',
          y2: 30
        },
        yAxis: {
          type: "category",
          data: xAxis,
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
        xAxis: {
          type: "value",
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
              color: ["#eee"],
              type: "dotted"
            }
          }
        },
        series: series
        // [
        //   {
        //     name: "直接访问",
        //     type: "bar",
        //     stack: "总量",
        //     barWidth: 10,
        //     label: {
        //       show: true,
        //       color:'#000',
        //       position: "right",
        //       fontWeight:'bold'
        //     },
        //     itemStyle:{
        //       normal:{
        //         barBorderRadius: 30, //柱状图边角圆弧化
        //         color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //             offset: 0,
        //             color: '#EC66A5'
        //           }, {
        //             offset: 1,
        //             color: '#9E29E9'
        //           }])
        //       },
        //       emphasis:{
        //         color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //             offset: 0,
        //             color: '#D5C95D'
        //           }, {
        //             offset: 1,
        //             color: '#C39E69'
        //           }])
        //       },
        //     },
        //     data: [
        //       {
        //         value:320,
        //         label:{
        //           show:true
        //         }
        //       },
        //       {
        //         value:0,
        //         label:{
        //           show:false
        //         }
        //       },
        //       302, 301, 334, 390, 330, 320]
        //   },
        //   {
        //     name: "邮件营销",
        //     type: "bar",
        //     stack: "总量",
        //     label: {
        //       show: true,
        //       color:'#000',
        //       position: "inside",
        //       fontWeight:'bold'
        //     },
        //     itemStyle:{
        //       normal:{
        //         barBorderRadius: 30, //柱状图边角圆弧化
        //         color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //             offset: 0,
        //             color: '#4CE0C6'
        //           }, {
        //             offset: 1,
        //             color: '#1DA8EB'
        //           }])
        //       },
        //       emphasis:{
        //         color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //             offset: 0,
        //             color: '#D5C95D'
        //           }, {
        //             offset: 1,
        //             color: '#C39E69'
        //           }])
        //       },
        //     },
        //     data: [120, 132, 101, 134, 90, 230, 210]
        //   },
        //   {
        //     name: "联盟广告",
        //     type: "bar",
        //     stack: "总量",
        //     label: {
        //       show: true,
        //       color:'#000',
        //       position: "inside",
        //       fontWeight:'bold'
        //     },
        //     itemStyle:{
        //       normal:{
        //         barBorderRadius: 30, //柱状图边角圆弧化
        //         color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //             offset: 0,
        //             color: '#D9D9D9'
        //           }, {
        //             offset: 1,
        //             color: '#D9D9D9'
        //           }])
        //       },
        //       emphasis:{
        //         color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //             offset: 0,
        //             color: '#D5C95D'
        //           }, {
        //             offset: 1,
        //             color: '#C39E69'
        //           }])
        //       },
        //     },
        //     data: [220, 182, 191, 234, 290, 330, 310]
        //   },
        // ]
      };
    }
  }
};
</script>