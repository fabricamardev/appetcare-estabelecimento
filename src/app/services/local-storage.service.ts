import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  set(key, value) {
    window.localStorage[key] = value;
  }

  get(key, defaultValue = null) {
    return window.localStorage[key] || defaultValue;
  }

  setObject(key, value) {
    window.localStorage[key] = JSON.stringify(value);
  }

  getObject(key, defaultValue = null) {
     return JSON.parse(window.localStorage.getItem(key));
  }

  remove(key) {
    window.localStorage.removeItem(key);
  }

}
