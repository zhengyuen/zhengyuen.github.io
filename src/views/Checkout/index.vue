<script setup>
import { UserOutlined } from '@ant-design/icons-vue';
import { ref, computed, reactive } from 'vue';
import { useProductStore } from '@/store/product';
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';

const router = useRouter()
const route = useRoute()
const changePage = (url) => {
	router.push(url)
}
const productStore = useProductStore()
const cart = ref(productStore.cart)


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

const deliverMethod = ['超商配送', '郵局配送', '宅配到府']
const invoiceType = ['二聯式發票(個人)', '三聯式發票(公司行號)', '捐贈發票']
const payMethod = ['信用卡', '金融卡']



const formData = reactive({
        name: '',
        phone: '',
        email: '',
        address: '',
        deliverMethod: '',
        invoiceType: '',
        payment: '信用卡'
});
const addFormData = () => {
  productStore.setFormData(
      {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        deliverMethod: formData.deliverMethod,
        invoiceType: formData.invoiceType,
        payment: formData.payment
      })
  changePage('/result')
  message.success('您已成功下單')
}

</script>
<template>
    <div class="container mx-auto">
    <h1 class="fw-bold text-center font-bold text-2xl my-5">結帳</h1>
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
    <hr>
    <div class="ml-10 my-3 ">
      <h1 class="font-bold">填寫寄送資訊</h1>
      <form>
        <div>
          <label for="name" class="text-sm">姓名</label>
          <input v-model="formData.name" id="name" type="text" class="ml-2 pl-2 mt-2 focus:outline-0 border border-black rounded text-black">
        </div>
        <div>
          <label for="phone" class="text-sm">電話</label>
          <input v-model="formData.phone" id="phone" type="text" class="ml-2 pl-2 mt-2 focus:outline-0 border border-black rounded text-black">
        </div>
        <div>
          <label for="email" class="text-sm">Email</label>
          <input v-model="formData.email" id="email" type="text" class="ml-2 pl-2 mt-2 focus:outline-0 border border-black rounded text-black">
        </div>
        <div>
          <label for="address" class="text-sm">地址</label>
          <input v-model="formData.address" id="address" type="text" class="ml-2 pl-2 mt-2 focus:outline-0 border border-black rounded text-black">
        </div>
        <div>
          <label for="delivery" class="text-sm">寄送方式</label>
          <select v-model="formData.deliverMethod" id="delivery" class="mt-2 ml-2 border border-gray-500 text-black">
            <option v-for="item in deliverMethod" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <div>
          <label for="invoice" class="text-sm">電子發票類型</label>
          <select v-model="formData.invoiceType" id="invoice" class="mt-2 ml-2 border border-gray-500 text-black">
            <option v-for="item in invoiceType" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
      </form>
      </div>
			<hr>
      <div class="ml-10 my-3 ">
      <h1 class="font-bold">付款方式</h1>
      <a-button v-for="item in payMethod"
      @click="formData.payment = item"
      :key="item"
      :class="['mr-2 last:mr-0', { 'border-2 border-yellow-300 border-solid': item === formData.payment }]"
      :value="item"
      >{{ item }}</a-button>
      <p class="ml-3 mt-2 text-sm text-red-400">* 以上資料皆為必填選項</p>
      </div>
			<div class="text-right mr-3">
        <hr>
        <p>商品總金額 NT ${{ totalPrize }}</p>
        <p>運費 NT $ {{ fare }}</p>
				<p>總付款金額 <span class="text-2xl"> NT ${{ totalPrize += fare }}</span></p>
			<a-button @click="addFormData" class="bg-black text-white my-3  disabled:bg-modalGray disabled:text-white" type="submit" :disabled="!formData.name ||!formData.phone ||!formData.email ||!formData.address ||!formData.deliverMethod ||!formData.invoiceType ||!formData.payment">下訂單</a-button>
		</div>
  </div>
</template>