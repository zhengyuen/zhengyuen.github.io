<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useProductStore } from '@/store/product';
import ProductsCard from '@/components/productsCard/index.vue'


const productStore = useProductStore()
const router = useRouter()

const changePage = (url) => {
	router.push(url)
}

watch((productStore.products))
const products = ref(productStore.products || [])


const addCart = (id) => {
const product = productStore.products.find(product => product.id === id)
// if (!productStore.cart) { // 購物車沒東西
// 	productStore.setCart([{
// 		...product,
// 		quantity: 1
// 	}])
// 	return
// }


const hasProduct = productStore.cart.some(product => product.id === id)
if (hasProduct) { //cart 有產品
	const newCart = productStore.cart.map(product	=> {
			if (product.id === id){
				product.quantity += 1
				return product
			}
			return product
		})
		productStore.setCart(newCart)
} else { // cart 沒有產品
	productStore.setCart([...productStore.cart, {
		...product,
		quantity: 1
	}])
}
message.success('已加入購物車')
}
watch(() => productStore.products, (newVal) => {
  products.value = newVal;
});
</script>
<template>

	<div class="container">
		</div>
		<h1 class="fw-bold text-center font-bold text-2xl my-5">產品介紹</h1>
			<h3 class="text-center">
			<ins class="text-pink font-bold text-xl my-5">經典組合</ins></h3>
			<div >
			<div class="flex justify-center">
				<template v-for="(item, idx) in products">
				<products-card
				v-if="idx < 3"
				class="mx-4"
				:key="item.title"
				:image="item.cover"
				:title="item.title"
				:prize="item.prize"
				:desc="item.desc"
				@image-click="changePage(`/product/${item.id}`)"
				@btn-click="addCart(item.id)"
				/>
				</template>
			</div>
			</div>
			<div class="text-center justify-content-center">
				<h3>
			<ins class=" text-pink font-bold text-xl my-5">乳液</ins></h3>
			</div>
			<div class="flex justify-center">
				<products-card
				v-for="item in products.filter((_,idx) => idx > 2 && idx < 6)"
				class="mx-4"
				:key="item.id"
				:image="item.cover"
				:title="item.title"
				:prize="item.prize"
				:desc="item.desc"
				@image-click="changePage(`/product/${item.id}`)"
				@btn-click="addCart(item.id)"
				/>
		</div>
</template>

<style scoped>
</style>
