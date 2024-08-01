<script setup>
import { defineProps } from 'vue';
import { ref } from 'vue'
defineProps({
  image:{
    type: String,
    default: ''
  },
  title:{
    type: String,
    default: ''
  },
  desc:{
    type: String,
    default: ''
  },
  isReverse:{
    type: Boolean,
    default: false
  }
  }
)
const open = ref(false)

const showModal = (bool) => {
  open.value = bool;
};
</script>
<template>
  <div class="flex justify-center py-3" :class="{ 'flex-row-reverse' : isReverse }">
			<div class="w-[200px] h-[200px] card-btn">
				<img class="object-cover w-full h-full"
        :src="image"
        alt="image" >
				</div>
				<div :class="{ 'border-left justify-center pl-4':
        !isReverse, 'border-right justify-center pr-4': isReverse }" class="card-btn w-[200px] h-[200px] flex text-center items-center ">
					<a-button @click='showModal(true)' class="cursor-pointer bg-secondaryYellow border-none text-base text-white  hover:!text-primaryYellow hover:bg-pink hover:scale-105">{{ title }}</a-button>
				</div>
			</div>
    <a-modal v-model:open="open" :title="title" @ok="showModal(false)" :footer="null" :closable="false">
      <p>{{ desc }}</p>
    </a-modal>
</template>
<style scoped>
.card-btn {
  position: relative;
}
.border-right.card-btn::before {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: block;
  width: 3px;
  height: 60px;
  background: #dee2e6;
}
.border-left.card-btn::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: block;
  width: 3px;
  height: 60px;
  background: #dee2e6;
}
</style>