class StorageService {
  constructor() {}
  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  remvoeItem(key: string): void {
    window.localStorage.removeItem(key);
  }
}

const storageServiceInstance = new StorageService();

export default storageServiceInstance;
