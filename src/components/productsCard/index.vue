<script setup>
import { defineProps, defineEmits } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const changePage = (url) => {
	router.push(url)
}
defineProps({
  image:{
    type: String,
    default: ''
  },
  title:{
    type: String,
    default: ''
  },
  prize:{
    type: Number,
    default: ''
  },
  desc: String,
  default: ''
})
const emit = defineEmits(['btnClick', 'imageClick'])
const handelClick = () => {
  emit('btnClick')
}
const imageClick = () => {
  emit('imageClick')
}


</script>
<template>
      <div class="w-[240px] h-[500px] text-center">
				<img
        :src="image" alt=""  @click="imageClick" class="w-[200px] h-[290px] mx-4 cursor-pointer duration-500  hover:scale-95 hover:brightness-75 ">
				<h5>{{ title }}</h5>
				<h6>{{ `NT$ ${prize}` }}</h6>
				<a-button class="bg-black" type="primary" @click="handelClick">加入購物車</a-button>
			</div>
</template>