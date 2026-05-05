class StorageService {
  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }
}

const storageServiceInstance = new StorageService();

export default storageServiceInstance;
