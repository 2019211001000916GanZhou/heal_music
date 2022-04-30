<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/" >
        <span>首页</span>
        <template #icon="props">
          <img v-show="props.active"  src="../assets/images/tabbar/home2.png"/>
          <img v-show="!props.active" src="../assets/images/tabbar/home.png">
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/find" >
        <span>发现</span>
        <template #icon="props">
          <img v-show="props.active"  src="../assets/images/tabbar/find2.png"/>
          <img v-show="!props.active" src="../assets/images/tabbar/find.png">
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/attention">
        <span>关注</span>
        <template #icon="props">
          <img v-show="props.active"  src="../assets/images/tabbar/attention2.png"/>
          <img v-show="!props.active" src="../assets/images/tabbar/attention.png">
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/personal">
        <span>我的</span>
        <template #icon="props">
          <img v-show="props.active"  src="../assets/images/tabbar/personal2.png"/>
          <img v-show="!props.active" src="../assets/images/tabbar/personal.png">
        </template>
      </van-tabbar-item>     
    </van-tabbar>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>