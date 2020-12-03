<template>
  <div class="count-down">
    <span class="count-down-end-time">{{endHours}}点场</span>
    <span class="count-down-surplus">{{surplus | filterTime}}</span>
  </div>
</template>
<script>
export default {
  props:{
    endHours:{ // 活动开始时间
      type:Number,
      required:true,
      default:0
    }
  },
  data(){
    return{
      surplus: '', // 展示活动状态
      diffSeconds: 0, // 距离活动开始的秒数
      interval: undefined
    }
  },
  created(){
    this.computedTimes();
  },
  methods:{
    computedTimes(){
      if(this.interval){
        clearInterval(this.interval)
      }
      const date  = new Date();
      // 当前时间>活动时间：活动结束
      if(date.getHours() > this.endHours){
        this.surplus = '活动已结束';
        return;
      }
      // 当前时间=活动时间：活动进行中
      if(date.getHours() === this.endHours){
        this.surplus = '活动进行中';
        return;
      }
      // 当前时间<活动时间：展示倒计时
      // 减去1的原因是 12:00-16:00 之间的差距是3:59:59
      const diffHours = this.endHours - date.getHours() - 1;
      const diffMinutes = 60 - date.getMinutes() - 1;
      const diffSeconds = 60 - date.getSeconds();
      this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds
      this.interval = setInterval(()=> {
        this.diffSeconds = this.diffSeconds - 1 
      },1000)
    }
  },
  watch:{
    endHours(){
      this.computedTimes();
    },
    diffSeconds(newValue){
      // 将总的秒数转换为时间
      const hours = Math.floor(newValue / 3600);
      const minutes = Math.floor(newValue / 60) % 60;
      const seconds = newValue % 60
      this.surplus = hours + ':' + minutes + ':' + seconds
      if(newValue === 0){
        this.computedTimes();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.count-down{
  display: inline-block;
  font-size: $infoSize;
  margin-left: $marginSize;
  span{
    display: inline-block;
    padding: px2rem(2) px2rem(4);
  }
  &-end-time{
    background-color: $mainColor;
    border-top-left-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: white;
  }
  &-surplus{
    background-color: white;
    border-top-left-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: white;
    color: $mainColor;
  }
}
</style>