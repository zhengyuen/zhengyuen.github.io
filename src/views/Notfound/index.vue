<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const goToHome = () => {
	router.push('/')
}
</script>
<template>
  <div class="text-center">
    <div class="h-80 mb-4">
      <img class="mx-auto overflow-hidden" src="https://static.vecteezy.com/system/resources/thumbnails/002/556/960/small_2x/young-woman-angry-because-error-404-free-vector.jpg" alt="">
    </div>
    <h1 class="text-lg mb-4">抱歉~沒有這個頁面哦</h1>
    <button class="bg-black text-white rounded w-40 mb-6" @click="goToHome()">回首頁</button>
  </div>
</template>