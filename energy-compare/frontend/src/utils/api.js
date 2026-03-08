import axios from 'axios'
const api = axios.create({ baseURL: '/api', timeout: 15000 })
export const fetchSources    = (params) => api.get('/sources', { params })
export const fetchSource     = (id)     => api.get(`/sources/${id}`)
export const fetchRankingLCOE= ()       => api.get('/ranking/lcoe')
export const fetchRankingCO2 = ()       => api.get('/ranking/co2')
export const fetchStats      = ()       => api.get('/stats')
export const fetchCategories = ()       => api.get('/categories')
export const healthCheck     = ()       => api.get('/health')
export default api
