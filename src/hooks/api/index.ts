import axios from 'axios'
import Cookie from 'universal-cookie'

const cookie = new Cookie()
const options = { path: '/' }

// 未ログイン時
export const gestApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
  headers: {
    'Content-type': 'application/json'
  }
})

// ログイン時
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
  headers: {
    'Content-type': 'application/json'
  }
})

// リフレッシュトークン使用時
export const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
  headers: {
    'Content-type': 'application/json'
  }
})

// tokenの設定
api.interceptors.request.use(async (config) => {
  const accessToken = await cookie.get('access_token')
  // @ts-ignore
  config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

// refresh_tokenの設定
refreshApi.interceptors.request.use(async (config) => {
  const refreshToken = await cookie.get('refresh_token')
  // @ts-ignore
  config.headers.Authorization = `Bearer ${refreshToken}`
  return config
})

// // tokenの設定
api.interceptors.response.use(
  async (res) => {
    return res
  },
  async (err) => {
    if (err.response.status === 401) {
      await refreshApi
        .post('auth/refresh')
        .then((res) => {
          const newAccessToken = res.data.token.access_token
          cookie.set('access_token', newAccessToken, options)
          axios
            .request({
              ...err.config,
              headers: {
                Authorization: `Bearer ${newAccessToken}`
              }
            })
            .then((reRes) => {
              return reRes
            })
        })
        .catch(() => {
          console.error('failed refresh token')
          window.location.href = '/error'
        })
    }
    // if (err.response.status === 429) {
    //   window.location.href = "/error";
    // }
    // if (err.response.status === 500) {
    //   window.location.href = "/error";
    // }
    return Promise.reject(err.response)
  }
)
