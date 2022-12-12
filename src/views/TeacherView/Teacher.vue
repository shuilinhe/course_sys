<template>
  <div>
    <el-card class="box-card" style="height: 762px">
      <!-- 搜索框 -->
      <div>
        <el-input
          placeholder="请输入教师姓名"
          v-model="queryInfo.name"
          style="width: 220px"
          clearable
        />
        <el-input
          placeholder="请输入教师专业"
          v-model="queryInfo.major"
          style="width: 220px"
          clearable
        />
        <el-input
          placeholder="请输入教师工号"
          v-model="queryInfo.teacherId"
          style="width: 220px"
          clearable
        />
        <el-button icon="el-icon-search" type="primary" @click="search"
          >搜索</el-button
        >
        <el-button icon="el-icon-plus" type="primary" @click="showAddView"
          >添加</el-button
        >

        <el-upload
          style="display: inline-flex; margin-left: 10px; font-size: 20px"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="onSuccess"
          :on-error="onError"
          :disabled="importDataDisabled"
          action="http://124.71.112.154:8001/api/teacher-major/import"
        >
          <el-button
            type="primary"
            :icon="importDataBtnIcon"
            :disabled="importDataDisabled"
          >
            {{ importDataBtnText }}
          </el-button>
        </el-upload>
        <el-button
          plain
          style="margin-left: 10px"
          icon="el-icon-refresh-right"
          class="refresh_btn"
          @click="reload"
          >刷新</el-button
        >
      </div>

      <!-- 数据展示 -->
      <el-table
        :data="teacherlist"
        border
        style="width: 100%"
        height="640px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="105" align="center">
        </el-table-column>
        <el-table-column
          fixed
          width="125"
          label="序号"
          type="index"
          align="center"
        />
        <el-table-column
          v-for="item in fieldlist"
          :key="item.teacherId"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" width="383" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              type="primary"
              @click="showEditView(scope.row.id, scope.row)"
              >修改</el-button
            >
            <el-button
              icon="el-icon-delete"
              type="danger"
              @click="deleteTeacherById(scope.row.id)"
              >删除</el-button
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

    <!-- 添加教师信息对话框 -->
    <el-dialog
      title="添加教师信息"
      :visible.sync="addDialogVisible"
      width="30%"
    >
      <el-form
        :rules="teacher_rules"
        :model="TeacherForm"
        ref="TeacherForm"
        label-width="60px"
      >
        <el-form-item prop="name" label="姓名">
          <el-input v-model="TeacherForm.name" />
        </el-form-item>
        <el-form-item prop="major" label="专业">
          <el-input v-model="TeacherForm.major" />
        </el-form-item>
        <el-form-item prop="teacherId" label="工号">
          <el-input v-model="TeacherForm.teacherId" />
        </el-form-item>
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="doAdd">确 定</el-button>
      </el-form>
    </el-dialog>

    <!-- 修改教师信息对话框 -->
    <el-dialog
      title="修改教师信息"
      :visible.sync="updateDialogVisible"
      width="30%"
    >
      <el-form
        :rules="teacher_rules"
        :model="TeacherForm"
        ref="TeacherForm"
        label-width="60px"
      >
        <el-form-item prop="name" label="姓名">
          <el-input v-model="TeacherForm.name" />
        </el-form-item>
        <el-form-item prop="major" label="专业">
          <el-input v-model="TeacherForm.major" />
        </el-form-item>
        <el-form-item prop="teacherId" label="工号">
          <el-input v-model="TeacherForm.teacherId" />
        </el-form-item>
        <el-button @click="cancelUpdate">取 消</el-button>
        <el-button type="primary" @click="doUpdate">确 定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      importDataDisabled: false,
      importDataBtnIcon: "el-icon-upload2",
      importDataBtnText: "导入数据",
      id: "",
      fileList: [],
      updateDialogVisible: false,
      addDialogVisible: false,
      uploadDialogVisible: false,
      TeacherForm: {
        name: "",
        major: "",
        teacherId: "",
      },
      page: 1,
      limit: 8,
      queryInfo: {
        name: "",
        major: "",
        teacherId: "",
      },
      filedlist: [],
      multipleSelection: [],
      teacherlist: [],
      idList: [],
      total: 0,
      teacher_rules: {
        name: [{ required: true, message: "请输入教师姓名", trigger: "blur" }],
        major: [{ required: true, message: "请输入教师专业", trigger: "blur" }],
        teacherId: [
          { required: true, message: "请输入教师工号", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getFieldList();
    this.getTeacherList(this.page, this.limit, this.queryInfo);
  },
  methods: {
    //上传按钮状态变化
    //上传请求成功
    onSuccess(response) {
      if (response.code == 20002) {
        this.$message.error("数据导入失败，请检查文件格式！");
      } else {
        this.$message.success("数据导入成功！");
        location.reload();
      }
      this.importDataBtnIcon = "el-icon-upload2";
      this.importDataBtnText = "导入数据";
      this.importDataDisabled = false; //不禁用
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
    //获取字段行
    getFieldList() {
      this.fieldlist = [
        { prop: "name", label: "姓名", width: "270" },
        { prop: "major", label: "专业", width: "270" },
        { prop: "teacherId", label: "工号", width: "270" },
      ];
    },
    //获取复选框选中行信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //清空数据
    cancelUpdate(){
      this.updateDialogVisible = false
      this.TeacherForm = this.$options.data().TeacherForm
    },
    cancelAdd(){
      this.addDialogVisible = false
      this.TeacherForm = this.$options.data().TeacherForm
    },
    //实现分页器页面跳转
    handleCurrentChange(val) {
      this.page = val;
      this.getTeacherList(this.page, this.limit, this.queryInfo);
    },
    //刷新
    reload() {
      location.reload();
    },
    //展示修改信息对话框
    showEditView(id, data) {
      this.TeacherForm = data;
      this.updateDialogVisible = true;
      this.id = id;
    },
    //展示添加信息对话框
    showAddView() {
      this.addDialogVisible = true;
    },
    //展示上传文件对话框
    showUploadView() {
      this.uploadDialogVisible = true;
    },
    //功能1：获取教师信息
    async getTeacherList(page = 1, limit, queryInfo) {
      const { data: res } = await this.$http.post(
        `/api/teacher-major/list/${page}/${limit}`,
        queryInfo
      );
      this.teacherlist = res.data.rows;
      this.total = res.data.total;
      console.log(this.total);
    },
    //功能2：搜索课程功能
    async search(page, limit) {
      page = 1;
      limit = this.limit;
      const { data: res } = await this.$http.post(
        `/api/teacher-major/list/${page}/${limit}`,
        this.queryInfo
      );
      this.teacherlist = res.data.rows;
      this.handleCurrentChange();
    },
    //添加教师信息表单验证
    async doAdd(teacherId) {
      //提交添加请求时先检查"工号"是否已经存在
      teacherId = this.TeacherForm.teacherId;
      const { data: res } = await this.$http.get(`/api/teacher-major/exists`, {
        params: {
          teacherId: teacherId,
        },
      });
      //"工号"存在
      if (res.success == false) {
        this.$message.error(res.message);
      }
      //"工号"不存在
      else {
        this.$refs.TeacherForm.validate()
          .then(() => {
            this.AddTeacher();
            this.TeacherForm = this.$options.data().TeacherForm

          })
          .catch(() => {
            this.$message.error("请填写完整的教师信息");
          });
      }
    },
    //功能3：添加教师信息
    async AddTeacher() {
      const { data: res } = await this.$http.post(
        `/api/teacher-major`,
        this.TeacherForm
      );
      this.addDialogVisible = false;
      if (res.success) {
        this.getTeacherList(this.page, this.limit, this.queryInfo);
        this.$message.success(res.message);
      } else {
        this.$message.success(res.message);
      }
      this.TeacherForm = this.$options.data().TeacherForm
    },
    //功能5：删除教师信息
    async deleteTeacherById(id) {
      //弹框确认
      const confirmResult = await this.$confirm(
        "此操作将删除该教师信息, 是否继续?",
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
      const { data: res } = await this.$http.delete(
        `/api/teacher-major/${id}`,
        id
      );
      if (res) {
        this.$message.success("教师信息删除成功！");
        this.getTeacherList(this.page, this.limit, this.queryInfo);
      }
    },
    //修改教师信息表单验证
    async doUpdate() {
      await this.$refs.TeacherForm.validate()
        .then(() => {
          this.UpdateTeacher();
          this.TeacherForm = this.$options.data().TeacherForm
        })
        .catch((err) => {
          err;
        });
    },
    //功能6：修改教师信息
    async UpdateTeacher(id) {
      id = this.id;
      const { data: res } = await this.$http.put(
        `/api/teacher-major/${id}`,
        this.TeacherForm
      );
      this.updateDialogVisible = false;
      if (res.success) {
        this.updateDialogVisible = false;
        this.$message.success(res.message);
        this.getTeacherList(this.page, this.limit, this.queryInfo);
      } else {
        this.$message.error(res.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-tabel,
.el-tabel-column {
  line-height: 70px;
  text-align: center;
}
.el-input {
  margin-right: 10px;
}
.upload-demo {
  margin-left: 200px;
}
</style>