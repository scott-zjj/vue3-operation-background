// 判断是否为对象
export const isObj =(obj) =>{
	return Object.prototype.toString.call(obj) === '[object Object]'
}
// 判断是否为数组
export const isArr = (arr) => {
	return Object.prototype.toString.call(arr) === '[object Array]'
}
// 判断是否为字符串
export const isStr = (str) =>{
	return str + '' === str
}
// 判读值是否为空
export const isEmpty = (val) =>{
	if (!val) {
		return true
	}
	for (const key in val) {
		return false
	}
	return true
}
// 字符串首字符转为大写
export const firstToUpper = (str) =>{
	if (str.length) {
		return str.replace(str[0], str[0].toUpperCase())
	}
	return str
}
// 取数组的第一项,没有第一项返回result
export const getArrOne = (arr, result = '') =>{
	if (Object.prototype.toString.call(arr) === '[object Array]' && arr.length) {
		return arr[0]
	} else {
		return result
	}
}
//获取对象属性的值
export const getObjKeyVal = (obj, key) =>{
	if (Object.prototype.toString.call(obj) === '[object Object]') {
		return obj[key] || ''
	} else {
		return ''
	}
}
//时间处理
//使用方法utils.formatTime(date).yearMonth
export const formatTime = (type) => {
    const year = date.getFullYear() 
    const month = date.getMonth() + 1
    const nextMonth = date.getMonth() + 2 // 当前月份后一月
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const nextMinute = date.getMinutes() - 1 //下月分钟减1//当前月份 后一月（年月日 时分）需要使用
    const second = date.getSeconds()
    const lastD = new Date(year, month, 0).getDate()
    const times = {

        //以下根据需求可删减
        //年月
        yearMonth: `${ [year, month].map(formatNumber).join('-') }`,
        //年月日
        date:`${ [year, month, day].map(formatNumber).join('-') }`,
        //年月日时分秒
        datetime: `${ [year, month, day].map(formatNumber).join('-') } ${ [hour, minute, second].map(formatNumber).join(':') }`,

        //当前月份（年月日 时分）
        datetimeTwo: `${ [year, month, day].map(formatNumber).join('-') } ${ [hour, minute].map(formatNumber).join(':') }`,
        //当前月份 后一月（年月日 时分）
        nextdateTwo:`${ [year, nextMonth, day].map(formatNumber).join('-') } ${ [hour, nextMinute].map(formatNumber).join(':') }`,
       
        //每月最后一天
        lastDay:`${ [ year , month , lastD ].map(formatNumber).join('-') }`

    }
    return times
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
// 数字每千位加逗号，100000 => 100,000
export const numToKilo = (num) => {
	if (!/^(-?\d+)(\.\d+)?$/.test(num)) {
		return num
	}
	let result = '',
		counter = 0,
		integer = '',
		negative = ''
	num = (num || 0).toString().split('.')
	if (num[0][0] === '-') {
		integer = num[0].substring(1)
		negative = '-'
	} else {
		integer = num[0]
	}
	let decimal = num.length === 2 ? num[1] : ''
	for (let i = integer.length - 1; i >= 0; i--) {
		counter++
		result = integer.charAt(i) + result
		if (!(counter % 3) && i != 0) {
			result = ',' + result
		}
	}
	result = negative + result
	return decimal ? result + '.' + decimal : result
}
