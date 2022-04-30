<template>
    <div class="find">
        <!-- 头部 -->
        <div class="header">
            <img src="../../assets/images/logo.png">
            <div class="search" @click="toSearch">
                <img src="../../assets/images/search/search.png">    
                <span>搜索歌曲</span>
            </div>
            <img src="../../assets/images/search/voice.png">
        </div>
        <van-tabs v-model="active" swipeable @click="changeNav">
            <van-tab v-for="v in videoNavList" :key="v.id" :title="v.name" >
                <div  class="videoListscroll">
                    <div  class="videoContent" v-for="(v,index) in videoList" :key="v.id">
                        <img :src="v.data.coverUrl" class="video" @click="toVideo($event,videoList,index,v.data.vid)">
                        <div class="content">{{v.data.title}}</div>
                        <div class="footer">
                            <img class="avatar" :src="v.data.creator.avatarUrl">
                            <span class="nickName">{{v.data.creator.nickname}}</span>
                            <div class="comments_praised">
                                <span class="item">
                                    <span class="iconfont icon-pinglun"></span>
                                    <span class="count">{{v.data.commentCount}}</span>
                                </span>
                                <span class="item">
                                    <span class="iconfont icon-dianzan"></span>                                   
                                    <span class="count">{{v.data.praisedCount}}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
          <!-- 视频列表 -->
        
    </div>
</template>

<script>
import {get} from "../../utils/axios"
import { Dialog } from 'vant';
    export default {
        data() {
            return {
                videoNavList:'',
                active:'',
                videoList:''
            }
        },
        methods: {
            //跳转搜索页面
            toSearch(){
                this.$router.push('/search')
            },
            // 获取视频分类导航列表
            async getVideoGroupList(){
                const videoGroupListData = await get('/video/group/list')
                this.videoNavList = videoGroupListData.data.data.slice(0,18)
                this.getVideoList(this.videoNavList[0].id)
            },
            // 通过视频分类id获取对应视频
            async getVideoList(id){
                const videListData = await get('/video/group',{id})
                this.videoList = videListData.data.datas
            },
            //导航标签点击回调函数
            changeNav(i){
                this.getVideoList(this.videoNavList[i].id)
            },
            // 跳转视频详情页面
            toVideo($event,videoList,index,vid){    
                this.$router.push({
                    name:'video',
                    params:{
                        videoList,
                        index,
                        vid
                    }
                })
            }
        },
        created() {
            const userInfo = localStorage.getItem('userInfo')
            //判断是否登录
            if (!userInfo){
                Dialog.alert({
                    title: '请先登录',
                }).then(() => {
                this.$router.push('/login')
                }) 
                return         
            }
            this.getVideoGroupList()

        },
    }
</script>

<style scoped>
.find{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
/* 头部搜索框 */
.header {
    margin-top: 5px;
    display: flex;
    padding: 5px;
}
.header .search{
    margin: 0 10px;
    width: 80%;
    height: 40px;
    background-color: rgb(240, 240, 240,0.7);
    border-radius: 20px;
    display: flex;
}
.header img{
    width: 30px;
    height: 30px;
    margin-top: 5px;
}
.header .search  img{ 
    margin-left: 80px;
    margin-top: 10px;
    width: 20px;
    height: 20px;
}
.header .search  span{
    margin-top: 5px;
    font-size: 20px;
}
/* 视频列表 */
.videoListscroll{
    overflow-y: scroll;
    background-color: rgb(240, 240, 240);
    height: calc(100vh - 140px);
}

.videoContent{
    padding: 10px;
    margin: 15px 5px;
    /* border-radius: 30rpx; */
    background-color: rgb(255, 255, 255);
}
.videoContent .video{
    width: 100%;
    height: 200px;
    border-radius: 10px;
}
.content {
    font-size: 16px;
    height:80rpx;
    line-height: 40px;
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.footer {
    border-top: 1px solid #eee;
    padding: 10px 0;
}
.footer .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
}

.footer  .nickName {
    font-size: 13px;
    vertical-align: middle;
    margin-left: 10px;
}

.footer .comments_praised {
    float: right;
}

.comments_praised .btn {
    display: inline;
    padding: 0;
    background-color: transparent;
    border-color: transparent;
}

.comments_praised .btn:after {
    border: none;
}

.comments_praised .item {
    margin-right: 40px;
    position: relative;
}

.comments_praised .item .count {
    position: absolute;
    top: -10px;
    font-size: 10px;
}
</style>