import { Injectable } from '@angular/core';
import { InventoryItem } from '../models/inventory-item.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventoryItems = new BehaviorSubject<InventoryItem[]>([
    { id: 1, name: 'Laptop', price: 1000, quantity: 10 },
    { id: 2, name: 'Smartphone', price: 500, quantity: 20 },
    { id: 3, name: 'Headphones', price: 150, quantity: 50 },
  ]);

  // inventoryItems$ = this.inventoryItems.asObservable();

  constructor() { }

  getInventoryItems(): Observable<InventoryItem[]> {
    return this.inventoryItems.asObservable();
  }


  addItem(item: any) {
    const currentItems = this.inventoryItems.value;
    item.id = currentItems.length + 1; // Generate a new ID for the item
    this.inventoryItems.next([...currentItems, item]); // Add new item to the inventory
  }

  updateItem(updatedItem: any) {
    const currentItems = this.inventoryItems.value;
    const index = currentItems.findIndex(item => item.id === updatedItem.id);
    if (index > -1) {
      currentItems[index] = updatedItem; // Update the existing item
      this.inventoryItems.next([...currentItems]);
    }
  }

  deleteItem(itemId: number) {
    const currentItems = this.inventoryItems.value;
    this.inventoryItems.next(currentItems.filter(item => item.id !== itemId)); // Remove item by ID
  }
}
