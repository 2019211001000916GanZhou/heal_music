<template>
    <div>
        <div class="personalContainer">
            <!-- 用户头像，昵称展示 -->
            <div class="user-section">
                <img class="bg" src="../../assets/images/personal/bgImg2.jpg">
                <div class="user-info-box" @click="toLogin">
                <div class="portrait-box">
                    <img class="portrait" v-if="!userInfo.avatarUrl" src='../../assets/images/personal/12.png'>
                    <img class="portrait" v-if="userInfo.avatarUrl" :src='userInfo.avatarUrl'>
                </div>
                    <div class="info-box">
                        <span class="username">{{userInfo.nickname?userInfo.nickname: '立即登录>'}}</span>
                    </div>
                </div>
                <div class="vip-card-box">
                    <img class="card-bg" src="../../assets/images/personal/vip-card-bg.png" mode="">
                    <div class="b-btn">立即开通</div>
                <div class="tit">
                    <!-- 会员图标-->
                    <span class="iconfont icon-huiyuan-"></span>
                    emo会员
                </div>
                <span class="e-m">No zuo no die</span>
                <span class="e-b">开通会员听歌, 撸代码</span>
                </div>
            </div>
            <div class="cover-container">
                <!-- 个人中心导航 -->
                <div class="nav-section">
                    <div class="nav-item"  hover-class="common-hover"  hover-stay-time="50">
                        <span class="iconfont icon-xiaoxitongzhi"></span>
                        <span>我的消息</span>
                    </div>
                    <div class="nav-item"   hover-class="common-hover" hover-stay-time="50">
                        <span class="iconfont icon-wodehaoyou"></span>
                        <span>我的好友</span>
                    </div>
                    <div class="nav-item"  hover-class="common-hover"  hover-stay-time="50">
                        <span class="iconfont icon-boke1-copy"></span>
                        <span>播客</span>
                    </div>
                    <div class="nav-item" hover-class="common-hover"  hover-stay-time="50">
                        <span class="iconfont icon-dongtai"></span>
                        <span>个人动态</span>
                    </div>
                </div>
                <!-- 个人中心列表 -->
                <div class="personalContent">
                    <div class="recentPlayContainer">
                        <span class="title">最近播放</span>
                        <!-- 最近播放记录 -->
                        <div>暂无播放记录</div>
                    </div>
                    <div class="cardList">
                        <div class="card-item">
                        <span class="title">我的音乐</span>
                        <span class="more"> > </span>
                        </div>
                        <div class="card-item">
                        <span class="title">我的收藏</span>
                        <span class="more"> > </span>
                        </div>
                        <div class="card-item">
                        <span class="title">我的电台</span>
                        <span class="more"> > </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 退出登录按钮 -->
            <div class="btn">
                <button class="btn" @click="logOut">退出登录</button>
            </div>           
        </div>
    </div>
</template>
<script>
import { Dialog } from 'vant';
    export default {
        data() {
            return {
                userInfo:'',
                isLogin:false
            }
        },
        methods: {
            // 跳转登录页面
            toLogin(){               
                if(!this.userInfo){
                    this.$router.push('/login')
                }                
            },
            // 退出登录
            logOut(){
                Dialog.confirm({
                    title: 'logOut',
                    message: '确定退出登录？',
                    }).then(() => {
                        localStorage.clear('userInfo')
                        this.userInfo = ''
                    })
                    .catch(() => {
                        // on cancel
                    });
            },
            // 获取用户信息
            getUserInfo(){
                const userInfo = JSON.parse(localStorage.getItem('userInfo'))
                if(userInfo){
                    this.userInfo = userInfo
                }
            }
        },
        created() {
            this.getUserInfo()
        },
    }
</script>

<style scoped>
.personalContainer {
    width: 100%;
    height: 100%;
}

.personalContainer .user-section {
    height: 260px;
    position: relative;
    padding: 50px 10px 0;
}
.user-section .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    filter: blur(1px);
}


.user-info-box{
    height: 90px;
    display:flex;
    align-items:center;
    position:relative;
    z-index: 1;

}

.user-info-box .portrait{
    width: 65px;
    height: 65px;
    border:5rpx solid #fff;
    border-radius: 50%;
}
.user-info-box .username{
    font-size: 24;
    color: #303133;
    margin-left: 10px;
}


/* vip-box */
.vip-card-box {
    position: relative;
    display: flex;
    flex-direction: column;
    background: linear-gradient(left, red, black);
    background: rgba(0, 0, 0, .7);
    height: 240rpx;
    color: #f7d680;
    border-radius: 8px 8px 0 0;
    padding: 12px 12px;
}


.vip-card-box .card-bg{
    position:absolute;
    top: 10px;
    right: 0;
    width: 190px;
    height: 130px;
}

.vip-card-box .b-btn{
    position: absolute;
    right: 10px;
    top: 8px;
    width: 65px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #36343c;
    border-radius: 20px;
    background: #f9e6af;
    z-index: 1;
}

.vip-card-box .b-btn{
    position: absolute;
    right: 10px;
    top: 8px;
    width: 65px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #36343c;
    border-radius: 20px;
    /*background: linear-gradient(left, #f9e6af, #ffd465);*/ /*渐变不生效*/
    background: #f9e6af;
    z-index: 1;
}

.vip-card-box .tit {
    font-size: 12px;
    color: #f7d680;
    margin-bottom: 15px;
}
.vip-card-box .tit .iconfont{
    color: #f6e5a3;
    margin-right: 8px;
}


.vip-card-box .e-m{
    font-size: 16px;
    margin-top: 5px;
}
.vip-card-box .e-b{
    font-size: 12px;
    color: #d8cba9;
    margin-top: 5px;
}


.cover-container{
    margin-top: -75px;
    padding: 0 10px;
    position:relative;
    background: #f5f5f5;
    padding-bottom: 10px;
}

.cover-container .arc{
    position:absolute;
    left: 0;
    top: -17px;
    width: 100%;
    height: 18px;
}


/* 导航部分 */
.cover-container .nav-section {
    display: flex;
    background: #fff;
    padding: 10px 0;
    border-radius: 8px;
}


.nav-section .nav-item {
    width: 25%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.nav-section .nav-item .iconfont {
    font-size: 28px;
    color: #d43c33;
    line-height: 40px;
}

.nav-section .nav-item text:last-child {
    font-size: 12px;

}


/* 个人中心列表 */
.personalContent {
    background: #fff;
    margin-top: 10px;
}

.cardList {
    margin-top: 20px;

}
.cardList .card-item{
    border-top: 1px solid #eee;
    height: 50px;
    line-height: 50px;
    padding: 6px;
    font-size: 16px;
    color: #333;
    }
.cardList .card-item .more {
    float: right;
}

.btn{
    width: 100%;
    height: 60px;
    text-align: center;
}

.btn button{
    width: 320px!important;
    height: 36px;
    line-height: 36px;
    border-radius: 25px;
    margin-top: 40px;
    background: #d43c33;
    color: #fff;
    font-size: 16px;
    padding: 0;
}
</style>