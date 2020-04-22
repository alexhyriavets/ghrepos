  
export interface LocalStorage {
  getItem: (key: string) => string
  setItem: <T>(key: string, value: T) => void
}
  
class LocalStorageService {
  localStorage: LocalStorage;

  constructor(localStorage: LocalStorage) {
    this.localStorage = localStorage;
  }
  
  async get(key: string): Promise<unknown> {
    const item = this.localStorage.getItem(key);
  
    return JSON.parse(item);
  }
  
  async set<T>(key: string, value: T): Promise<void> {
    const serializedValue = JSON.stringify(value);
  
    this.localStorage.setItem(key, serializedValue);
  }
}
  
export { LocalStorageService };