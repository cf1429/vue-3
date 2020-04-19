<template>
  <div>
    <div style="margin-bottom: 10px;">
      <div>
        <span>
          名称：<el-input v-model="name" placeholder="请输入内容" style="width: 20%;margin-right: 5%"></el-input>
        </span>
        <span style="margin-right: 5%">
          过期时间：
          <el-date-picker
            v-model="expiredDateStart"
            type="date"
            placeholder="选择日期" style="width: 20%;">
          </el-date-picker>
          <span>-</span>
          <el-date-picker
            v-model="expiredDateEnd"
            type="date"
            placeholder="选择日期" style="width: 20%;">
          </el-date-picker>
        </span>
        <span><el-button type="primary" icon="el-icon-search" @click="selectBut()">搜索</el-button></span>
      </div>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="编号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="number"
        label="数量"
        width="60">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="60">
      </el-table-column>
      <el-table-column
        prop="picture"
        label="图片"
        width="200">
      </el-table-column>
      <el-table-column
        prop="purchaseDateStr"
        label="进货日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="productionDateStr"
        label="生产日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="validNum"
        label="有效期"
        width="70">
      </el-table-column>
      <el-table-column
        prop="expiredDateStr"
        label="过期时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="username"
        label="添加人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="createTimeStr"
        label="创建时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="updateTimeStr"
        label="更新时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="costPrice"
        label="价格"
        width="60">
      </el-table-column>
      <el-table-column
        prop="priceTotal"
        label="毛利"
        width="100">
      </el-table-column>
      <el-table-column
        prop="costPriceTotal"
        label="成本"
        width="100">
      </el-table-column>
      <el-table-column
        prop="netProfit"
        label="净利润"
        width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
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
import {request, requestPost} from "../../network/request";

export default {
  data() {
    return {
      pageSize:10,
      pageIndex:0,
      name:'',
      expiredDateStart:null,
      expiredDateEnd:null,
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
      var url = '/api/wine/findWineList'
      var params = {
        pageSize: _this.pageSize,
        pageIndex: _this.pageSize*obj,
      }
      requestPost(url, params).then(res =>{
        _this.tableData = res.data.data.data
        _this.pageSize = res.data.data.pageSize
        _this.total = res.data.data.total,
        _this.pageIndex = res.data.data.pageIndex
      }).catch(err =>{
        _this.$message('系统出错')
      })
    },
    edit(row){
      this.$router.push({
        path: '/wineUpdate',
        query:{
          id: row.id
        }
      })
    },
    del(row){
      const _this = this
      request({
        url: '/api/wine/deleteWine/'+row.id,
        method: 'delete'
      }).then(res =>{
        if(res.data.flag){
          _this.$alert('删除成功','ok',{
            callback: action => {
              window.location.reload()
            }
          })
        }
      }).catch(err =>{
        _this.$message('系统出错');
      })
    },
    selectBut(){
      const _this = this
      var url = '/api/wine/findWineList'
      var params = {
        pageSize: _this.pageSize,
        pageIndex: _this.pageSize*this.pageIndex,
        name: (_this.name) != null ? this.name:'',
        expiredDateStart: (_this.expiredDateStart) != null ? _this.$moment(  _this.expiredDateStart).format("YYYY-DD-MM") : '',
        expiredDateEnd: (_this.expiredDateEnd) != null ? _this.$moment( _this.expiredDateEnd).format("YYYY-DD-MM") : ''
      }
      requestPost(url, params).then(res =>{
        _this.tableData = res.data.data.data
        _this.pageSize = res.data.data.pageSize
        _this.total = res.data.data.total,
          _this.pageIndex = res.data.data.pageIndex
      }).catch(err =>{
        _this.$message('系统出错')
      })

    }
  },
  created() {
    const _this = this
    _this.findList(_this.pageIndex)
  }
}
</script>