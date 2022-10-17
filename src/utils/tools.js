/**
 * 防抖
 * @param fn 需要防抖的函数
 * @param t 时间
 */
 const debounce = (fn, delay = 500) => {
    // timer 是闭包中的
    let timer = null
  
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
  }
  /**
 * 节流
 * @param fn 需要节流的函数
 * @param delay 时间
 */
const throttle = (fn, delay = 400) => {
    let timer = null
    return function () {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
  }

  export {
    debounce,
    throttle
  }