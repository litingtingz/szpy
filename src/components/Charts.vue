<template>
  <div>
    <div :id="'akiChart'+id" class="my-chart" :ref="'akiChart'+id" :style="{width:Cwidth,height:Cheight}"></div>
  </div>
</template>
<script>
export default {
  props: {
    optData: {
      type: Object,
      default: () => {}
    },
    id:{
      type:String,
      default:""
    },
    Cwidth:{
      type:String,
      default:'100%'
    },
    Cheight:{
      type:String,
      default:'240px'
    },
    timeRange:{
      type:Number,
      default:0
    },
  },
  data(){
    return{
      MyChart:null
    }
  },
  watch:{
    timeRange:function(){
      console.log('jin')
      this.initchart();
    },
  },
  mounted() {
    this.initchart();
  },
  methods: {
    initchart() {
      // 初始化
      this.MyChart = this.$echarts.init(document.getElementById("akiChart"+this.id));
      // 绘制
      this.MyChart.setOption(this.optData);
      this.MyChart.off('click');
      this.MyChart.on('click',(params)=>{
        this.$emit('chartClick',params)
        this.$emit('chartAllClick',this.id)
      })
      // this.MyChart.getZr().on('click', (params) => {
      //     this.$emit('chartAllClick',this.id)
      //     console.log('click',params)
      // })
      // 监听浏览器尺寸
      window.addEventListener("resize", (()=>{
        this.MyChart.resize();
      })
      );
    }
  }
};
</script>
<style scoped>

</style>