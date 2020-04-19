<template>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账户编号" prop="id">
      <el-input v-model="ruleForm.id" readonly></el-input>
    </el-form-item>
    <el-form-item label="账户" prop="userName">
      <el-input v-model="ruleForm.userName"></el-input>
    </el-form-item>
    <el-form-item label="角色" prop="roleCode">
      <el-input v-model="ruleForm.roleCode"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import {requestPost} from "../../network/request";

export default {
  data() {
    return {
      ruleForm: {
        id: '',
        userName: '',
        roleCode: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url = '/api/user/updateUser'
          var params = {
            id: _this.ruleForm.id,
            userName: _this.ruleForm.userName,
            roleCode: (_this.ruleForm.roleCode) != null?_this.ruleForm.roleCode:''
          }
          console.log(222)
          requestPost(url,params).then(res =>{
            if(res.data.flag){
              _this.$alert('修改成功','ok',{
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/userMange')
                }
              })
            }else{
              _this.$message(data.message);
            }
          }).catch(err =>{
            _this.$message("系统出错");
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created(){
    var id = this.$route.query.id
    const _this = this
    var url = '/api/user/findUserById'
    var params = {
      id: id
    }
    requestPost(url ,params).then(res =>{
      if(res.data.flag){
        _this.ruleForm = res.data.data
      }
    }).catch(err =>{
      _this.$message("系统出错")
    })
  }
}
</script>