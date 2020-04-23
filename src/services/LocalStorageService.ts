  
export interface LocalStorage {
  getItem: (key: string) => string
  setItem: <T>(key: string, value: T) => void
}
  
class LocalStorageService {
  localStorage: LocalStorage;

  constructor(localStorage: LocalStorage) {
    this.localStorage = localStorage;
  }
  
  get<T>(key: string): T {
    const item = this.localStorage.getItem(key);
  
    return JSON.parse(item);
  }
  
  set<T>(key: string, value: T): void {
    const serializedValue = JSON.stringify(value);
  
    this.localStorage.setItem(key, serializedValue);
  }
}
  
export { LocalStorageService };