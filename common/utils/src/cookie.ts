import Cookies from 'js-cookie'

const prefix = 'yy-web'

// https://juejin.cn/post/7256393626682163237#heading-8
interface ICookieStorage<T> {
  key: string
  defaultValue: T
}

export class CookieStore<T> implements ICookieStorage<T> {
  key: string
  defaultValue: T

  constructor(key: string, defaultValue: T) {
    this.key = prefix + key
    this.defaultValue = defaultValue
  }

  /** 设置值 */
  setValue(value: T) {
    Cookies.set(this.key, JSON.stringify(value))
  }

  getValue(): T | null {
    const value = Cookies.get(this.key) || undefined
    if (value === undefined)
      return this.defaultValue
    return JSON.parse(value)
  }

  removeValue() {
    Cookies.remove(this.key)
  }
}
