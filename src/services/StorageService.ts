  
export interface Storage {
  getItem: (key: string) => string
  setItem: <T>(key: string, value: T) => void
}
  
class StorageService {
  storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }
  
  get<T>(key: string): T {
    const item = this.storage.getItem(key);
  
    return JSON.parse(item);
  }
  
  set<T>(key: string, value: T): void {
    const serializedValue = JSON.stringify(value);
  
    this.storage.setItem(key, serializedValue);
  }
}

const LocalStorageService = new StorageService(window.localStorage as Storage);
  
export { LocalStorageService };