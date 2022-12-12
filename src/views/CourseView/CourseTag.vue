<template>
  <el-tabs type="border-card"  class="course_tag"  style="height: 762px">
    <el-tab-pane label="查看课程信息" >
      <Course></Course>
    </el-tab-pane>
    <el-tab-pane label="查看匹配结果" >
      <Match></Match>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Course from "./Course.vue";
import Match from "./Match.vue";
export default {
  name: "CourseTag",
  components: {
    Course,
    Match,
  },
};
</script>

<style scoped>
</style>
