import { Injectable } from '@angular/core';
import {Client} from "./interface/client";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Сохранение данных в localStorage
  setItem(key: string, value: Client): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Получение данных из localStorage
  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // Чтение всего содержимого localStorage
  getAllItems(): { [key: string]: any } {
    const items: { [key: string]: any } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        items[key] = this.getItem(key);
      }
    }
    return items;
  }

  // Удаление данных из localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Обновление данных в localStorage
  updateItem(key: string, updatedValue: Client): void {
    const existingValue = this.getItem(key);
    if (existingValue) {
      const newValue = { ...existingValue, ...updatedValue };
      this.setItem(key, newValue);
    }
    else {
      console.warn(`No existing item found for key: ${key}`);
    }
  }

  // Очистка localStorage
  clear(): void {
    localStorage.clear();
  }
}
