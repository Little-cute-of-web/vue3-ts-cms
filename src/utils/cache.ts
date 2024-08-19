class localCache {
  setCache(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getCache(key: string) {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key) as string);
    } else {
      return null;
    }
  }
  deleteCache(key: string) {
    localStorage.removeItem(key);
  }
  clearCache() {
    localStorage.clear();
  }
}

export default new localCache();
