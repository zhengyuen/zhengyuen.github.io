import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const isDarkTheme = ref(false)
    const setToken = (newToken) => {
      token.value = newToken
    }
    const setIsDarkTheme =
    (bool) => {
      isDarkTheme.value = bool
    }

    return {
      isDarkTheme,
      setIsDarkTheme,
      token,
      setToken
    }
  },
  {
    persist: true
  }
)