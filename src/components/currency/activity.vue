<template>
  <div class="activty">
    <slot></slot>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.activty{
  max-height: px2rem(160);
  z-index: 2;
  position: relative;
}
</style>