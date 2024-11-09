import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  itemCount: number = 0;  // The total number of items in the cart


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Subscribe to the cart items and item count observable to update in real-time
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalAmount();
    });
    this.cartService.cartItemCount$.subscribe(count => {
      this.itemCount = count;
    });
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  checkout() {
    alert('Proceeding to checkout!');
    // this.cartService.clearCart();
  }
  calculateTotalItems(): void {
    this.cartService.cartItemCount$.subscribe(count => {
      this.itemCount = count;
    });
  }


  // Calculate total amount
  calculateTotalAmount() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

}