<template>
    <div class="video">
        <!-- 头部 -->
        <div class="header">
            <img src="../../assets/images/recommend/fanhui1.png" @click="toBack">
            <img src="../../assets/images/recommend/san.png" class="right">
            <img src="../../assets/images/video/xiaocuang.png" class="right">
        </div>
        <video ref="video" :src="videoUrl" @click="toPlay" autoplay controls>
        </video>
        <div class="information">
            <img src="../../assets/images/video/dianzan.png" alt="">
            <div>{{videoDetail.praisedCount/10000>1?parseInt(videoDetail.praisedCount/1000)/10+'w':videoDetail.praisedCount}}</div>
            <img src="../../assets/images/video/pinlun.png" alt="">
            <div>{{videoDetail.commentCount>0?videoDetail.commentCount:'抢首评'}}</div>
            <img src="../../assets/images/video/fengxiang.png" alt="">
            <div>{{videoDetail.shareCount>0?videoDetail.shareCount:'分享'}}</div>
            <img src="../../assets/images/video/shoucang.png" alt="">
            <div>收藏</div>     
            <img src="../../assets/images/video/diepian.jpeg" alt="">
        </div>
        <div class="personal">
            <img class="avatar" :src="videoDetail.avatarUrl">
            <div class="nickName">{{videoDetail?videoDetail.creator.nickname:''}}</div>      
        </div>
        <div class="content">
            {{videoDetail.description}}
        </div>
    </div>
</template>

<script>
import {get} from '../../utils/axios'
    export default {
        data() {
            return {
                videoUrl:'',
                isPlay:true,
                videoDetail:'',
                isLogin:false              
            }
        },
        props:['videoList','index','vid'],
        mounted() {            
        },
        methods: {
            toBack (){
                this.$router.go(-1)
            },
            toPlay(){
                if(this.isPlay){
                    this.$refs.video.pause()
                    this.isPlay = false
                }else{
                    this.$refs.video.play()
                    this.isPlay = true
                }
            },
            async getVideoUrl(id){
                const videoData = await get('/video/url',{id})
                // console.log(videoData);
                this.videoUrl = videoData.data.urls[0].url
            },
            async getVideoDetail(id){
                const videoDetailData = await get('/video/detail',{id})
                console.log(videoDetailData);
                this.videoDetail = videoDetailData.data.data
            },

        },
        created(){
            this.getVideoDetail(this.vid)
            this.getVideoUrl(this.vid)

        }
    }
</script>

<style scoped>
.video{
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
    background-color: black;
}

.header {
    position: absolute;
    width: 94%;
    margin: 16px 12px;
    line-height: 80%;
}
.header img{
    width: 24px;
    height: 24px;
}
.header .right{
    float: right;
    margin: 0 10px;
}
video{
    width: 100%;
    margin-top: 25vh;
}
.information{
    position: absolute;
    left: 100%;
    margin-left: -60px;
    margin-top: -30px;
    width: 36px;
    
}
.information img{
    width: 40px;
    opacity: 0.85;
}
.information div{
    width: 36px;
    text-align: center;
    color: rgb(255, 255, 255);
    margin-bottom: 20px;
    opacity: 0.85;
}
.personal{
    color: rgb(255, 255, 255);
    height: 40px;
    display: flex;
    line-height: 40px;   
    margin: 28vh 0 16px 16px;
}
.personal img{
    width: 40px;
    border-radius: 50%;
}
.personal .nickName{
    font-size: 16px;
    font-weight: bold;
    margin-left: 8px;
}
.content{
    color: rgb(255, 255, 255);
    width: 70%;
    margin-left: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical; /*设置对其模式*/
    -webkit-line-clamp: 2; /*设置多行的行数*/
}
/* 登录 */
.isLogin{
  text-align: center;
  font-size: 20px;

}
.toLogin{
  width: 315px!important;
  height: 38px;
  line-height: 38px;
  border-radius: 50rpx;
  margin-top: 35px;
  background: #d43c33;
  color: #fff;
  font-size: 16px;
  padding: 0;
}
/* .videoSwiper{
    width: 100%;
    height: 100%;
    background-color: blue;
    color: aliceblue;
}
.videoSwiper van-swipe-item{
    width: 100%;
    height: 100%;
} */
</style>