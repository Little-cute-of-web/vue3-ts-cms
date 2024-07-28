class localCache {
  setCache(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getCache(key: string) {
    return JSON.parse(localStorage.getItem(key) as string);
  }
  deleteCache(key: string) {
    localStorage.removeItem(key);
  }
  clearCache() {
    localStorage.clear();
  }
}

export default new localCache();
