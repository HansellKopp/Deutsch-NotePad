const s = {
  get (k) {
    try {
      return JSON.parse(window.localStorage.getItem(k))
    } catch (e) {
      return null
    }
  },
  set (k, v) {
    window.localStorage.setItem(k, JSON.stringify(v))
  }
}

export default s
