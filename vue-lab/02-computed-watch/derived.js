/**

 * Day 21 练习：computed 与 watch

 * 完成 2 个 TODO，通过 exercise.js 验证

 */

import { ref, computed, watch } from 'vue';



// TODO 1: 用 computed 实现购物车总价

export function createCartSummary() {

  const price = ref(100);
  const quantity = ref(2);
  const total = computed(() => price.value * quantity.value);

  return { price, quantity, total };

}



// TODO 2: 用 watch 实现库存预警

export function createStockWatcher() {

  const stock = ref(20)
  const alerts = ref([])
  const decrease = (num) =>{
      stock.value -= num
  }

  watch(stock,(newVal)=>{
    if(newVal < 10){

      alerts.value.push(`库存告急: ${newVal}`)
    }
  })

  return{stock,alerts,decrease}
}


