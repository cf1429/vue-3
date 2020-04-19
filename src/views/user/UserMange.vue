<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="编号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="账户名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="roleCode"
        label="账户角色"
        width="200">
      </el-table-column>
      <el-table-column
        prop="createTimeStr"
        label="创建时间"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="page">
    </el-pagination>
  </div>
</template>

<script>
import {request} from "../../network/request";
import {requestPost} from "../../network/request";

export default {
  data() {
    return {
      pageSize:10,
      pageIndex:0,
      total:0,
      tableData: [{}],
      addUpdateVisible: false
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    page(currentPage) {
      const _this = this;
      var num = parseInt(currentPage)-1
      _this.findList(num)
    },
    findList(obj){
      const _this = this
      var pageSize = _this.pageSize
      var pageIndex = pageSize*obj
      request({
        url: '/api/user/findAllUser/'+pageIndex+'/'+pageSize
      }).then(res =>{
        _this.tableData = res.data.data.data
        _this.pageSize = res.data.data.pageSize
        _this.total = res.data.data.total
      }).catch(err =>{
        _this.$message('系统出错')
      })
    },
    edit(row){
     this.$router.push({
        path: '/update',
        query:{
          id: row.id
        }
      })
    },
    del(row){
      const _this = this
      request({
        url:"/api/user/deleteUser/"+row.id,
        method: 'delete'
      }).then(res =>{
        if(res.data.flag){
          _this.$alert('删除成功','ok',{
            confirmButtonText: '确定',
            callback: action => {
              window.location.reload()
            }
          })
        }else{
          _this.$message(res.data.message);
        }
      }).catch(err =>{
        _this.$message("系统出错");
      })
    }
  },
  created() {
    const _this = this
    _this.findList(_this.pageIndex)
  }
}
</script>