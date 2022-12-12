<template>
  <div class="bigContainer">
    <div class="list">
      <div class="top">
        <el-input
          placeholder="请输入课程名称"
          class="search-inp"
          v-model="queryInfo.name"
          style="width: 220px; margin-right: 10px"
          clearable
        />
        <el-input
          placeholder="请输入老师姓名"
          class="search-inp"
          v-model="queryInfo.teacherName"
          style="width: 220px; margin-right: 10px"
          clearable
        />
        <el-button
          icon="el-icon-search"
          type="primary"
          class="search_btn"
          @click="search"
          >搜索</el-button
        >
        <el-button
          type="danger"
          class="delete_btn"
          :disabled="this.multipleSelection.length === 0"
          @click="deleteMany"
          ><i class="el-icon-delete" id="delete_img"></i>批量删除</el-button
        >
        <el-button plain class="refresh_btn" @click="reload"
          ><i class="el-icon-refresh-right" id="refresh_img"></i>刷新</el-button
        >
        <el-button type="success" class="fenlei_btn" @click="classify"
          ><i class="el-icon-setting" id="fenlei_img"></i>分类</el-button
        >
        <el-upload
          style="display: inline-flex; margin-left: 10px; font-size: 20px"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="onSuccess"
          :on-error="onError"
          :disabled="importDataDisabled"
          action="http://124.71.112.154:8001/api/course/import"
        >
          <el-button
            type="primary"
            :icon="importDataBtnIcon"
            :disabled="importDataDisabled"
          >
            {{ importDataBtnText }}
          </el-button>
        </el-upload>
      </div>
      <!-- 课程列表 -->
      <el-table
        class="s_table"
        resizable="true"
        border
        ref="courseTable"
        :data="courselist"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        height="600"
        :row-key="getRowKey"
      >
        <el-table-column
          fixed
          type="selection"
          align="center"
          :reserve-selection="true"
        >
        </el-table-column>

        <el-table-column
          prop="id"
          label="编号"
          align="center"
          width="100px"
          v-if="false"
        >
        </el-table-column>

        <el-table-column
          v-for="item in fieldlist"
          :key="item.serialNumber"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          width="200px"
        >
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              size="mini"
              type="primary"
              @click="showEditView(scope.row)"
              >修改</el-button
            >
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div>
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="limit"
          :current-page="page"
          layout="total,prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 修改课程信息对话框 -->
      <el-dialog
        title="修改课程信息"
        :visible.sync="updateDialogVisible"
        width="30%"
      >
        <el-form
          :rules="course_rules"
          :model="updateCourseForm"
          ref="updateCourseForm"
          label-width="110px"
          size="small"
        >
          <el-form-item prop="serialNumber" label="序号:">
            <el-input v-model="updateCourseForm.serialNumber" />
          </el-form-item>
          <el-form-item prop="openNumber" label="开课编号:">
            <el-input v-model="updateCourseForm.openNumber" />
          </el-form-item>
          <el-form-item prop="name" label="课程名称:">
            <el-input v-model="updateCourseForm.name" />
          </el-form-item>
          <el-form-item prop="teacherId" label="任课教师编号:">
            <el-input v-model="updateCourseForm.teacherId" />
          </el-form-item>
          <el-form-item prop="teacherName" label="任课教师:">
            <el-input v-model="updateCourseForm.teacherName" />
          </el-form-item>
          <el-form-item prop="campusDistrict" label="开课校区:">
            <el-input v-model="updateCourseForm.campusDistrict" />
          </el-form-item>
          <el-form-item prop="college" label="开课学院:">
            <el-input v-model="updateCourseForm.college" />
          </el-form-item>
          <el-form-item prop="remark" label="备注:">
            <el-input v-model="updateCourseForm.remark" />
          </el-form-item>
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="doUpdate">确 定</el-button>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      page: 1,
      limit: 8,
      queryInfo: {
        name: "",
        teacherName: "",
      },
      filedlist: [],
      filelist: [],
      importDataDisabled: false,
      importDataBtnIcon: "el-icon-upload2",
      importDataBtnText: "导入数据",
      id: "",
      courselist: [],
      multipleSelection: [],
      updateDialogVisible: false,
      updateCourseForm: {
        id: "",
        campusDistrict: "",
        category: "",
        college: "",
        courseNumber: "",
        credit: "",
        name: "",
        nameOfClass: "",
        numberOfClass: "",
        openNumber: "",
        planType: "",
        practiceHours: "",
        remark: "",
        serialNumber: "",
        teacherId: "",
        teacherName: "",
        theoryHours: "",
        totalHours: "",
        type: "",
        version: "",
        courseInfo: "",
      },
      total: 0,
      course_rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        teacherId: [
          { required: true, message: "请输入任课教师工号", trigger: "blur" },
        ],
        serialNumber: [
          { required: true, message: "请输入序号", trigger: "blur" },
        ],
        openNumber: [
          { required: true, message: "请输入开课编号", trigger: "blur" },
        ],
        teacherName: [
          { required: true, message: "请输入任课教师姓名", trigger: "blur" },
        ],
        campusDistrict: [
          { required: true, message: "请输入开课校区", trigger: "blur" },
        ],
        college: [
          { required: true, message: "请输入开课学院", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getFieldList();
    this.getCourseList(this.page, this.limit, this.queryInfo);
  },
  methods: {
    //获取字段行信息
    getFieldList() {
      this.fieldlist = [
        { prop: "serialNumber", label: "序号", width: "100" },
        { prop: "courseNumber", label: "课程编号", width: "100" },
        { prop: "openNumber", label: "开课编号", width: "100" },
        { prop: "name", label: "课程名称", width: "200" },
        { prop: "planType", label: "计划类型", width: "200" },
        { prop: "college", label: "开课学院", width: "200" },
        { prop: "type", label: "课程类别", width: "120" },
        { prop: "category", label: "课程分类", width: "120" },
        { prop: "nameofClass", label: "教学班名称", width: "80" },
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
    //获取表格数据
    async getCourseList(page = 1, limit, queryInfo) {
      const { data: res } = await this.$http.post(
        `/api/course/list/${page}/${limit}`,
        queryInfo
      );
      this.courselist = res.data.rows;
      this.total = res.data.total;
    },
    //功能1：搜索功能
    async search(page, limit) {
      page = 1;
      limit = this.limit;
      const { data: res } = await this.$http.post(
        `/api/course/list/${page}/${limit}`,
        this.queryInfo
      );
      this.courselist = res.data.rows;
      this.handleCurrentChange();
    },
    //展示修改对话框
    showEditView(data) {
      this.updateCourseForm = data;
      this.updateDialogVisible = true;
      this.id = data.id;
    },
    //清空数据
    cancel(){
      this.updateDialogVisible = false
      this.updateCourseForm = this.$options.data().updateCourseForm
    },
    
    //功能2：修改课程信息
    async doUpdate() {
      await this.$refs.updateCourseForm
        .validate()
        .then(() => {
          this.UpdateCourse();
        })
        .catch((err) => {
          this.$message.error("请检查课程信息！");
        });
    },
    //功能2：修改课程信息
    async UpdateCourse(id) {
      id = this.id;
      const { data: res } = await this.$http.put(
        `/api/course/${id}`,
        this.updateCourseForm
      );
      this.updateDialogVisible = false;
      if (res.success) {
        this.updateDialogVisible = false;
        this.$message.success(res.message);
        this.getCourseList(this.page, this.limit, this.queryInfo);
      } else {
        this.$message.error(res.message);
      }
      this.updateCourseForm = this.$options.data().updateCourseForm
    },
    //功能3：删除课程
    async handleDelete(data) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除 [ " + data.name + " ] 课程, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消");
      }
      const { data: res } = await this.$http.delete(`/api/course/${data.id}`);
      if (res.success) {
        this.$message.success(res.message);
        this.getCourseList(this.page, this.limit, this.queryInfo);
      }
    },
    //功能4：批量删除课程
    async deleteMany() {
      const confirmResult = await this.$confirm(
        "此操作将永久删除[" +
          this.multipleSelection.length +
          "]条课程信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消");
      }
      let ids = "";
      this.multipleSelection.forEach((item) => {
        //循环数组
        ids += item.id + ",";
      });
      ids = ids.substring(0, ids.length - 1); //去掉拼接路径的最后一个逗号
      const { data: res } = await this.$http.delete(
        `/api/course/deleteBatchByIds`,
        {
          params: {
            idList: ids,
          },
        }
      );
      if (res.success) {
        this.$message.success(res.message);
        console.log(res);
        this.$refs.courseTable.clearSelection();
        this.getCourseList(this.page, this.limit, this.queryInfo);
      } else {
        this.$message.error(res.message);
      }
    },
    //功能5：课程分类
    async classify() {
      await this.$confirm("是否确认分类?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.handleClassify();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消分类",
          });
        });
    },
    //课程分类
    async handleClassify() {
      const {data:res} = await this.$http.get(`/api/course/classify`)
      if (res.success == false){
        this.$message.error(res.message);
      }else{
        window.location.href = "http://124.71.112.154:8001/api/course/classify";
      }
    },
    //功能6：导入数据
    onSuccess(response,file,fileList) {
      if (response.code == 20001) {
        this.$message.error(response.message);
        this.$refs.upload.handleRemove(file);
      } else {
        location.reload();
      }
      this.importDataBtnIcon = "el-icon-upload2";
      this.importDataBtnText = "导入数据";
      this.importDataDisabled = false; //不禁用

    },
    handleRemove(file, fileList) {
      this.filelist = fileList
    },
    //上传请求失败
    onError() {
      this.importDataBtnIcon = "el-icon-upload2";
      this.importDataBtnText = "导入数据";
      this.importDataDisabled = false; //不禁用
      this.$message.error("文件上传失败");
    },
    //正在上传
    beforeUpload() {
      this.importDataBtnIcon = "el-icon-loading";
      this.importDataBtnText = "正在导入";
      this.importDataDisabled = true; //正在导入时禁止再上传文件
    },
    //保存不同页之间的多选
    getRowKey(row) {
      return row.id;
    },
    //获取复选框选中行信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //刷新
    reload() {
      location.reload();
    },
    //分页器页面跳转
    handleCurrentChange(val) {
      this.page = val;
      this.getCourseList(this.page, this.limit, this.queryInfo);
    },
  },
};
</script>

<style scoped>
.bigContainer {
  height: 670px;
}
</style>