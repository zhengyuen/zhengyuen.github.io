export const setToken = (token) => {
  localStorage.setItem('TOKEN', token)
}
export const getToken = () => {
  return localStorage.getItem('TOKEN') || ''
}

export const addCart = (item) => {
  localStorage.setItem('cart', JSON.stringify(item))
}

export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || []
}

export const setFormData = (data) => {
  localStorage.setItem('formData',JSON.stringify(data))
}

export const getFormData = () => {
  return JSON.parse(localStorage.getItem('formData')) || []
}