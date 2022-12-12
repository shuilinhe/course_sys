<template>
    <div class="bigContainer">
        <el-calendar v-model="value" class="date">
</el-calendar>


    </div>
</template>
<script>
  export default {
    data() {
      return {
        value: new Date()
      }
    }
  }
</script>
<style scoped>
.bigContainer{
    width: auto;
    height: 720px;
    background-color: white;
    
}
.date{
  position: relative;
  top:20px;

 
  background: linear-gradient(rgba(255,255,255,1), rgba(255,255,255, 0.1)), url('https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg') no-repeat 2px 2px/ 1580px 880px; 
  
    
}
</style>
