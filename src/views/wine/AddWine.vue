<template>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="名称" prop="name" >
      <el-input v-model="ruleForm.name" placeholder="请输入名称" style="width: 46%"></el-input>
    </el-form-item>
    <el-form-item label="数量" prop="number">
      <el-input v-model="ruleForm.number" placeholder="请输入数量" style="width: 46%"></el-input>
    </el-form-item>
    <el-form-item label="售价" prop="price" >
      <el-input v-model="ruleForm.price" placeholder="请输入售价" style="width: 46%"></el-input>
    </el-form-item>
    <el-form-item label="成本价" prop="costPrice" >
      <el-input v-model="ruleForm.costPrice" placeholder="请输入成本价" style="width: 46%"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="picture">
      <input type="file" ref="fileInt" accept="image/jp2,image/jpeg,image/jpeg,image/jpeg">
      <br><el-button type="primary" @click="subFile()">上传</el-button>
    </el-form-item>
    <el-form-item label="进货日期" prop="purchaseDate">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.purchaseDate" style="width: 100%;"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="生产日期" prop="productionDate">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.productionDate" style="width: 100%;"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="保质期" prop="number">
      <el-input v-model="ruleForm.validNum" placeholder="请输入保质期" style="width: 46%"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {requestPost} from "../../network/request";
import {filePost} from "../../network/request";
import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        number: '',
        price: '',
        costPrice: '',
        picture: '',
        purchaseDate:'',
        productionDate:'',
        validNum:'',
        fileList:[]
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入售价', trigger: 'blur' }
        ],
        costPrice: [
          { required: true, message: '请输入成本价', trigger: 'blur' }
        ],
        purchaseDate: [
          { required: true, message: '请选择进货日期', trigger: 'blur' }
        ],
        productionDate: [
          { required: true, message: '请选择生产日期', trigger: 'blur' }
        ],
        validNum: [
          {  required: true, message: '请输入有效期（以整天为单位）', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
         var numReg = /^[1-9]\d*$/
         if(!numReg.test(_this.ruleForm.number)){
           _this.$message("请输入正确的数量")
           return false
         }
         if(!numReg.test(_this.ruleForm.validNum)){
           _this.$message("请输入正确的有效期")
           return false
         }
         var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
         if(!reg.test(_this.ruleForm.price)){
           _this.$message("请输入正确的售价")
           return false
         }
         if(!reg.test(_this.ruleForm.costPrice)){
           _this.$message("请输入正确的成本价")
           return false
          }
          var url = '/api/wine/addWine'
          var params={
            name: _this.ruleForm.name,
            number: _this.ruleForm.number,
            price: _this.ruleForm.price,
            costPrice: _this.ruleForm.costPrice,
            picture: (_this.ruleForm.picture != null)? _this.ruleForm.picture:'',
            purchaseDate:  _this.$moment( _this.ruleForm.purchaseDate).format("YYYY-DD-MM"),
            productionDate: _this.$moment( _this.ruleForm.productionDate).format("YYYY-DD-MM"),
            validNum: _this.ruleForm.validNum
          }
          console.log(111);
          requestPost(url,params).then(res =>{
            if(res.data.flag){
              _this.$alert('添加成功','ok',{
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/wineMange')
                }
              })
            }else{
              _this.$message(res.data.message);
            }
          }).catch(err =>{
            _this.$message("系统出错");
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    subFile() {
      const _this = this
      var file = this.$refs.fileInt.files[0];
      var data = new FormData();
      data.append('file', file);
      axios({
        url: "/api/file/fileUpload",
        data: data,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': window.sessionStorage.getItem("token")
        }
      }).then(res =>{
        console.log(res)
        if(res.data.flag){
          console.log(111)
          _this.ruleForm.picture = res.data.data
          _this.$message("上传成功");
        }else{
          _this.$message(res.data.message);
        }
      }).catch(err =>{
        _this.$message("系统出错");
      })
    },

  }
}
</script>