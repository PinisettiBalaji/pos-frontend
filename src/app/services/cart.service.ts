import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cartItems = new BehaviorSubject<CartItem[]>([]);  // Observable that holds the cart items
  private cartItemCountSubject = new BehaviorSubject<number>(0);  // Observable for the cart item count

  // Observable to expose the cart item count
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  // Observable to expose the cart items
  cartItems$ = this.cartItems.asObservable();

  // Add item to the cart
  addToCart(item: CartItem) {
    const currentItems = this.cartItems.value;  // Get the current cart items
    const existingItem = currentItems.find(cartItem => cartItem.name === item.name);  // Find if the item already exists

    if (existingItem) {
      existingItem.quantity += item.quantity;  // Increment quantity if item exists
    } else {
      currentItems.push({ ...item, quantity: item.quantity });  // Add new item with quantity 1 if it doesn't exist
    }
    this.cartItems.next(currentItems);  // Update the cart with new items
    this.cartItemCountSubject.next(currentItems.length);  // Update the cart item count
  }

  // Remove item from the cart
  removeFromCart(item: CartItem) {
    let currentItems = this.cartItems.value;  // Get the current cart items
    currentItems = currentItems.filter(cartItem => cartItem !== item);  // Remove the item
    this.cartItems.next(currentItems);  // Update the cart with the new items
    this.cartItemCountSubject.next(currentItems.length);  // Update the cart item count
  }

  // Get the current item count
  getCartItemCount(): number {
    return this.cartItems.value.length;
  }
}
