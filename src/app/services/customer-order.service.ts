import { Injectable } from '@angular/core';
import { CustomerOrder } from '../models/customer-order.model';
import { BehaviorSubject } from 'rxjs';
import { InventoryService } from './inventory.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

  private customerOrders: CustomerOrder[] = [];
  private customerOrdersSubject = new BehaviorSubject<CustomerOrder[]>(this.customerOrders);

  constructor(private inventoryService: InventoryService) { }

  // Add a new order
  placeOrder(order: CustomerOrder) {
    this.customerOrders.push(order);
    this.customerOrdersSubject.next(this.customerOrders);
  }

  // Get all orders
  getOrders() {
    return this.customerOrdersSubject.asObservable();
  }

  // Get orders by customer
  getCustomerOrders(customerId: number) {
    return this.customerOrders.filter((order) => order.customerId === customerId);
  }

  // Get order by orderId
  getOrderById(orderId: number) {
    return this.customerOrders.find((order) => order.orderId === orderId);
  }

  // customer-order.service.ts (Add return logic)
  returnProduct(orderId: number, productId: number, quantity: number) {
    const order = this.getOrderById(orderId);
    if (order) {
      const product = order.orderedItems.find((item) => item.id === productId);
      if (product) {
        product.quantity -= quantity;  // Reduce quantity of the returned product

        // If the quantity becomes zero, we could either remove it from the order or leave it
        if (product.quantity === 0) {
          order.orderedItems = order.orderedItems.filter((item) => item.id !== productId);
        }

        // Update inventory after return
        this.inventoryService.updateInventory([{ id: productId, quantity }]);
      }
    }
  }

}
