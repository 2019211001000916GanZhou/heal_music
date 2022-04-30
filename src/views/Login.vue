<template>
    <div class="login">
        <div class="nav">
            <div class="left" @click="onClickLeft"> &lt;返回 </div>
            <div class="right">登录</div>
        </div>
        <div class="title">
            欢迎来到HEAL MUSIC
        </div>
        <div class="loginInput">
            <!-- 登录form表单 -->
            <van-form @submit="onSubmit">
                <van-field
                    v-model="phone"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写手机号' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" class="submit" @click="submit">提交</van-button>
                </div>
            </van-form>
            <div class="forget-section">
                忘记密码?
            </div>
        </div>
        <div class="register-section">
            还没有账号?<span >马上注册</span>
        </div>
    </div>
</template>
<script>
import { Notify } from 'vant';
import { Dialog } from 'vant';
import {get} from '../utils/axios';
    export default {
        data() {
            return {
                phone:'',
                password:''
            }
        },
        methods: {
            // 回退上个页面
            onClickLeft(){
                this.$router.go(-1)
            },
            // 登录请求
            async submit(){
                const data = {
                    phone:this.phone,
                    password:this.password
                }
                let personData = await get('/login/cellphone',data)
               
                console.log(personData);
                if(personData.status === 200){
                    localStorage.setItem('userInfo',JSON.stringify(personData.data.profile))
                    this.$router.replace('/')
                   
                }else{
                    Dialog({ message: '手机号或密码错误，请重新输入' });
                }
            },
            onSubmit(){
            }
        },
    }
</script>

<style scoped>
.login{
    height: 100vh;
    width: 100%;
    overflow: hidden;
}
.title{
    position:relative;
    left: 25px;
    margin: 50px 0;
    font-size: 25px;
    color: #555;  
}
.nav{
    margin:20px 0;
    display: flex;
}
.left{
    margin-left:20px;
}
.right{
    margin-left: 30%;

}
.loginInput{
    margin: 0 auto;
    width: 90%;
    padding: 10px;
    border-radius: 10px;
}
.submit{
    background-color: #d43c33;
}
.forget-section{
    font-size: 15px;
    color: #4399fc;
    text-align: center;
    margin-top: 20px;
}
.register-section{
    position:absolute;
    left: 0;
    bottom: 25px;
    width: 100%;
    font-size: 14px;
    color: #606266;
    text-align: center;

}
.register-section span{
    color: #4399fc;
    margin-left: 5px;
}
</style>