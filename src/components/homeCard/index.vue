<script setup>
import { defineProps } from 'vue';
defineProps({
  image: {
    type: String,
    default:''
  },
  title:{
    type: String,
    default:''
  },
  desc:{
    type: String,
    default:''
  },
  isReverse:{
    type:Boolean,
    default: false
  }
})
</script>
<template>
  <div class="flex w-[400px] h-[200px] mb-10" :class="{ 'flex-row-reverse': isReverse }">
			<div class="w-1/2 mr-4">
				<img class="w-full h-full object-fit"
			:src="image"
			alt="">
			</div>
			<div class="w-1/2 text-center p-4 relative">
				<div class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<h5 class="mb-5">{{ title }}</h5>
				<h4 class="text-pink w-full ">{{ desc }}</h4>
				</div>
			</div>
		</div>
</template>