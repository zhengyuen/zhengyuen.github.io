<script setup>
import { UserOutlined, ArrowDownOutlined, CheckCircleOutlined  } from '@ant-design/icons-vue';
import { useUserStore } from '@/store/user';
import { ref } from 'vue'

const userStore = useUserStore()
const isDarkTheme = ref(userStore.isDarkTheme)
</script>
<template>
    <h1 class="fw-bold text-center font-bold text-2xl my-5">會員</h1>
        <a-tabs v-model:activeKey="activeKey" animated v-if="isDarkTheme" class="text-white">
    <a-tab-pane key="1" tab="訂單查詢" class="text-center">
      <li class="text-white font-bold bg-green w-[100px] mx-auto my-3">已下訂單</li><ArrowDownOutlined />
      <li class="my-3 font-bold">已出貨</li><ArrowDownOutlined />
      <li class="my-3 font-bold">到達物流中心</li><ArrowDownOutlined />
      <li class="my-3 font-bold">到達指定位置</li><ArrowDownOutlined />
      <li class="my-3 font-bold">訂單完成 </li><CheckCircleOutlined class="mb-4"/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="會員資料">
      <div class="text-center mb-4">
      <a-avatar :size="64">
      <template #icon><UserOutlined /></template>
      </a-avatar>
      <h1 class="font-bold">我的檔案</h1><button>上傳照片</button>
      <p class="mt-4">帳號: xxx</p>
      <span>姓名:</span><input type="text"  class="border-2 rounded ml-2 mt-1 text-black"><br>
      <span>電話:</span><input type="text"  class="border-2 rounded ml-2 mt-1 text-black"><br>
      <span>地址:</span><input type="text"  class="border-2 rounded ml-2 mt-1 text-black"><br>
        <span>信箱:</span><input type="text"  class="border-2 rounded ml-2 mt-1 text-black"><br><br>
        <button class="bg-black text-white rounded w-10">確認</button>
      </div>
    </a-tab-pane>
  </a-tabs>
    <a-tabs v-model:activeKey="activeKey" animated v-else class="text-black">
    <a-tab-pane key="1" tab="訂單查詢" class="text-center">
      <li class="text-white font-bold bg-green w-[100px] mx-auto my-3">已下訂單</li><ArrowDownOutlined />
      <li class="my-3 font-bold">已出貨</li><ArrowDownOutlined />
      <li class="my-3 font-bold">到達物流中心</li><ArrowDownOutlined />
      <li class="my-3 font-bold">到達指定位置</li><ArrowDownOutlined />
      <li class="my-3 font-bold">訂單完成 </li><CheckCircleOutlined class="mb-4"/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="會員資料">
      <div class="text-center mb-4">
      <a-avatar :size="64">
      <template #icon><UserOutlined /></template>
      </a-avatar>
      <h1 class="font-bold">我的檔案</h1><button>上傳照片</button>
      <p class="mt-4">帳號: xxx</p>
      <span>姓名:</span><input type="text"  class="border-2 rounded ml-2 mt-1 text-black"><br>
      <span>電話:</span><input type="text"  class="border-2 rounded ml-2 mt-1 text-black"><br>
      <span>地址:</span><input type="text"  class="border-2 rounded ml-2 mt-1 text-black"><br>
        <span>信箱:</span><input type="text"  class="border-2 rounded ml-2 mt-1 text-black"><br><br>
        <button class="bg-black text-white rounded w-10">確認</button>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>