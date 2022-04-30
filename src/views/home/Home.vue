<template>
    <div>
        <!-- 头部 -->
        <div class="header">
            <img src="../../assets/images/logo.png">
            <div class="search" @click="toSearch">
                <img src="../../assets/images/search/search.png">    
                <span>搜索歌曲</span>
            </div>
            <img src="../../assets/images/search/voice.png">
        </div>
        <!-- 轮播图· -->
        <div class="swiper">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="s in swiperData" :key="s.id">
                    <img :src="s.pic" >
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 菜单 -->
        
        <div class="navContainer" >
            <div class="navItem" @click="toRecommend">
                <span class="iconfont icon-tuijian"></span>
                <span>每日推荐</span>
            </div>
            <div class="navItem">
                <span class="iconfont icon-bofanggedan"></span>
                <span>歌单</span>
            </div>
            <div class="navItem" @click="toRanking">
                <span class="iconfont icon-paihangbang_paiming"></span>
                <span>排行榜</span>
            </div>
            <div class="navItem" >
                <span class="iconfont icon-zhuanji"></span>
                <span>专辑</span>
            </div>
            <div class="navItem">
                <span class="iconfont icon-zhibo"></span>
                <span>直播</span>
            </div>
        </div>
        <!-- 推荐歌单 -->
        <div class="recommend">
            <!-- 头部区域 -->
            <div class="hearder" >
                <span class="left">推荐歌单</span>
                <span class="right" @click="toRecommend">更多></span>
            </div>

            <!-- 内容区 -->
            <div class="recommendScroll" >
                <div class="scrollItem" v-for="r in recommendList" :key="r.id">
                    <img :src="r.picUrl"/>
                    <span>{{r.name}}</span>
                </div>     
            </div>
        </div>
        <!-- 雷达歌单 -->
        <!-- Look直播 -->
        <!-- 排行榜 -->
        <div class="top">
            <div class="hearder" >
                <span class="left">排行榜</span>
                <span class="right" @click="toRanking">更多></span>
            </div>
            <van-swipe class="topSwiper" :width="320" :loop="false" :show-indicators="false">
                <van-swipe-item class="topContent" v-for="t in topList" :key="t.id">
                <div class="title">{{t.name}}></div>
                <div class="musicList" v-for="(m,index) in t.tracks.slice(0,3)" :key="m.id"> 
                    <img :src="m.al.picUrl" >
                    <span class="count">{{index+1}}</span>
                    <span class="musicName">{{m.name}}</span>
                    <span class="musicAutor">-{{m.ar[0].name}}</span>
                </div>     
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import {get,post} from '../../utils/axios'
    export default {
        data() {
            return {
                swiperData:'',
                navList:'',
                recommendList:'',
                topList:[]               
            }
        },
        methods: {
            // 跳转推荐歌曲页面
            toRecommend(){
                this.$router.push('/recommend')
            },
            // 跳转排行榜页面
            toRanking(){
                this.$router.push('/ranking')
            },
            //跳转搜索页面
            toSearch(){
                this.$router.push('/search')
            },
            async banner(){
                const bannerData = await get('/recommend/resource')
                console.log(bannerData.data);
            },
            // 轮播图
            async getSwiper(){
                const bannerData = await get('/banner',{type:1})
                this.swiperData = bannerData.data.banners
            },
            // 每日推荐
            async getRecommend(){
                const recommendData = await get('/personalized',{limit:10}) 
                this.recommendList = recommendData.data.result
            },
            // 排行榜
            async getTopList(){
                const topListData= await get('/toplist/detail')             
                 topListData.data.list.slice(0,8).forEach(async element => {
                    let music = await get('/playlist/detail',{id:element.id})
                    this.topList.push(music.data.playlist)
                });
            },
            //热门话题
            async getHotTopic(){
                const hotTopicData = await get('/hot/topic',{limit:10,offset:10})
                // console.log(hotTopicData.data);
            },
            //话题详情
            async getTopicDetail(){
                const hotTopicData = await get('/topic/detail',{actid:118279232})
                // console.log(hotTopicData.data);
            },
            
        },
        created() {
            this.getSwiper()
            this.getRecommend()
            this.getTopList()
            this.getHotTopic()
            this.getTopicDetail()
        },
        
    }
</script>

<style scoped>
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
/* 轮播图 */
.swiper{
    margin: 10px 0;
    border-radius: 15px;
    height: 154px;
}

.my-swipe img{
    width: 96%;
    border-radius: 10px;
    margin: 0 2%;
    height: 150px;
    
}
/* 导航栏 */
.navContainer {
    display: flex;
}

.navItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
}


.navItem .iconfont {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    background: rgb(240, 19, 19);
    font-size: 25px;
    color: #fff;
    margin: 10px 0;
}


.navItem  span{
    font-size: 14px;
}

/* 推荐歌单 */
.recommend {
    padding: 10px;
}


/* 推荐内容区*/
.recommendScroll {
    display: flex;
    height: 150px;
}
.recommendScroll::-webkit-scrollbar{
    display: none;
}

.hearder .left{
    font-size: 16px;
    line-height: 40px;
    font-weight: bold;
}
.hearder{
    width: 100%;
    margin-bottom: 10px;
}
.hearder .right{
    float: right;
    border: 1px solid #333;
    margin: 10px;
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 15px;
}
.recommendScroll{
    overflow-x: scroll;
}
.scrollItem {
    width: 100px;
    margin-right: 10px;

}
.scrollItem img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
}

.scrollItem span {
    font-size: 13px;
    /* 单行文本溢出隐藏 省略号代替 */
    /*display: block;*/
    /*white-space: nowrap;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/

    /* 多行文本溢出隐藏 省略号代替*/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical; /*设置对其模式*/
    -webkit-line-clamp: 2; /*设置多行的行数*/
}
.top{
    padding: 10px;
  
}
.topSwiper{
    height: 200px;
    width: 96%;
}
.topContent{
    /* width: 96%; */
    background:#fbfbfb;
    border-radius: 15px;
    
}

.top .topContent .title{
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}
/* 排行榜列表 */
.musicList{
    display: flex;
    margin-bottom: 10px;
}
.musicList img{
    width: 50px;
    height: 50px;
    border-radius: 3px;
}

.musicList .count {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
}

.musicList .musicName{
    height: 50px;
    line-height: 50px;
    max-width: 125px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 8px;
}
.musicList .musicAutor{
    height: 50px;
    line-height: 50px;
    max-width: 125px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 8px;
    font-size: 10px;
}
</style>