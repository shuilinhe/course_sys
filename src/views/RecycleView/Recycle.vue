<template>
  <div>
    <el-card class="box-card" style="height: 762px">
      <!-- 搜索框 -->
      <div>
        <el-input
          placeholder="请输入课程名称"
          v-model="queryInfo.name"
          style="width: 220px"
          clearable
        />
        <el-input
          placeholder="请输入任课教师"
          v-model="queryInfo.teacherName"
          style="width: 220px"
          clearable
        />
        <el-button icon="el-icon-search" type="primary" @click="search"
          >搜索</el-button
        >
        <el-button
          icon="el-icon-refresh-left"
          type="primary"
          :disabled="this.multipleSelection.length === 0"
          @click="restoreCourseByIdList"
          >批量恢复</el-button
        >
        <el-button plain class="refresh_btn" @click="reload"
          ><i class="el-icon-refresh-right" id="refresh_img"></i>刷新</el-button
        >
        <el-tooltip content="清空所有的课程信息" placement="top" effect="light">
        <el-button icon="el-icon-delete" type="danger" @click="clearAll">一键清空</el-button>
        </el-tooltip>
      </div>

      <!-- 数据展示 -->
      <el-table
        :data="recyclelist"
        border
        ref="courseTable"
        style="width: 100%"
        height="640px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column
          fixed
          prop="serialNumber"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          v-for="item in fieldlist"
          :key="item.serialNumber"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" width="120" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-refresh-left"
              type="primary"
              @click="restoreCourseById(scope.row.id)"
              >恢复</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="limit"
          :current-page="page"
          layout="total,prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      limit: 6,
      queryInfo: {
        name: "",
        teacherName: "",
      },
      filedlist: [],
      multipleSelection: [],
      recyclelist: [],
      total: 0,
    };
  },
  created() {
    this.getFieldList();
    this.getRecycleCourseList(this.page, this.limit,this.queryInfo);
  },
  methods: {
    //获取字段行
    getFieldList() {
      this.fieldlist = [
        { prop: "courseNumber", label: "课程编号", width: "100" },
        { prop: "openNumber", label: "开课编号", width: "100" },
        { prop: "planType", label: "计划类型", width: "100" },
        { prop: "college", label: "开课学院", width: "100" },
        { prop: "type", label: "课程类别", width: "100" },
        { prop: "category", label: "课程分类", width: "140" },
        { prop: "name", label: "课程名称", width: "120" },
        { prop: "nameOfClass", label: "教学班名称", width: "120" },
        { prop: "totalHours", label: "总学时", width: "80" },
        { prop: "theoryHours", label: "理论学时", width: "80" },
        { prop: "practiceHours", label: "实践学时", width: "80" },
        { prop: "credit", label: "学分", width: "60" },
        { prop: "numberOfClass", label: "选课人数", width: "80" },
        { prop: "campusDistrict", label: "开课校区", width: "100" },
        { prop: "teacherName", label: "任课教师", width: "80" },
        { prop: "teacherId", label: "任课教师编号", width: "110" },
        { prop: "remark", label: "备注", width: "80" },
        { prop: "courseInfo", label: "课表信息", width: "150" },
      ];
    },
    //获取复选框选中行信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //刷新页面
    reload() {
      location.reload();
    },
    //分页器页面跳转
    handleCurrentChange(val) {
      this.page = val;
      this.getRecycleCourseList(this.page,this.limit,this.queryInfo);
    },
    //功能1：获取被逻辑删除的课程信息
    async getRecycleCourseList(page=1,limit,queryInfo) {
      const { data: res } = await this.$http.post(
        `/api/course/getDeleted/${page}/${limit}`,
        queryInfo
      );
      this.recyclelist = res.data.rows;
      this.total = res.data.total;
      console.log(res)
    },
    //功能2：单条课程恢复
    async restoreCourseById(id) {
      console.log(id);
      //弹框确认
      const confirmResult = await this.$confirm(
        "此操作将恢复该课程, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定恢复",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消");
      }
      const { data: res } = await this.$http.get(
        `/api/course/restoreById/${id}`
      );
      if (res.success) {
        this.$message.success(res.message);
        location.reload();
      }else{
        this.$message.error(res.message);
      }
    },

    //功能3：批量恢复课程
    async restoreCourseByIdList() {
      //弹框确认
      const confirmResult = await this.$confirm(
        "此操作将批量恢复[" +
          this.multipleSelection.length +
          "]课程, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定恢复",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消");
      }
      //请求参数拼接
      let ids = "";
      this.multipleSelection.forEach((item) => {
        //循环数组
        ids += item.id + ",";
      });
      ids = ids.substring(0, ids.length - 1); //去掉拼接路径的最后一个逗号
      const { data: res } = await this.$http.get(
        `/api/course/restoreBatchByIds`,
        {
          params: {
            idList: ids,
          },
        }
      );
      if (res.success) {
        this.$message.success(res.message);
        this.$refs.courseTable.clearSelection();
        location.reload();
      }else{
        this.$message.error(res.message);
      }
    },
    //功能4：搜索课程功能
    async search(page, limit) {
      page = 1;
      limit = this.limit;
      const { data: res } = await this.$http.post(
        `/api/course/getDeleted/${page}/${limit}`,
        this.queryInfo
      );
      this.recyclelist = res.data.rows;
    },
    //功能5：一键删除
    async clearAll(){
      const confirmResult = await this.$confirm(
        "此操作将清空本学期所有的课程信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定删除",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消");
      }
    const {data:res}=await this.$http.get(
      '/api/result/truncate'
    )
    if(res.success){
      this.$message.success(res.message);
      location.reload();
    }else{
      this.$message.error(res.message);
    }
    }
  },
};
</script>

<style lang="less" scoped>
.el-tabel-column {
  line-height: 70px;
  text-align: center;
}
.el-input {
  margin-right: 10px;
}
</style>