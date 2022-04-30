<template>
    <div class="recommend">
        <div class="header">
            <div class="nav">
                <img src="../../assets/images/recommend/fanhui1.png" @click="toBack">
                <img src="../../assets/images/recommend/san.png" class="right">
            </div>
            <img src="../../assets/images/recommend/recommend4.jpeg">
            <div class="date">
                <span class="day">{{day}}</span>
                <span class="month"> / {{month}}</span>
                <div class="cont">查看今日运势>></div>
            </div>
            <button class="history">历史推荐</button>
        </div>
        <div class="musicList">
            <div class="listHeader">
                <img src="../../assets/images//recommend/bofang.png">
                <span>播放全部</span>
                <span class="ringht">更多</span>
            </div>
            <div  class="musicScroll">
                <div class="musicItem" v-for="r in recommendSongs" :key="r.id">
                    <img :src="r.al.picUrl">
                    <div class="musicInfo">
                        <span class="musicName">{{r.name}}</span>
                        <span class="author" v-if="r.ar.length > 1"> &nbsp;&nbsp;{{r.ar[0].name}}/{{r.ar[1].name}}-{{r.al.name}}</span>
                        <span class="author" v-else>&nbsp;&nbsp;{{r.ar[0].name}}-{{r.al.name}}</span>
                    </div>
                    <div class="musicIcon">
                        <span class="iconfont icon-bofang"></span>
                        <span class="iconfont icon-sangedian-copy"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {get} from "../../utils/axios"
    export default {
        data() {
            return {
                day:'',
                month:'',
                recommendSongs:''
            }
        },
        methods: {
            async getRecommend(){
                const recommendData = await get('/recommend/songs')
                this.recommendSongs = recommendData.data.data.dailySongs
            },
            toBack (){
                this.$router.go(-1)
            }
        },
        created() {
            const date = new Date()
            this.day = date.getDate()
            this.month = date.getMonth() + 1
            this.getRecommend()
        },
    }
</script>

<style scoped>
.recommend{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.header{
    position: relative;
    width: 100%;
    height: 200px;
}
.header .nav{
    position: absolute;
    width: 94%;
    margin: 16px 12px;
}
.header .nav img{
    width: 24px;
    height: 24px;
}
.header .nav .right{
    float: right;
}
.header img{
    width: 100%;
    height: 106%;
}
 .header .date {
    position: absolute;
    top: 100%;
    margin-top: -80px;
    margin-left: 15px;
    width: 120px;
    line-height: 30px;
    color: #fff;
}
.header .date .day{
    font-size: 30px;
    font-weight: bold;
}
.header .date .month{
    font-size: 20px;
    font-weight: bold;
}
.cont{
    font-size: 16px;
}
.history{
    width: 100px;
    line-height: 30px;
    font-size: 16px;
    position: absolute;
    background-color: rgb(218, 218, 218,0.65);
    color: rgb(240, 240, 240);
    top: 100%;
    left: 100%;
    margin-left: -120px;
    margin-top: -55px;
    border-radius: 15px;
}

/* 推荐歌曲列表 */
.musicList{
    position: relative;
    padding-top: 15px;
    background-color: #fff;
    border-radius: 15px;
}

/* 列表头部 */
.listHeader{
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    margin: 10px;
}
.listHeader img{
    position: relative;
    margin-right: 10px;
    top: 5px;
    width: 30px;
    height: 30px;
}
.ringht{
    float: right;
}
/* 列表内容 */
.musicScroll{
    overflow-y: scroll;
    height: calc(100vh - 280px)
}
.musicScroll .musicItem{
    display: flex;
    padding: 10px;
    margin-bottom: 3px;
}
.musicScroll .musicItem img{
    width: 40px;
    height: 40px;
    border-radius: 6px;
}
.musicItem .musicInfo{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}
.musicItem .musicInfo span{
    height: 20px;
    line-height: 20px;
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.musicItem .musicInfo .musicName{
    font-size: 15px;
}
.musicItem .musicInfo .author{
    font-size: 12px;
    color: rgb(95, 95, 95);
}
.musicItem .musicIcon{
    position: absolute;
    right: 10px;
    width: 60px;
    height: 60px;
    line-height: 40px;
    text-align: right;
}
.musicItem .musicIcon .iconfont{
    font-size: 24px;
    margin-right: 12px;
    color: rgb(148, 148, 148);
}
</style>