<template>
    <div class="bigback">
        <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">修改密码</h3>
            <el-form-item prop="phone">
                <el-input type="text" auto-complete="false" v-model="loginForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-phone"></el-input>
            </el-form-item>

            <el-form-item prop="newpwd" >
                <el-input type="password" auto-complete="false" v-model="loginForm.newpassword" placeholder="请输入新密码" show-password="true" prefix-icon="el-icon-lock">
                    <i class="el-icon-view el-icon--right"></i>
                </el-input>
            </el-form-item>

            <el-form-item prop="confirmnewpwd" >
                <el-input type="password" auto-complete="false" v-model="loginForm.confirmnewpassword" placeholder="确认密码"  show-password="true" prefix-icon="el-icon-lock">
                    <i class="el-icon-view el-icon--right"></i>
                </el-input>
            </el-form-item>

            <el-form-item prop="code" >
                <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="请输入验证码" prefix-icon="el-icon-s-check">
                    <i class="el-icon-view el-icon--right"></i>
                </el-input>
            </el-form-item>
           
            <el-button class="login_btn" type="primary" style="width:100%" @click="submitLogin">确认</el-button>
            
        </el-form>
    </div>
</template>

<script>
    export default{
        name:"ForgotPassword",
        data(){
            return{
                // captchaUrl:'/captcha?time='+new Data(),
                loginForm:{
                    // username:'12345678901',
                    // password:'123',
                    // code:''
                },
                checked:true,
                rules:{ /*这些名称不是与loginForm中的名称对应的，而是与prop对应 */
                    phone:[{required:true,message:'请输入手机号码',trigger:'blur'}],
                    newpwd:[{required:true,message:'请输入新密码',trigger:'blur'}],
                    confirmnewpwd:[{required:true,message:'确认密码',trigger:'blur'}],
                    code:[{required:true,message:'请输入验证码',trigger:'blur'}],
                    // code:[{required:true,message:'请输入验证码',trigger:'blur'}]
                    
                }
            }
        },
        methods:{
            submitLogin(){
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        this.$message.error('请输入所有字段！');
                        return false;
                    }
                    });
            }
        }

    }

</script>

<style scoped>
 
    .bigback{
        width: auto;
        height: 820px;
        background: linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255, 0.6)), url('../../assets/xueyuan.webp') no-repeat 2px 2px/ 1580px 880px;

      
       
        
    }
    .loginContainer{
        position: relative;
        top:180px;
        background-clip: padding-box;
        margin: 0 auto;
        width: 350px;
        height: 420px;
        padding: 15px 35px 15px 35px;
        background-color:#fff ;
        border: 1px solid #eaeaea;
        position: relative;
     
    }
    .loginTitle{
        margin: 10px auto 40px auto;
        text-align: center;
    }
    .login_phone{
        color:black;
        font-size: 12px;
        float:left;
        margin-left: 10px;
        margin-top:10px;
    }
    .forgot_pwd{
        color:black;
        font-size: 12px;
        float:right;
        margin-top:10px;
        margin-right: 10px;
    }

    .register{
        color:#409EFF;
        font-size: 12px;
        position: absolute;
        top:340px;
        right: 50px;

    }

    .login_btn{
        margin-top:10px;
    }
</style>