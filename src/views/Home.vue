<template>
  <div class="home-page">
    <div class="home-head">
      <ul>
        <li v-for="(head,heads) in headArr" :key="heads" :style="{backgroundColor:head.color}">
          <div class="home-head-box">
            <p class="hone-head-type">{{head.type}}</p>
            <p class="home-head-con">{{head.content}}</p>
            <p class="home-head-num" v-if="head.num">{{head.num}}</p>
            <p class="home-head-yw " v-if="head.numyw">{{head.numyw}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="home-body">
      
        <el-container>
          <el-main>
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="12">
                    <div>
                      <p class="home-chart-title">{{'涉外案事件变化量'}}</p>
                      <div>
                        <Charts 
                        :timeRange="timeRange_1" 
                        :optData="optData_1" :id="'1'"
                        :Cheight="'300px'"></Charts>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div>
                      <p class="home-chart-title">{{'住宿登记变化量'}}</p>
                      <div>
                        <Charts 
                        :timeRange="timeRange_2" 
                        :optData="optData_2" :id="'2'"
                        :Cheight="'300px'"></Charts>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div>
                      <p class="home-chart-title">{{'重点人员占比分析'}}</p>
                      <div>
                        <Charts 
                        :timeRange="timeRange_3" 
                        :optData="optData_3" :id="'3'"
                        :Cheight="'300px'"></Charts>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div>
                      <p class="home-chart-title">{{'签证签发变化量'}}</p>
                      <div>
                        <Charts 
                        :timeRange="timeRange_4" 
                        :optData="optData_4" :id="'4'"
                        :Cheight="'300px'"></Charts>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div>
                      <p class="home-chart-title">{{'常住身份占比'}}</p>
                      <div>
                        <Charts 
                        :timeRange="timeRange_5" 
                        :optData="optData_5" :id="'5'"
                        :Cheight="'300px'"></Charts>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-main>
          <el-aside width="350px">
            <el-tabs class="home-right-menu" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane 
              v-for="(item,ind) in menu" 
              :key="ind" 
              :label="item.label" 
              :name="item.name">
              <div class="home-map" :class="'map-'+activeName">
                <div v-for="(jtem,jts) in ycNum" :key="jts">
                  <el-popover
                    placement="top-start"
                    popper-class="home-pop"
                    width="50"
                    trigger="hover">
                    <span style="font-weight:bold">{{jtem.num}}</span>
                    <div @click="numDia(jtem)" slot="reference" style="background-color:transparent" :class="jtem.class"></div>
                  </el-popover>
                </div>
                <div class="home-map-legend">
                    <ul>
                      <li v-for="(item,ind) in legend" :key="ind">
                        <span class="legend-color" :style="{'backgroundColor':item.color}"></span>
                        <span class="legend-label">{{item.label}}</span>
                      </li>
                    </ul>
                  </div>
              </div>
              </el-tab-pane>
            </el-tabs>
          </el-aside>
        </el-container>
    </div>
    <Dialog :isShowDialog="isShowDialog"  :title="dialogTitle" @hideDialog="isShowDialog=false">
        <div class="home-map-d">
          <span v-for="(item,ind) in numArr" :key="ind" :class="item.class" style="font-weight:bold">{{item.num}}</span>
        </div>
    </Dialog>
  </div>
</template>
<script>
import Charts from "@/components/Charts.vue";
import Dialog from "@/components/Dialog.vue";
export default {
  components: { Charts,Dialog },
  data(){
    return{
      isShowDialog:false,
      dialogTitle:'详情',
      menu:[
        {
          label:'实有常住',
          name:'2',
          num:'300',
        },
        {
          label:'省厅下发常住',
          name:'0',
          num:'100',
        },
        {
          label:'非办证常住',
          name:'1',
          num:'200',
        },
      ],
      legend:[
        {
          color:'#75E29F',
          label:'0 - 1000',
        },
        {
          color:'#DFCA3D',
          label:'1000 - 5000',
        },
        {
          color:'#EC6941',
          label:'5000 - 10000',
        },
        {
          color:'#D04E63',
          label:'10000以上',
        },
      ],
      numArr:[
        {
          class:'loufeng',
          num:this.activeName=='1'?83:this.activeName=='0'?237:320
        },
        {
          class:'weiting',
          num:this.activeName=='1'?111:this.activeName=='0'?183:294
        },
        {
          class:'shengpu',
          num:this.activeName=='1'?3:this.activeName=='0'?32:35
        },
        {
          class:'tangpai',
          num:this.activeName=='1'?87:this.activeName=='0'?173:260
        },
        {
          class:'huxi',
          num:this.activeName=='1'?1301:this.activeName=='0'?2505:3806
        },
        {
          class:'hudong',
          num:this.activeName=='1'?1296:this.activeName=='0'?3308:4604
        },
        {
          class:'yongan',
          num:this.activeName=='1'?337:this.activeName=='0'?845:1182
        },
        {
          class:'yongan_1',
          num:this.activeName=='1'?337:this.activeName=='0'?845:1182
        },
        {
          class:'yangch',
          num:this.activeName=='1'?16:this.activeName=='0'?8:24
        },
        {
          class:'baoshui',
          num:this.activeName=='1'?13:this.activeName=='0'?11:24
        },
        {
          class:'baoshui_1',
          num:this.activeName=='1'?13:this.activeName=='0'?11:24
        },
        {
          class:'dongsha',
          num:this.activeName=='1'?370:this.activeName=='0'?273:643
        },
      ],
      ycNum:[
        {
          class:'yuanqu',
          num:this.activeName=='0'?3511:this.activeName=='1'?7701:11212
        },
        {
          class:'gaoxin',
          num:this.activeName=='0'?165:this.activeName=='1'?2373:2538
        },
        {
          class:'wuzhong',
          num:this.activeName=='0'?1072:this.activeName=='1'?589:1661
        },
        {
          class:'xiangc',
          num:this.activeName=='0'?288:this.activeName=='1'?302:590
        },
        {
          class:'gusu',
          num:this.activeName=='0'?419:this.activeName=='1'?399:818
        },
        {
          class:'wujiang',
          num:this.activeName=='0'?819:this.activeName=='1'?0:819
        },
        {
          class:'changs',
          num:this.activeName=='0'?247:this.activeName=='1'?785:1032
        },
        {
          class:'zjg',
          num:this.activeName=='0'?259:this.activeName=='1'?1000:1259
        },
        {
          class:'huns',
          num:this.activeName=='0'?4119:this.activeName=='1'?2313:6432
        },

        {
          class:'taic',
          num:this.activeName=='0'?365:this.activeName=='1'?517:878
        },
        {
          class:'dujia',
          num:this.activeName=='0'?14:this.activeName=='1'?14:28
        },
      ],
      activeName:'2',
      timeRange_1:0,
      timeRange_2:0,
      timeRange_3:0,
      timeRange_4:0,
      timeRange_5:0,
      optData_1:{},
      optData_2:{},
      optData_3:{},
      optData_4:{},
      optData_5:{},
      headArr:[
        // {
        //   type:'临住数据展示',
        //   content:'当年：162887 条',
        //   num:'当月：16254 条',
        //   numyw:'当天：0',
        //   color:'#8693F3'
        // },
        {
          type:'实有人口',
          content:'办证常住：18898 条',
          num:'非办证常住：11270 条',
          numyw:'实有人数：30168 人',
          color:'#BC8CEF'
        },
        // {
        //   type:'案事件数据展示',
        //   content:'当月新增案件：64 条',
        //   num:'当年按年总和：1017 条',
        //   color:'#FFA897'
        // },
        {
          type:'预警处理',
          content:'未完成：0 条',
          num:'已完成：0 条',
          color:'#FFA897'
        },
        {
          type:'核查走访任务',
          content:'未完成：12648 条',
          num:'已完成：40560 条',
          color:'#8AC3F8'
        },
        {
          type:'入市辖区人员',
          content:'高铁民航：11340 人',
          num:'客运大巴：9589 人',
          numyw:'总数：20929 人',
          color:'#8693F3'
        },
      ]
    }
  },
  mounted(){
    this.ycNum=[
        {
          class:'yuanqu',
          num:this.activeName=='1'?3511:this.activeName=='0'?7701:11212
        },
        {
          class:'gaoxin',
          num:this.activeName=='1'?165:this.activeName=='0'?2373:2538
        },
        {
          class:'wuzhong',
          num:this.activeName=='1'?1072:this.activeName=='0'?589:1661
        },
        {
          class:'xiangc',
          num:this.activeName=='1'?288:this.activeName=='0'?302:590
        },
        {
          class:'gusu',
          num:this.activeName=='1'?419:this.activeName=='0'?399:818
        },
        {
          class:'wujiang',
          num:this.activeName=='1'?819:this.activeName=='0'?0:819
        },
        {
          class:'changs',
          num:this.activeName=='1'?247:this.activeName=='0'?785:1032
        },
        {
          class:'zjg',
          num:this.activeName=='1'?259:this.activeName=='0'?1000:1259
        },
        {
          class:'huns',
          num:this.activeName=='1'?4119:this.activeName=='0'?2313:6432
        },

        {
          class:'taic',
          num:this.activeName=='1'?365:this.activeName=='0'?517:878
        },
        {
          class:'dujia',
          num:this.activeName=='1'?14:this.activeName=='0'?14:28
        },
      ]
    this.begin()
  },
  methods:{
    numDia(val){
      if(val.class=="yuanqu"){
        this.isShowDialog = true
      }
      this.numArr=[
        {
          class:'loufeng',
          num:this.activeName=='1'?83:this.activeName=='0'?237:320
        },
        {
          class:'weiting',
          num:this.activeName=='1'?111:this.activeName=='0'?183:294
        },
        {
          class:'shengpu',
          num:this.activeName=='1'?3:this.activeName=='0'?32:35
        },
        {
          class:'tangpai',
          num:this.activeName=='1'?87:this.activeName=='0'?173:260
        },
        {
          class:'huxi',
          num:this.activeName=='1'?1301:this.activeName=='0'?2505:3806
        },
        {
          class:'hudong',
          num:this.activeName=='1'?1296:this.activeName=='0'?3308:4604
        },
        {
          class:'yongan',
          num:this.activeName=='1'?337:this.activeName=='0'?845:1182
        },
        {
          class:'yongan_1',
          num:this.activeName=='1'?337:this.activeName=='0'?845:1182
        },
        {
          class:'yangch',
          num:this.activeName=='1'?16:this.activeName=='0'?8:24
        },
        {
          class:'baoshui',
          num:this.activeName=='1'?13:this.activeName=='0'?11:24
        },
        {
          class:'baoshui_1',
          num:this.activeName=='1'?13:this.activeName=='0'?11:24
        },
        {
          class:'dongsha',
          num:this.activeName=='1'?370:this.activeName=='0'?273:643
        },
      ]
    },
    handleClick(tab, event) {
      console.log(this.activeName)
      this.ycNum=[
        {
          class:'yuanqu',
          num:this.activeName=='1'?3511:this.activeName=='0'?7701:11212
        },
        {
          class:'gaoxin',
          num:this.activeName=='1'?165:this.activeName=='0'?2373:2538
        },
        {
          class:'wuzhong',
          num:this.activeName=='1'?1072:this.activeName=='0'?589:1661
        },
        {
          class:'xiangc',
          num:this.activeName=='1'?288:this.activeName=='0'?302:590
        },
        {
          class:'gusu',
          num:this.activeName=='1'?419:this.activeName=='0'?399:818
        },
        {
          class:'wujiang',
          num:this.activeName=='1'?819:this.activeName=='0'?0:819
        },
        {
          class:'changs',
          num:this.activeName=='1'?247:this.activeName=='0'?785:1032
        },
        {
          class:'zjg',
          num:this.activeName=='1'?259:this.activeName=='0'?1000:1259
        },
        {
          class:'huns',
          num:this.activeName=='1'?4119:this.activeName=='0'?2313:6432
        },

        {
          class:'taic',
          num:this.activeName=='1'?365:this.activeName=='0'?517:878
        },
        {
          class:'dujia',
          num:this.activeName=='1'?14:this.activeName=='0'?14:28
        },
      ]
      console.log(tab, event);
    },
    begin(){
      this.chartFun_1()
      this.chartShow_2()
      this.chartShow_3()
      this.chartShow_4()
      this.chartShow_5()
    },
    chartFun_1(){
      let xdata = ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05','2020/06','2020/07','2020/08','2020/09','2020/10']
      let series = [{
          data: [91, 27, 92, 88,128,213,139,108,67,64],
          type: 'line',
          smooth: true
      }]
      this.timeRange_1 = new Date().getTime();
      this.chartShow_1(xdata,series)
    },
    chartShow_1(xdata,series) {
      this.optData_1 = {
        // grid: {
        //   x: 45,
        //   y: 40,
        //   x2: 30
        // },
        // legend: {data: legend},
         tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
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
              color: "#EFEFEF"
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
              color: "#EFEFEF"
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
              color: ["#EFEFEF"],
              // type: "dashed"
            }
          }
        },
        series: series
      };
    },
    chartFun_2(){

    },
    chartShow_2(){
      this.optData_2={
        color: ['#FFA897', '#919FFF', '#9EE0FF'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['宾馆', '社会面', '总计']
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                axisLine: {
                  //去除x坐标轴
                  lineStyle: {
                    color: "#EFEFEF"
                  }
                },
                axisLabel: {
                  show: true, //这行代码控制着坐标轴x轴的文字是否显示
                  color: "#919294",
                  fontSize: 12
                },
                data: ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05','2020/06','2020/07','2020/08','2020/09','2020/10']
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                  //去除y坐标轴
                  lineStyle: {
                    color: "#EFEFEF"
                  }
                },
                axisLabel: {
                  show: true, //这行代码控制着坐标轴的文字是否显示
                  color: "#919294",
                  fontSize: 12
                },
                axisTick: {
                  //去掉坐标刻度线
                  show: false
                },
                splitLine: {
                  //网格线
                  show: true,
                  lineStyle: {
                    color: ["#EFEFEF"],
                    // type: "dotted"
                  }
                }
            }
        ],
        series: [
            {
                name: '宾馆',
                type: 'bar',
                barGap: 0, 
                barWidth: 8,   
                data: [37911, 1320, 3926, 4159, 6924,8074,9884,12896,12252,11965]
            },
            {
                name: '社会面',
                type: 'bar', 
                barWidth: 8,
                data: [6397, 5421, 6606, 4799, 3817,5327,4883,5390,6645,4521]
            },
            {
                name: '总计',
                type: 'bar',
                barWidth: 8,
                data: [44308, 6741, 10532, 8958, 10741,13401,14770,18286,18896,16254]
            },
        ]
      }
      this.timeRange_2 = new Date().getTime();
    },
    chartShow_3(){
      this.optData_3={
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            x:'center',
            y:'center',
            left: 10,
            data: ['中国台湾', '韩国', '日本','美国','马来西亚','印度','加拿大','新加坡','菲律宾','俄罗斯']
        },
        series: [
            // {
            //     name: '人员占比',
            //     type: 'pie',
            //     selectedMode: 'single',
            //     radius: [0, '30%'],
            //     label: {
            //          normal: {
            //            position: 'inner',
            //            show : false
            //         }
            //     },
            //     labelLine: {
            //         show: false
            //     },
            //     data: [
            //         {value: 335, name: '直达', selected: true},
            //         {value: 679, name: '营销广告'},
            //         {value: 1548, name: '搜索引擎'}
            //     ],
            //     itemStyle:{
            //       normal:{
            //         color:((para)=>{
            //           var colorList = ['#CB9BFF','#FF9480','#95A2FF']
            //           return colorList[para.dataIndex]
            //         })
            //       }
            //     },
            // },
            {
                name: '人员占比',
                type: 'pie',
                radius: ['40%', '55%'],
                center:['50%','40%'],
                label: {
                     normal: {
                       position: 'inner',
                       show : false
                    }
                },
                itemStyle:{
                  normal:{
                    color:((para)=>{
                      var colorList = ['#CB9BFF','#FF9480','#95A2FF','#9EE0FF','#37B6FF','#8593FC','#AF88FF','#0A2E82','#ACBEEE','#B93C61']
                      return colorList[para.dataIndex]
                    })
                  }
                },
                data: [
                    {value: 3056, name: '中国台湾'},
                    {value: 718, name: '韩国'},
                    {value: 386, name: '日本'},
                    {value: 295, name: '美国'},
                    {value: 164, name: '马来西亚'},
                    {value: 138, name: '印度'},
                    {value: 102, name: '加拿大'},
                    {value: 100, name: '新加坡'},
                    {value: 98, name: '菲律宾'},
                    {value: 79, name: '俄罗斯'},
                ]
            }
        ]
      }
      this.timeRange_3 = new Date().getTime()
    },
    chartShow_4(){
      this.optData_4={
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            x:'center',
            y:'center',
            left: 10,
            data: ['停留', '居留', '签证']
        },
        series: [
            {
                name: '人员占比',
                type: 'pie',
                radius: ['40%', '55%'],
                center:['50%','40%'],
                label: {
                     normal: {
                       position: 'inner',
                       show : true,
                       formatter:(para)=>{
                         return para.percent+'%'
                        //  console.log('==',para)
                       }
                    }
                },
                itemStyle:{
                  normal:{
                    color:((para)=>{
                      var colorList = ['#AF88FF','#37B6FF','#8593FC']
                      return colorList[para.dataIndex]
                    })
                  }
                },
                data: [
                    {value: 1569, name: '停留'},
                    {value: 12004, name: '居留'},
                    {value: 365, name: '签证'},
                ]
            }
        ]
      }
      this.timeRange_4 = new Date().getTime()
    },
    chartShow_5(){
      this.optData_5={
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            x:'center',
            y:'center',
            left: 10,
            data: ['企业工作人员', '高校留学生', '文教专家','亲属','其它']
        },
        series: [
            {
                name: '人员占比',
                type: 'pie',
                radius: ['40%', '55%'],
                center:['50%','40%'],
                label: {
                     normal: {
                       position: 'inner',
                       show : true,
                       formatter:(para)=>{
                         return para.percent+'%'
                        //  console.log('==',para)
                       }
                    }
                },
                itemStyle:{
                  normal:{
                    color:((para)=>{
                      var colorList = ['#AF88FF','#37B6FF','#8593FC','#9EE0FF','#37B6FF']
                      return colorList[para.dataIndex]
                    })
                  }
                },
                data: [
                    {value: 301, name: '企业工作人员'},
                    {value: 23, name: '高校留学生'},
                    {value: 120, name: '文教专家'},
                    {value: 292, name: '亲属'},
                    {value: 257, name: '其它'},
                ]
            }
        ]
      }
      this.timeRange_5 = new Date().getTime()
    },
  }
}
</script>