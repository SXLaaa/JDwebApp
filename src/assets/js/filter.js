 import Vue from 'vue';

/**
 * 金额数据处理
 * */ 
Vue.filter('priceValue', function(value){
  if(!value){
    return '0.00';
  }
  let result = parseFloat(value); //返回浮点数
  if(Number.isInteger(result)){ // 判断是否为整数
    return result
  }
  return result.toFixed(2); // 返回保留两位的小数
})
/**
 * 时间过滤器
*/
Vue.filter('filterTime',function(value){
  if(!value){
    return '';
  }
  // value 不是 时：分：秒
  if(value.indexOf(":")  === -1 ){
    return value
  }
  let result = '';
  const arr = value.split(':') // 时arr[0] 分arr[1] 秒arr[2]
  // 时
  if(parseInt(arr[0]) < 10){
    result = '0' + arr[0]
  }else{
    result = arr[0]
  }
  //分
  if(parseInt(arr[1]) < 10){
    result = result + ':0' + arr[1]
  }else{
    result = result + ':' + arr[1]
  }
  //秒
  if(parseInt(arr[2]) < 10){
    result = result + ':0' + arr[2]
  }else{
    result = result + ':' + arr[2]
  }

  return result
})