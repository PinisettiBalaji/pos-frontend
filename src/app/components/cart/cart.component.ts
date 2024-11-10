import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  itemCount: number = 0;

  // Observable to get cart items from the CartService
  cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;

  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    // Subscribe to cart items and calculate total price and item count
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalPrice();
      this.itemCount = this.cartItems.length;
    });
  }

  // Calculate the total price based on the cart items
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  // Update quantity of item in the cart (increase/decrease)
  updateQuantity(item: CartItem, action: 'increase' | 'decrease') {
    if (action === 'increase') {
      this.cartService.updateQuantity(item, 'increase');
    } else if (action === 'decrease' && item.quantity > 1) {
      this.cartService.updateQuantity(item, 'decrease');
    }
  }

  // Remove item from the cart
  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  // Proceed to checkout (you can implement the checkout functionality later)
  checkout() {
    alert('Proceeding to checkout!');
  }
}