<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue';
import { useProductStore } from '@/store/product';


const router = useRouter()
const changePage = (url) => {
	router.push(url)
}

const productStore = useProductStore()
const cart = ref(productStore.cart)
const formData = ref(productStore.formData)
const totalPrize = computed(() => {
	let price = 0
	for (const item of productStore.cart) {
		price += item.quantity * item.prize
	}
	return price
})
const fare = computed(() => {
  if (totalPrize.value < 1200){
    return 60
  } else {
    return 0
  }
})

</script>
<template>
  <h1 class="font-bold ml-10">訂單商品</h1>
    <div v-for="(item) in cart" :key="item.title" class="flex h-[150px] ml-10">
			<img class="w-[70px] h-[100px] mx-5 my-auto" :src="item.cover" alt="">
			<p class="my-auto ml-2 font-bold" v-if="cart.id === title">{{ item.title }}</p>
			<div class="flex pl-1 my-auto">
        <div class="w-[50px] h-[30px] text-center" v-if="cart.id === quantity" type="text" >x {{ item.quantity }}
      </div>
      </div>
			<p class="my-auto ml-5" v-if="cart.id === total">NT${{ item.prize * item.quantity }}</p>
    </div>
    <div class="text-right mr-3">
        <hr>
        <p>商品總金額 NT ${{ totalPrize }}</p>
        <p>運費 NT $ {{ fare }}</p>
				<p>總付款金額 <span class="text-2xl"> NT ${{ totalPrize += fare }}</span></p>
        </div>
    <hr>
    <div class="ml-10 my-3">
      <h1 class="font-bold">收件人資訊</h1>
      <hr>
      <div class="mt-3 w-50 ml-5">
        <p>姓名:  {{ formData.name }}</p>
        <p>電話:  {{ formData.phone }}</p>
        <p>Email:  {{ formData.email }}</p>
        <p>地址:  {{ formData.address }}</p>
        <p>寄送方式:  {{ formData.deliverMethod }}</p>
        <p>電子發票類型:  {{ formData.invoiceType }}</p>
        <p>付款方式:  {{ formData.payment }}</p>
      </div>
      <div class="text-right mr-3">
          <a-button class="bg-black text-white text-right mt-2" @click="changePage('/products')">繼續購買</a-button>
        </div>
      </div>
</template>