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
          axios.post('http://localhost:8070/api/user/updateUser',_this.ruleForm).then(function (res) {
            if(res.data.code == 200){
              _this.$alert('修改成功','ok',{
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/userMange')
                }
              })
            }else{
              _this.$message(data.message);
            }
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
    axios({
      method: 'post',
      url: 'http://localhost:8070/api/user/findUserById',
      data: {
        id: id
      }
    }).then(function (res) {
      if(res.data.code == 200){
        _this.ruleForm = res.data.data
      }
    })
  }
}
</script>