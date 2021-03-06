import request, {baseURL } from './request.js'
import axios from 'axios'

export const login = params => axios.post(`${baseURL}/person/login`, params)
export const domainList = () => request.get('/domain/domainSuffixList')
export const domainPrice = () => request.get('/domain/domainSuffixFee')
export const domainQuery = (params) => request.post('/domain/domainListByName', params)
export const personaMessage = () => request.get('/person/personMessage')
export const changePersonaMessage = (params) => request.post('/person/updatePerson', params)
export const queryByWhois = (param) => request.get(`/domain/findWhoisByDomainName?domainName=${param}`)
export const addShop = (params) => request.post('/order/insertShoppingCart', params)
export const deleteShop = (params) => request.post('/order/deleteShoppingCart', params)
export const getShop = () => request.get('/order/getShoppingCart')
export const getMyDomain = (params) => request.post('/domain/domainListByPersonId', params)
export const getDomainMessage = (params) => request.post('/domain/domainMessage', params)
export const getOperateMessage = (params) => request.post('/domain/opLogList', params)
export const getOrderMessage = (parmas) => request.post('/order/orderList', parmas)
export const editorDomainMessage = (parmas) => request.post('/domain/updateDomainMessage', parmas)
export const orderDetail = (parmas) => request.post('/order/orderMessage', parmas)
export const getOrderPrice = (parmas) => request.post('/order/orderPrice', parmas)
export const submitOrder = (parmas) => request.post('/order/orderPurchase', parmas)
