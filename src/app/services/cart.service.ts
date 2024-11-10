import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  private cartItems = new BehaviorSubject<CartItem[]>([]); // Observable holding the cart items
  private cartItemCountSubject = new BehaviorSubject<number>(0); // Observable for cart item count

  // Observable for cart items
  cartItems$ = this.cartItems.asObservable();

  // Observable for cart item count
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  // Get current cart item count
  getCartItemCount(): number {
    return this.cartItems.value.length;
  }

  // Add item to cart
  addToCart(item: CartItem) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      existingItem.quantity += item.quantity; // If item exists, update quantity
    } else {
      currentItems.push({ ...item, quantity: item.quantity }); // Otherwise, add the item
    }

    this.cartItems.next(currentItems); // Update the cart
    this.cartItemCountSubject.next(currentItems.length); // Update the item count
  }

  // Remove item from cart
  removeFromCart(item: CartItem) {
    let currentItems = this.cartItems.value;
    currentItems = currentItems.filter((cartItem) => cartItem !== item);
    this.cartItems.next(currentItems); // Update cart
    this.cartItemCountSubject.next(currentItems.length); // Update count
  }

  // Update quantity of item in the cart
  updateQuantity(item: CartItem, action: 'increase' | 'decrease') {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      if (action === 'increase') {
        existingItem.quantity++;
      } else if (action === 'decrease' && existingItem.quantity > 1) {
        existingItem.quantity--;
      }
    }

    this.cartItems.next(currentItems); // Update cart with new quantity
  }
}
