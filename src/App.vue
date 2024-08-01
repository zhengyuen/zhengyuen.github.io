<script setup>
import CosLayout from '@/components/cosLayout/index.vue'
import { onMounted, ref, watch } from 'vue';
import { productApi } from '@/api/products'
import { useProductStore } from '@/store/product';


const productStore = useProductStore()

const getProductData = async() => {
	const { code, data } = await productApi.getProducts();
	if (code === 200){
    productStore.setProducts(data);
	}
}

onMounted(() => {
	if (!productStore.length){
		getProductData();
	}
})
</script>

<template>
  <cos-layout>
    <router-view/>
  </cos-layout>
</template>

<style scoped>

</style>
