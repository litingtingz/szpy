<template>
  <div class="home-page">
    <div class="home-head">
      <ul>
        <li v-for="(head,heads) in headArr" :key="heads" :style="{backgroundColor:head.color}">
          <div class="home-head-box">
            <p class="hone-head-type">{{head.type}}</p>
            <p class="home-head-con">{{head.content}}</p>
            <p class="home-head-num">{{head.num}}</p>
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
                      <p class="home-chart-title">{{'临住登记变化量'}}</p>
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
              :name="item.name">{{item.label}}</el-tab-pane>
            </el-tabs>
          </el-aside>
        </el-container>
        
        <!-- <el-col :span="6">
          
        </el-col> -->
      
    </div>
  </div>
</template>
<script>
import Charts from "@/components/Charts.vue";
export default {
  components: { Charts },
  data(){
    return{
      menu:[
        {
          label:'省厅下发常住',
          name:'first',
        },
        {
          label:'办证常住',
          name:'second',
        },
        {
          label:'实有常住',
          name:'third',
        },
      ],
      activeName:'first',
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
        {
          type:'人员预警',
          content:'占比已超15%',
          num:48,
          color:'#8693F3'
        },
        {
          type:'单位预警',
          content:'占比已超15%',
          num:1205,
          color:'#BC8CEF'
        },
        {
          type:'单位预警',
          content:'占比已超15%',
          num:357,
          color:'#FFA897'
        },
        {
          type:'单位预警',
          content:'占比已超15%',
          num:713,
          color:'#8AC3F8'
        },
      ]
    }
  },
  mounted(){
    this.begin()
  },
  methods:{
    handleClick(tab, event) {
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
      let xdata = ['1月','2月','3月','4月']
      let series = [{
          data: [100, 632, 301, 934],
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
            data: ['Forest', 'Steppe', 'Desert']
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
                data: ['2012', '2013', '2014', '2015', '2016']
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
                name: 'Forest',
                type: 'bar',
                barGap: 0, 
                barWidth: 8,   
                data: [320, 332, 301, 334, 390]
            },
            {
                name: 'Steppe',
                type: 'bar', 
                barWidth: 8,
                data: [220, 182, 191, 234, 290]
            },
            {
                name: 'Desert',
                type: 'bar',
                barWidth: 8,
                data: [150, 232, 201, 154, 190]
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
            data: ['直达', '营销广告', '搜索引擎']
        },
        series: [
            {
                name: '人员占比',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],
                label: {
                     normal: {
                       position: 'inner',
                       show : false
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 335, name: '直达', selected: true},
                    {value: 679, name: '营销广告'},
                    {value: 1548, name: '搜索引擎'}
                ],
                itemStyle:{
                  normal:{
                    color:((para)=>{
                      var colorList = ['#CB9BFF','#FF9480','#95A2FF']
                      return colorList[para.dataIndex]
                    })
                  }
                },
            },
            {
                name: '人员占比',
                type: 'pie',
                radius: ['40%', '55%'],
                label: {
                     normal: {
                       position: 'inner',
                       show : false
                    }
                },
                itemStyle:{
                  normal:{
                    color:((para)=>{
                      var colorList = ['#CB9BFF','#FF9480','#95A2FF']
                      return colorList[para.dataIndex]
                    })
                  }
                },
                data: [
                    {value: 335, name: '直达'},
                    {value: 310, name: '邮件营销'},
                    {value: 234, name: '联盟广告'},
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
            data: ['直达', '营销广告', '搜索引擎']
        },
        series: [
            {
                name: '人员占比',
                type: 'pie',
                radius: ['40%', '55%'],
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
                    {value: 335, name: '直达'},
                    {value: 310, name: '营销广告'},
                    {value: 234, name: '搜索引擎'},
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
            data: ['直达', '营销广告', '搜索引擎']
        },
        series: [
            {
                name: '人员占比',
                type: 'pie',
                radius: ['40%', '55%'],
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
                    {value: 335, name: '直达'},
                    {value: 310, name: '营销广告'},
                    {value: 234, name: '搜索引擎'},
                ]
            }
        ]
      }
      this.timeRange_5 = new Date().getTime()
    },
  }
}
</script>