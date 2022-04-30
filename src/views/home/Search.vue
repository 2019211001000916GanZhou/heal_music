<template>
    <div>
        <!-- 头部搜索区域 -->
        <div class="serach">
            <div class="header">
                <div class="searchInput">                   
                    <span class="iconfont icon-fanhuijiantou" @click="goBack"></span>
                    <input type="text" value="" :placeholder="placeholderContent" placeholder-class="placeholder" />
                    <span class="clear" >X</span>
                </div>
                <span class="cancel">搜索</span>
            </div>
            <!-- 热搜榜 -->
              <div class="hotContainer">
                  <div class="title">热搜榜</div>
                  <!-- 热搜列表 -->
                  <div class="hotList" >
                      <div class="hotItem" v-for="(h,index) in hotList" :key="h.id">
                          <span class="order">{{index + 1}}</span>
                          <span>{{h.searchWord}}</span>
                          <img class="iconImg" v-if="h.iconUrl" :src="h.iconUrl">
                      </div>
                  </div>
              </div>
        </div>
    </div>
</template>

<script>
import {get} from '../../utils/axios'
    export default {
        data() {
            return {
              timer:'',
              placeholderContent:'',
              hotList:[],
            }
        },
        methods: {
            goBack(){
              this.$router.go(-1)
            },
            async getHotData(){
              let placeholderData = await get('/search/default');
              let hotListData = await get('/search/hot/detail');
              console.log(placeholderData.data.data);
              console.log(hotListData.data.data);
              this.placeholderContent = placeholderData.data.data.showKeyword
              this.hotList = hotListData.data.data
            },
        },
        created() {
          this.getHotData()
        },
    }
</script>

<style scoped>
.serach{
  padding:10px;
}
/* 头部 */
.searchContainer {
  padding: 0 10px;
}
.header {
  display: flex;
  height: 30px;
  line-height: 30px;

}

.searchInput {
  position: relative;
  flex: 1;
}
.searchInput span{
  font-size: 16px;
}
.clear {
  position: absolute;
  right: 15px;
  z-index: 10;
  top: 0;
  font-size: 15px;
  font-weight: bold;
}
.cancel {
  width: 50px;
  text-align: center;
}


.searchIcon {
  position: absolute;
  left: 8px;
}
.searchInput input {
  width: 85%;
  margin-left: 10px;
  height: 30px;
  border-bottom-width: 1px;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
}
.placeholder{
  /*color: #d43c33;*/
  font-size: 14px;
}

/* 热搜榜 */
.hotContainer {
  margin-top: 15px;

}
.hotContainer .title {
  font-size: 13px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
}

.hotList {
  display: flex;
  flex-wrap: wrap;
}

.hotItem {
  width: 50%;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
}

.hotItem .order {
  margin: 0 5px;
}


.hotItem .iconImg {
  width: 18px;
  height: 10px;
  margin-left: 5px;
}
</style>