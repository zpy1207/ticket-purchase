export default ({ app: { $axios, redirect } }, inject) => {
  $axios.defaults.baseURL = 'http://10.173.242.252:8765'
  $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
  $axios.defaults.timeout = 10000;
  $axios.onRequest(req => { })
  $axios.onResponse(res => {
    if (res.data.code === 2000) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  })
  $axios.onError(err => {
    return Promise.reject(err)
  })

  // 向nuxt注入一个内置的方法
  inject('axiosApi', (url, params, method) => {
    return new Promise((resolve, reject) => {
      $axios({
        method: method || "POST",
        url,
        data: params
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  })
}
