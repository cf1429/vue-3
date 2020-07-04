<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" label-position="left" label-width="0px" class="login-form">
      <h3 class="title">
        管理系统
      </h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" >
        </el-input>
      </el-form-item>
      </el-checkbox>
      <el-form-item style="width:100%;">
        <el-button size="medium" type="primary" style="width:100%;" @click="submitForm('loginForm')" >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(loginForm){
      const _this = this
      this.$refs[loginForm].validate((valid) => {
        if(valid){
          axios.post('http://localhost:8070/api/user/login',{
            userName:_this.loginForm.username,
            userPassword:_this.loginForm.password
          }).then(function (res) {
            if(res.data.flag){
              _this.$message.success('登录成功')
              //将token值放到sessionStorage中，因后台接口没有token，古先放一个值代替
              window.sessionStorage.setItem("token",res.data.data.token)
              _this.$router.push({
                path:"/wineMange"
              })

            }else{
              _this.$message.error(res.data.message);
            }
          })
        }
      })
    }

  }
}
</script>
<style>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
    background-image:url('../../views/login/img/log_img.jpg');
    background-size: cover;
  }
  .title {
    margin: 0 auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    margin-top: 100px;
    border-radius: 6px;
    background: #ffffff;
    width: 385px;
    padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
  input {
    height: 38px;
  }
  }
  .input-icon{
    height: 39px;width: 14px;margin-left: 2px;
  }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    display: inline-block;
    height: 38px;
    float: right;
  img{
    cursor: pointer;
    vertical-align:middle
  }
  }
</style>
