<script setup>
import { useRouter } from 'vue-router';
import { useProductStore } from '@/store/product';
import { ref,computed } from 'vue'

const productStore = useProductStore()
const cart = ref(productStore.cart)
const router = useRouter()

const changePage = (url) => {
	router.push(url)
}
const totalPrize = computed(() => {
	let price = 0
	for (const item of productStore.cart) {
		price += item.quantity * item.prize
	}
	return price
})

const columns = [
	{
		key:'cover',
    title: '圖片',
    dataIndex: 'cover',
    width: 150,
  },
  {
    title: '商品',
    dataIndex: 'title',
    width: 150,
  },
  {
    title: '單價',
    dataIndex: 'prize',
    width: 150,
  },
  {
		key: 'quantity',
    title: '數量',
    dataIndex: 'quantity',
  },
	{
		key: 'total',
    title: '總價',
    dataIndex: 'total',
  },
	{
		key: 'operation',
		title: '操作',
		dataIndex: 'operation'
	}
];
const adjustQuantity = (id, num) => {
	cart.value = cart.value.map(product => {
		if (product.id === id) {
			if (product.quantity > 1 || ( product.quantity === 1 && num > 0)) {
			product.quantity += num
			}
			return product
		}if (product.quantity === 0){
			const newCart = productStore.cart.filter(product => product.id !== id)
			productStore.setCart(newCart)
			cart.value = newCart
		}
		return product
	})
}
const deleteProduct = (id) => {
	const newCart = productStore.cart.filter(product => product.id !== id)
	productStore.setCart(newCart)
	cart.value = newCart
}
</script>

<template>
	<div class="container mx-auto">
	<div  class="text-center">
		<h1 class="mb-3 mt-3 font-bold text-2xl">我的購物車</h1>
		<a-table
    :columns="columns"
    :data-source="cart"
  >
		<template #bodyCell="{ column, record }">
			<template v-if="column.key === 'cover'">
				<img :src="record.cover" alt="image" class="object-cover w-[80px] h-[80px]">
			</template>
			<template v-if="column.key ==='total'">
					{{ `$ ${record.prize * record.quantity}` }}
			</template>
			<template v-if="column.key === 'quantity'">
			<div class="flex pl-1">
        <button class="list-none text-center w-[20px] h-[30px] bg-pink" @click="adjustQuantity(record.id, 1)">+</button>
        <input class="w-[50px] text-center border-2" type="text" :value="record.quantity">
        <button class="list-none text-center w-[20px] h-[30px] bg-pink" @click="adjustQuantity(record.id, -1)">-</button>
      </div>
			</template>
			<template v-if="column.key === 'operation'" >
					<a-button @click="deleteProduct(record.id)">刪除</a-button>
			</template>
		</template>
	</a-table>
	</div>
		</div>
			<hr class="w-[200px] mt-5 ">
			<div class="text-right mr-32">
				<p>總金額NT ${{ totalPrize }}</p>
			<a-button class="bg-black text-white mt-3 mb-3" @click="changePage('/checkout')" >前往結帳</a-button><br>
		</div>
		<div class="border-2 text-center justify-content-center border-dotted">
				<div class=" justify-content-center ">
					<h3>購物須知</h3>
					<ul class="list-unstyled  ">
						<li>1. 運費國內超商店到店為60元，郵寄60元，滿1,200免運費。</li>
						<li>2. 若商品有缺損或想更改，退款和換貨請在七天前申請。</li>
						<li>3. 付款後三日內及會出貨，若遇國定假日和週末則在工作日開始出貨。</li>
					</ul>
					<h3 class="mt-3">客服專線</h3>
					<ul class="list-unstyled mb-3">
						<li>電話：00-000000</li>
						<li >信箱：cosmetic@gmail.com</li>
					</ul>
				</div>
			</div>
</template>

<style scoped>
.ant-table-cell {
	display: flex;
	align-items: center;
}
</style>