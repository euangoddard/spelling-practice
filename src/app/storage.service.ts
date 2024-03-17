import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly isAvailable =
    'localStorage' in globalThis && globalThis['localStorage'] !== null;

  get<T>(key: string): T | null {
    let value: T | null = null;
    if (this.isAvailable) {
      const itemRaw = localStorage.getItem(key);
      if (itemRaw) {
        value = JSON.parse(itemRaw) as T;
      }
    }
    return value;
  }

  set<T>(key: string, value: T): void {
    if (this.isAvailable) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}
