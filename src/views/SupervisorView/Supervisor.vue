<template>
  <div>
    <el-card class="box-card" style="height: 762px">
      <div class="top">
        <el-input
          placeholder="请输入督导姓名"
          class="search-inp"
          v-model="queryInfo.name"
          style="width: 220px"
          clearable
        />
        <el-input
          placeholder="请输入督导专业"
          class="search-inp"
          v-model="queryInfo.major"
          style="width: 220px"
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
          type="primary"
          class="add_btn"
          @click="addDialogVisible = true"
          ><i class="el-icon-plus" id="add_img"></i>添加</el-button
        >
        <el-button plain class="refresh_btn" @click="reload"
          ><i class="el-icon-refresh-right" id="refresh_img"></i>刷新</el-button
        >
      </div>

      <el-table
        class="s_table"
        :data="supervisorlist"
        border
        resizable="true"
        style="width: 100%"
        height="600px"
      >
        <el-table-column
          fixed
          type="selection"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          align="center"
          v-if="false"
        ></el-table-column>
        <el-table-column
          fixed
          prop="serialNumber"
          label="序号"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="jobNumber"
          label="工号"
          align="center"
          width="200"
        >
        </el-table-column>

        <el-table-column prop="name" label="姓名" align="center" width="200">
        </el-table-column>
        <el-table-column prop="major" label="专业" align="center" width="200">
        </el-table-column>

        <el-table-column prop="campus" label="校区" align="center" width="200">
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="200">
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
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

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
      <el-dialog
        title="修改督导信息"
        :visible.sync="updateDialogVisible"
        width="30%"
      >
        <el-form
          :rules="supervisor_rules"
          :model="supervisorForm"
          ref="supervisorForm"
          label-width="60px"
        >
          <el-form-item prop="serialNumber" label="序号:">
            <el-input v-model="supervisorForm.serialNumber"></el-input>
          </el-form-item>

          <el-form-item prop="jobNumber" label="工号:">
            <el-input v-model="supervisorForm.jobNumber"></el-input>
          </el-form-item>

          <el-form-item prop="name" label="姓名:">
            <el-input v-model="supervisorForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="major" label="专业:">
            <el-input v-model="supervisorForm.major"></el-input>
          </el-form-item>
          <el-form-item prop="campus" label="校区:">
            <el-input
              v-model="supervisorForm.campus"
              class="addSuperInput"
            ></el-input>
          </el-form-item>
          <el-form-item prop="remark" label="备注:">
            <el-input v-model="supervisorForm.remark"></el-input>
          </el-form-item>
          <el-button @click="cancelUpdate">取 消</el-button>
          <el-button type="primary" @click="doUpdate">确 定</el-button>
        </el-form>
      </el-dialog>

      <el-dialog title="添加督导" :visible.sync="addDialogVisible" width="30%">
        <el-form
          :rules="supervisor_rules"
          :model="supervisorForm"
          ref="supervisorForm"
          label-width="60px"
          size="medium"
        >
          <el-form-item prop="serialNumber" label="序号:">
            <el-input
              v-model="supervisorForm.serialNumber"
              class="addSuperInput"
            ></el-input>
          </el-form-item>

          <el-form-item prop="jobNumber" label="工号:">
            <el-input
              v-model="supervisorForm.jobNumber"
              class="addSuperInput"
            ></el-input>
          </el-form-item>

          <el-form-item prop="name" label="姓名:">
            <el-input
              v-model="supervisorForm.name"
              class="addSuperInput"
            ></el-input>
          </el-form-item>
          <el-form-item prop="major" label="专业:">
            <el-input
              v-model="supervisorForm.major"
              class="addSuperInput"
            ></el-input>
          </el-form-item>
          <el-form-item prop="campus" label="校区:">
            <el-input
              v-model="supervisorForm.campus"
              class="addSuperInput"
            ></el-input>
          </el-form-item>
          <el-form-item prop="remark" label="备注:">
            <el-input
              v-model="supervisorForm.remark"
              class="addSuperInput"
            ></el-input>
          </el-form-item>
          <el-button @click="cancelAdd">取 消</el-button>
          <el-button type="primary" @click="doAdd">确 定</el-button>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      page: 1,
      limit: 9,
      id: "",
      queryInfo: {
        name: "",
        major: "",
      },
      supervisorlist: [],
      multipleSelection: [],
      updateDialogVisible: false,
      addDialogVisible: false,
      supervisorForm: {
        jobNumber: "",
        major: "",
        name: "",
        remark: "",
        campus: "",
        serialNumber: "",
      },
      total: 0,
      supervisor_rules: {
        serialNumber: [
          { required: true, message: "请输入序号", trigger: "blur" },
        ],
        jobNumber: [
          { required: true, message: "请输入督导的工号", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入督导的姓名", trigger: "blur" },
        ],
        major: [
          { required: true, message: "请输入督导的专业", trigger: "blur" },
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
    };
  },
  created() {
    //初始化督导列表
    this.getSupervisorList(this.page, this.limit, this.queryInfo);
  },
  methods: {
    //功能1：搜索督导信息
    async search(page, limit) {
      page = 1;
      limit = this.limit;
      const { data: res } = await this.$http.post(
        `/api/supervise/list/${page}/${limit}`,
        this.queryInfo
      );
      this.supervisorlist = res.data.rows;
      this.handleCurrentChange();
    },
    //添加督导信息表单验证
    async doAdd(jobNumber) {
      //提交添加请求前先检查"工号"是否存在
      jobNumber = this.supervisorForm.jobNumber;
      const { data: res } = await this.$http.get(`/api/supervise/exists`, {
        params: {
          jobNumber: jobNumber,
        },
      });
      //"工号"存在
      if (res.success == false) {
        this.$message.error(res.message);
      }
      //"工号"不存在
      else {
        await this.$refs.supervisorForm
          .validate()
          .then(() => {
            this.AddSupervisor();
            this.supervisorForm = this.$options.data().supervisorForm;
          })
          .catch((err) => {
            console.log(err);
            this.$message.error("请填写完整的信息");
          });
      }
    },
    //功能2：添加督导信息
    async AddSupervisor() {
      const { data: res } = await this.$http.post(
        `/api/supervise/`,
        this.supervisorForm
      );
      if (res.success) {
        this.addDialogVisible = false;
        this.$message.success(res.message);
        this.getSupervisorList(this.page, this.limit, this.queryInfo);
      } else {
        this.$message.error(res.message);
      }
    },
    //修改督导信息表单验证
    async doUpdate() {
      await this.$refs.supervisorForm
        .validate()
        .then(() => {
          this.UpdateSupervisor();
          this.supervisorForm = this.$options.data().supervisorForm;
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("请检查督导信息！");
        });
    },
    //功能3：修改督导信息
    async UpdateSupervisor(id) {
      id = this.id;
      const { data: res } = await this.$http.put(
        `/api/supervise/${id}`,
        this.supervisorForm
      );
      if (res.success) {
        this.updateDialogVisible = false;
        this.getSupervisorList(this.page, this.limit, this.queryInfo);
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
    },
    //展示修改信息对话框
    showEditView(data) {
      this.supervisorForm = data;
      this.updateDialogVisible = true;
      this.id = data.id;
    },
    //功能4：单条教师信息删除
    async handleDelete(index, data) {
      this.index = index;
      const confirmResult = await this.$confirm(
        "此操作将永久删除 [ " + data.name + " ] 老师信息, 是否继续?",
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
      const { data: res } = await this.$http.delete(
        `/api/supervise/${data.id}`
      );
      if (res.success) {
        this.$message.success(res.message);
        this.getSupervisorList(this.page, this.limit, this.queryInfo);
      } else {
        this.$message.error(res.message);
      }
    },
    //获取全部督导信息
    async getSupervisorList(page = 1, limit, queryInfo) {
      const { data: res } = await this.$http.post(
        `/api/supervise/list/${page}/${limit}`,
        queryInfo
      );
      this.supervisorlist = res.data.rows;
      this.total = res.data.total;
    },
    //刷新
    reload() {
      location.reload();
    },
    //清空数据
    cancelUpdate() {
      this.updateDialogVisible = false;
      this.supervisorForm = this.$options.data().supervisorForm;
    },
    cancelAdd() {
      this.addDialogVisible = false;
      this.supervisorForm = this.$options.data().supervisorForm;
    },
    //获取复选框行
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页器跳转
    handleCurrentChange(val) {
      this.page = val;
      this.getSupervisorList(this.page, this.limit, this.queryInfo);
    },
  },
};
</script>

<style scoped>
.bigContainer {
  height: 670px;
}
.el-tabel,
.el-tabel-column {
  line-height: 70px;
  text-align: center;
}
.el-input {
  margin-right: 10px;
}
.sup_tag {
  font-size: 20px;
}
</style>
