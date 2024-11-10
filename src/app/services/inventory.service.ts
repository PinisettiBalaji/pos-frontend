import { Injectable } from '@angular/core';
import { InventoryItem } from '../models/inventory-item.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventoryItems: InventoryItem[] = []; // In-memory inventory data
  private inventorySubject = new BehaviorSubject<InventoryItem[]>(this.inventoryItems);


  // inventoryItems$ = this.inventoryItems.asObservable();

  constructor() {
    this.inventoryItems = [
      { id: 1, name: 'Potatoes', price: 40, quantity: 100 },
      { id: 2, name: 'Tomatoes', price: 30, quantity: 120 },
      { id: 2, name: 'Onions', price: 50, quantity: 1120 },
    ];
    this.inventorySubject.next(this.inventoryItems);
  }

  getInventoryItems(): Observable<InventoryItem[]> {
    return this.inventorySubject.asObservable();
  }


  addItem(item: any) {
    const currentItems = this.inventorySubject.value;
    item.id = currentItems.length + 1; // Generate a new ID for the item
    this.inventorySubject.next([...currentItems, item]); // Add new item to the inventory
  }

  updateItem(updatedItem: any) {
    const currentItems = this.inventorySubject.value;
    const index = currentItems.findIndex(item => item.id === updatedItem.id);
    if (index > -1) {
      currentItems[index] = updatedItem; // Update the existing item
      this.inventorySubject.next([...currentItems]);
    }
  }

  deleteItem(itemId: number) {
    const currentItems = this.inventorySubject.value;
    this.inventorySubject.next(currentItems.filter(item => item.id !== itemId)); // Remove item by ID
  }

  updateInventory(orderItems: { id: number, quantity: number }[]) {
    orderItems.forEach((orderItem) => {
      const inventoryItem = this.inventoryItems.find((item) => item.id === orderItem.id);
      if (inventoryItem) {
        inventoryItem.quantity -= orderItem.quantity;
      }
    });
    this.inventorySubject.next(this.inventoryItems);
  }
}
