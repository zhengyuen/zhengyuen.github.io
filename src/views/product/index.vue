<script setup>
import { ref, computed, watch } from 'vue'
// import { addCart, getCart } from '@/utils/localStorage.js'
import { useProductStore } from '@/store/product';
import { HeartFilled } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';


const productStore = useProductStore();
const router = useRouter();
const route = useRoute();
const productId = ref(Number(route.params.id));
const changePage = (url) => {
	router.push(url);
};
// const products = ref(JSON.parse(localStorage.getItem('products') || []))
const products = ref(productStore.products);
const product = computed(() => products.value.find(product => product.id === productId.value));
const tabImages = computed(() => product.value?.images || []);
const title = computed(() => product.value?.title || '');
const tabPrize = computed(() => product.value?.prize || 0);

  const tabImageIndex = ref(0);
  const changeImage = (index) => {
    tabImageIndex.value = index
  }
  const cover = computed(() => tabImages.value[tabImageIndex.value]);
  const amount = ref(1);
  const plus = () => {
    amount.value += 1
  }
  const minus = () => {
    if (amount.value > 1){
      amount.value -= 1
    }
  }

const addCart = () => {
  // if (!productStore.cart.length) { // 購物車沒東西
  //   console.log('add');
  //   productStore.setCart([{
  //     ...product.value,
  //     quantity: amount.value
  //   }])
  //   return
  // }
  const hasProduct = productStore.cart.some(product => product.id === productId.value)
  if (hasProduct) { //cart 有產品
    const newCart = productStore.cart.map(product	=> {
      if (product.id === productId.value){
        product.quantity += amount.value
          return product
        }
        return product
      })
      productStore.setCart(newCart)
  } else { // cart 沒有產品
    productStore.setCart([...productStore.cart, {
      ...product.value,
      quantity: amount.value
    }])
  }
  message.success('已加入購物車')
}

const isCollect = ref(productStore.collection.some(productId => productId === productId.value))
const collect = () => {
  isCollect.value = !isCollect.value
  if (isCollect.value) {
    productStore.setCollection([...productStore.collection, productId.value])
  } else {
    productStore.setCollection(productStore.collection.filter(num => {
      return num !== productId.value
    }))
  }
}

watch(() => productStore.products, (newVal) => {
  products.value = newVal;
});

</script>
<template>
  <div class="container">
    <div class="flex font-bold ml-4 mb-4">
      <div class="w-1/2 h-[520px] mr-8">
        <div class="flex gap-2">
          <div class="w-2/3">
            <img class="w-full h-[520px] object-cover" :src="cover" alt="">
          </div>
          <div class="w-1/3">
            <div class="flex flex-col">
              <div v-for="(item, idx) in tabImages" class="box-border mb-2 cursor-pointer" :key="item.id"
                @click="changeImage(idx)">
                <img class="w-full h-[124px] object-cover" :src="item" alt="image">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <h1 class="text-2xl text-center m-3 font-bold" v-if="title">{{ title }}</h1>
        <ul class="font-bold list-disc">
          <li>高科技前導技術，快速疏通肌脂通道，有效解決輕度肌膚屏障受損、敏感或暗沉</li>
          <li>無重力水感小分子，將修護油轉化至小於肌膚間質通道的奈米級微粒，有效滲透肌底</li>
          <li>水感油配方，透過高科技處理，將黏稠油脂轉化為液態配方，肌膚更容易吸收</li>
          <li>通過貼布測試/無香料/無酒精/無Paraben/無色素/無礦物油</li>
        </ul>
        <h2>價格</h2>
        <p class="text-xl" v-if="tabPrize">{{`NT$ ${tabPrize}`}}</p>
        <!--數量按鈕-->
        <div class="flex pl-1 my-3">
          <button @click="plus" class="list-none text-center w-[20px] h-[30px] bg-pink">+</button>
          <input class="w-[50px] text-center border-2" type="text" v-model="amount">
          <button @click="minus" class="list-none text-center w-[20px] h-[30px] bg-pink">-</button>
        </div>
        <a-button class="bg-pink mr-2 font-bold" @click="addCart">加入購物車</a-button>
        <a-button class="bg-pink font-bold" @click="changePage('/checkout')">立即購買</a-button>
        <a-button @click="collect"
          :class="['mt-3 hover:text-pink flex items-center', { 'bg-pink text-red-400 font-bold': isCollect }]">
          <template #icon>
            <HeartFilled />
          </template>
          <span>加到最愛</span>
        </a-button>
      </div>
    </div>
  </div>
</template>