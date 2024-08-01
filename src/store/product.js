import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore(
  'product',
  () => {
    const products = ref([])
    const setProducts = (newProducts) => {
      products.value = newProducts
    }
    const cart = ref([])
    const setCart = (products) => {
      cart.value = products
    }
    const collection = ref([])
    const setCollection = (products) => {
      collection.value = products
    }
    const orders = ref([])
    const setOrders = (orders) => {
      orders.value = orders
    }
    const formData = ref([])
    const setFormData = (data) => {
      formData.value = data
    }
    return {
      collection,
      setCollection,
      products,
      cart,
      orders,
      formData,
      setProducts,
      setCart,
      setOrders,
      setFormData
    }
  },
  {
    persist: true
  }
)