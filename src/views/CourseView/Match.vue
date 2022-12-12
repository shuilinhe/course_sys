<template>
  <div class="bigContainer">
    <el-empty class="empty" description="导出数据看看">
      <el-button
        type="success"
        class="match_btn"
        @click="dialogTableVisible = true"
        ><i class="el-icon-setting" id="match_img"></i>匹配</el-button
      >
      <el-button type="primary" @click="exportResult">导出匹配结果</el-button>
    </el-empty>

    <!--选督导匹配弹框-->
    <el-dialog title="选择督导老师" :visible.sync="dialogTableVisible">
      <el-table
        class="s_table"
        :data="supervisorlist"
        :row-key="getRowKeys"
        border
        sortable
        resizable="true"
        style="width: 100%"
        height="600px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          type="selection"
          align="center"
          :reserve-selection="true"
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
          sort-by="['1']"
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false" class="cancel_btn"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="getMatch"
          class="ok_btn"
          :disabled="this.multipleSelection.length === 0"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      limit: 8,
      total: 0,
      dialogTableVisible: false,
      multipleSelection: [],
      supervisorlist: [],
      fieldlist: [],
    };
  },
  created() {
    this.getSupervisorList(this.page, this.limit, this.queryInfo);
  },
  methods: {
    //导出匹配结果
    async exportResult() {
      const {data:res} = await this.$http.get(`/api/result/export`)
      if (res.success == false){
        this.$message.error(res.message);
      }else{
        window.location.href='http://124.71.112.154:8001/api/result/export';
      }
    },
    //记录分页多选
    getRowKeys(row) {
      return row.id;
    },
    //分页器跳转
    handleCurrentChange(val) {
      this.page = val;
      this.getSupervisorList(this.page, this.limit, this.queryInfo);
    },
    //获取全部督导信息
    async getSupervisorList(page, limit, queryInfo) {
      const { data: res } = await this.$http.post(
        `/api/supervise/list/${page}/${limit}`,
        { data: queryInfo }
      );
      this.supervisorlist = res.data.rows;
      this.total = res.data.total;
    },
    //匹配
    async getMatch() {
      let ids = "";
      this.multipleSelection.forEach((item) => {
        //循环数组
        ids += item.id + ",";
      });
      ids = ids.substring(0, ids.length - 1); //去掉拼接路径的最后一个逗号
      const { data: res } = await this.$http.get(`/api/result/match`, {
        params: {
          superviseIdList: ids,
        },
      });
      if (res.success == true) {
        this.$message.success(res.message);
        this.dialogTableVisible = false;
      }else{
        this.$message.error(res.message);
      }
    },
    //获取复选框选中行信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style scoped>
.bigContainer {
  width: auto;
  height: 670px;
}
.empty {
  position: relative;
  top: 100px;
}
</style>
