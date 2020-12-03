// 判断当前设备是否是iphonex
const isIphoneX = () => {
  if(typeof window !== 'undefined' && window){
    // 先判断是不是iphone，再判断iphonex及以上设备
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
  }
  return false;
} 
// 赋值给window对象下的一个属性
window.isIphoneX = isIphoneX()