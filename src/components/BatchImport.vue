<template>
  <div>
    <el-upload
      ref="upload"
      action=""
      :multiple='false'
      :http-request="uploadFile"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
    <div class="page-btn-box">
        <el-button size="mini" type="info" round @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    url: {
      type: String,
      default: ""
    },
    urlErr: {
      type: String,
      default: ""
    },
    dataType:{
      type: String,
      default: ""
    },
    datamodel:{
      type: String,
      default: ""
    }
  },
  data(){
    return{
      fileData:null,
    }
  },
  mounted(){
   
    this.clearFile();
  },
  methods:{
    clearFile(){
      if (this.$refs.upload) {
          this.$refs.upload.clearFiles();
      }
    },
    uploadFile(file) {
      console.log(file)
      this.fileData.append('file', file.file);
    },
    submitUpload(){
      if (this.$refs.upload.uploadFiles.length == 0) {
        this.$message({
          message: '请先选择文件！',
          type: 'warning',
          duration: 8000,
          showClose: true,
        });
        return
      }

    
       if(this.dataType=='y1001'){

         if (this.$refs.upload.uploadFiles.length>1) {
            this.$message({
              message: '只能上传一个文件!',
              type: 'warning',
              duration: 8000,
              showClose: true,
            });
            return
          }
          var array=this.$refs.upload.uploadFiles[0];
          if (array.size  > 20 * 1024 * 1024) {
            this.$message({
              message: '上传文件不能大于 20MB!',
              type: 'error',
              duration: 5000,
              showClose: true,
            });
            return
          }
          var arr=array.name.split('.');
          var type=arr[arr.length-1].toLowerCase();
          if(type!='mp3' && type!='mp4'){
            this.$message({
              message: '上传格式为mp3、mp4',
              type: 'error',
              duration: 5000,
              showClose: true,
            });
            return
          }
       }
      this.fileData = new FormData();
      this.$refs.upload.submit();
      this.fileData.append('userInfor',JSON.stringify(this.$store.state.user))
      if(this.dataType=='y1001'){
        var tt='1'
              if(this.datamodel=='englishPath')
            {
              tt=1;
            }else if(this.datamodel=='japanesePath')
            {
              tt=2;
            }else if(this.datamodel=='koreanPath')
            {
             tt=3;
            }
        this.fileData.append('type',tt)
      }else{
        this.fileData.append('dataType',this.dataType)
      }
      this.$api.post(this.url,this.fileData,r=>{
        if(this.dataType=='y1001')
        {
          console.log(r.data);
          if(r.data.code=='fail'){
          this.$message({
              message: r.data.message,
              type: 'error',
              duration: 5000,
              showClose: true,
            });
            return
          }else if(r.data.code=='success'){
            this.$message({
              message: r.data.message,
              type: 'success',
              duration: 5000,
              showClose: true,
            });
             this.$emit("dialogUpload", {
              datamodel: this.datamodel,
              path: r.data.filePath,
             });
          }
           

        }else{

        if(r.errList.length!=0){
          this.$confirm(r.message + '！是否导出错误信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.post(this.urlErr,{errList:r.errList},'','','blob','xlsx','错误信息')
            this.$emit('expFun')
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消导出'
            });
          });             
        }else{
          this.$message({
            message: r.message,
            type: 'success',
            duration: 8000,
            showClose: true,
          });
          this.$emit('expFun')
        }
}


      })

      
      
    },
    downBase(data){
      let prefix =  'data:application/vnd.ms-excel;base64,'
      let url = prefix+data;
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', "错误信息.xlsx")
      document.body.appendChild(link)
      link.click()
    },
    cancel(){
      this.$emit("dialogCancel")
    }
  }
}
</script>
<style>

</style>