import { Injectable } from '@angular/core';
import { StorageType } from 'src/app/types/types';
import { IItemDB } from '../../interfaces/items';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private mainStorage: IItemDB[] = [];
  private ownerStorage: IItemDB[] = [];
  private bookmarkStorage: IItemDB[] = [];
  private anyStorage: IItemDB[] = [];
  public item: IItemDB;
 
  private storageType: StorageType;

  constructor() { }

  saveItem(data: IItemDB) {
    this.getStorage('owner-storage').push(data)
  }

  getType(): StorageType {
    return this.storageType
  };

  checkStorage(storageType: StorageType): boolean {
    return this.getStorage(storageType).length != 0 ? true : false
  };

  setOne(data: IItemDB) {
    this.item = data
  };

  setToStorage(data: IItemDB[], storageType: StorageType): void {
    switch(storageType) {
      case 'main-storage':
        this.mainStorage = data;
        break;
      case 'bookmark-storage':
        this.bookmarkStorage = data;
        break;
      case 'owner-storage':
        this.ownerStorage = data;
        break;
      case 'any-storage':
        this.anyStorage = data;
        break;
    }
  };

  getStorage(storageType: StorageType) {
    switch(storageType) {
      case 'main-storage':
        return this.mainStorage;
      case 'bookmark-storage':
        return this.bookmarkStorage;
      case 'owner-storage':
        return this.ownerStorage;
      case 'any-storage':
        return this.anyStorage
    };
  };

  deleteOne(id: string, storageType: StorageType) {
    this.getStorage(storageType).filter(item => item._id != id)
  };

  deleteMany(data: {id: string, collection: string}[], storageType: StorageType) {
    data.forEach(obj => {
      this.getStorage(storageType).filter(item => item._id != obj.id)
    })
  };

  updateAccessMany(data: {id: string, collection: string, show: boolean}[]) {
    data.forEach(obj => {
      this.ownerStorage.forEach(item => {
        if(item._id === obj.id) {
          item.show = obj.show
        }
      })
    })
  };

  deleteIdFromStorage(id: string[], storageType: StorageType){
    id.forEach(id => this.getStorage(storageType).filter(item => item._id !== id))
  };

  switchShowHide(id: string[], boolean: boolean) {
    id.forEach(id => this.ownerStorage.forEach(item => {
      if(item._id == id) {
        item.show = boolean
      }
    }))
  };

}
