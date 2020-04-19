<template>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账户" prop="userName">
      <el-input v-model="ruleForm.userName" style="width: 50%"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="userPassword">
      <el-input v-model="ruleForm.userPassword" style="width: 50%"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {requestPost} from "../../network/request";

export default {
  data() {
    return {
      ruleForm: {
        userName: '',
        userPassword: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = '/api/user/addUser'
          var params = {
            userName: _this.ruleForm.userName,
            userPassword: _this.ruleForm.userPassword
          }
          requestPost(url,params).then(res =>{
            if(res.data.flag){
              _this.$alert('添加成功','ok',{
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/userMange')
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
    }
  }
}
</script>