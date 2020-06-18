import api from 'axios'
const service = api.create({})
service.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token') !== null) {
      config.headers.Authorization = sessionStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  res => {
    if (res.data.code === 2002){
      window.location.href = res.request.responseURL.substr(0,res.request.responseURL.indexOf('/sys') + 1)
      sessionStorage.removeItem('token')
    }
    return res
  },
  res => {
    return Promise.reject(res)
  }
)
export default service
