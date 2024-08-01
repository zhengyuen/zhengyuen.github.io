<script setup>
import { ShoppingCartOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { ref, computed, reactive, h } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { useUserStore } from '@/store/user';
import { message } from 'ant-design-vue';
import { useProductStore } from '@/store/product';

const productStore = useProductStore()

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const changePage = (url) => {
	router.push(url)
}


const cartAmount = computed(() => {
	let amount = 0
	for (const item of productStore.cart) {
		amount += item.quantity
	}
	return amount
})

const token = computed(() => userStore.token)
const menuList = ref([
	{
		key: '/',
		name: '首頁',
    label: '首頁'
	},
	{
    key: '/about',
		name: '關於我們',
    label: '關於我們'
	},
	{
    key: '/products',
		name: '產品介紹',
    label: '產品介紹'
	},
	{
    key: '/cart',
		icons: 'cart',
    icon: () => h(ShoppingCartOutlined)
	},
	{
    key: '/member',
		icons: 'member',
    icon: () => h(UserOutlined)
	},
	// {
	// 	key: '/login',
	// 	name: '登入'
	// },
])
const footerImages = ref([
	'https://cdn-icons-png.flaticon.com/128/1384/1384031.png',
	'https://cdn-icons-png.flaticon.com/128/1077/1077046.png',
	'https://cdn-icons-png.flaticon.com/128/13266/13266170.png',
	'https://cdn-icons-png.flaticon.com/128/167/167649.png'

])
const logout = () => {
	userStore.setToken('')
	message.success('登出成功')
}
const situation = reactive({
  collapsed: false,
  selectedKeys: ['']
});
const toggleCollapsed = () => {
  situation.collapsed = !situation.collapsed;
};

const isDarkTheme = computed(() => userStore.isDarkTheme)
const changeTheme = (isDark) => {
  userStore.setIsDarkTheme(isDark)
}
</script>


<template>
  <div :class="{ darkMode : isDarkTheme}">
  <div class="flex flex-col min-h-screen">
    <nav class="container mx-auto h-[76px]">
      <div class="flex justify-between items-center">
        <h1 class="text-4xl font-bold cursor-pointer" @click="changePage('/')">
        Cosmetic
        </h1>
        <ul class="flex items-center ul">
          <li v-for="item in menuList"
          :key="item.key"
          :class="{'text-navColor': route.fullPath === item.key }"
          class="flex items-center mr-4 leading-[76px] cursor-pointer font-bold  last:mr-0" @click="changePage(item.key)">
            <span v-if="item.name">{{ item.name }}</span>
            <template v-if="item.icons">
              <a-badge v-if="item.icons ==='cart'" :count="cartAmount" size="small">
              <ShoppingCartOutlined v-if="isDarkTheme" class="text-white text-large"
              :class="{ 'text-navColor': route.fullPath === item.key }"
            />
             <ShoppingCartOutlined v-else class="text-black text-large"
              :class="{ 'text-navColor': route.fullPath === item.key }"
            />
              </a-badge>
              <UserOutlined v-else />
            </template>
          </li>
          <li v-if="!token"
          :class="{ 'text-navColor': route.fullPath === '/login' }"
          class="flex items-center mr-4 text-lg leading-[76px] cursor-pointer font-bold last:mr-0"  @click="changePage('/login')">
            登入
          </li>
          <li v-else class="flex items-center mr-4 text-lg leading-[76px] cursor-pointer last:mr-0"  @click="logout">
            登出
          </li>
          <li class="cursor-pointer">
          <button @click="changeTheme(false)" v-if="isDarkTheme" class="text-white px-2 py-1 rounded">
          <i class="fa-solid fa-circle-half-stroke "></i>
          </button>
          <button
          @click="changeTheme(true)" v-else class="px-2 py-1 rounded">
          <i class="fa-solid fa-circle-half-stroke "></i>
          </button>
          </li>
        <li>
      </li>
        </ul>
      </div>
    </nav>
    <div class="nav2">
      <a-button style="margin-bottom: 10px;" class=" bg-black text-white" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="situation.collapsed" />
        <MenuFoldOutlined v-else />
      </a-button>
        <a-menu
        mode="inline"
        theme="dark"
        v-model:selectedKeys="situation.selectedKeys"
        :hidden="situation.collapsed"
        :router="true"
        :items="menuList"
        :inline-collapsed="situation.collapsed"
        @click="changePage(`${situation.selectedKeys}`)"
      >
      </a-menu>
      </div>

    <div class="flex-1">
      <slot />
    </div>
    <footer v-if="isDarkTheme" class="bg-white text-black">
          <h6 class="text-center py-4">聯絡我們<br>信箱：cosmetic@gmail.com</h6>
          <div class="flex justify-center">
            <img class="w-[30px] h-[30px] my-3 mx-4 cursor-pointer" v-for="(item, idx) in footerImages" :key="idx" :src="item" :alt="idx">
            </div>
            <!-- <h6 class="text-right py-4">© 2024 Cosmetic All Right Reserved</h6> -->
      </footer>
        <footer v-else class="bg-footerColor">
          <h6 class="text-center py-4">聯絡我們<br>信箱：cosmetic@gmail.com</h6>
          <div class="flex justify-center">
            <img class="w-[30px] h-[30px] my-3 mx-4 cursor-pointer" v-for="(item, idx) in footerImages" :key="idx" :src="item" :alt="idx">
            </div>
            <!-- <h6 class="text-right py-4">© 2024 Cosmetic All Right Reserved</h6> -->
      </footer>
  </div>
  </div>
</template>

<style scoped>

li{
  font-size: 18px;
}
.nav2{
  display: none;
}
@media screen and (max-width: 576px) {
	/* 設備小於 576px */
  h1{
    position:relative;
    ;
    z-index: 2;
    top:15px;
  }
  li{
    font-size: 12px;
    line-height: 30px;
  }
  .ul{
  flex-direction: column;
  z-index: 2;
  width:70px;
  height: 20px;
  overflow: hidden;
  visibility: hidden;
}
.ul:hover{
  overflow: visible;
  visibility: visible;
}
.nav2{
display: inline-block;
z-index:2;
position: absolute;
right: 0px;
top: 20px;
}
}

</style>