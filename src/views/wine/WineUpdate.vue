<template>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="编号" prop="id">
      <el-input v-model="ruleForm.id" readonly></el-input>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="ruleForm.name" readonly></el-input>
    </el-form-item>
    <el-form-item label="数量" prop="number">
      <el-input v-model="ruleForm.number"></el-input>
    </el-form-item>
    <el-form-item label="售价" prop="price">
      <el-input v-model="ruleForm.price"></el-input>
    </el-form-item>
    <el-form-item label="成本价" prop="costPrice">
      <el-input v-model="ruleForm.costPrice"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="picture">
      <el-input v-model="ruleForm.picture"></el-input>
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
    <el-form-item label="有效期" prop="validNum">
      <el-input v-model="ruleForm.validNum"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {request} from "../../network/request";
import {requestPost} from "../../network/request";

export default {
  data() {
    return {
      ruleForm: {
        id:"",
        name: '',
        number: '',
        price: '',
        costPrice: '',
        picture: '',
        purchaseDate:'',
        productionDate:'',
        validNum:''
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
          var url = '/api/wine/updateWine'
          var params = {
            id: _this.ruleForm.id,
            name: _this.ruleForm.name,
            number: _this.ruleForm.number,
            price: _this.ruleForm.price,
            costPrice: _this.ruleForm.costPrice,
            picture: (_this.ruleForm.picture != null)? _this.ruleForm.picture:'',
            purchaseDate:  _this.$moment( _this.ruleForm.purchaseDate).format("YYYY-DD-MM"),
            productionDate: _this.$moment( _this.ruleForm.productionDate).format("YYYY-DD-MM"),
            validNum: _this.ruleForm.validNum
          }
          requestPost(url,params).then(res =>{
            if(res.data.flag){
              console.log(111)
              _this.$alert('修改成功','ok',{
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/wineMange')
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
    request({
      url: '/api/wine/findWineById/'+id,
      method: 'get'
    }).then(res =>{
      if(res.data.flag){
        _this.ruleForm = res.data.data
      }
    })
  }
}
</script>