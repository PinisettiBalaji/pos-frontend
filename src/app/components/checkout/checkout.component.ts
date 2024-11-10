import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{

  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  name: string = '';
  email: string = '';
  address: string = '';
  paymentMethod: string = 'Credit Card';

  constructor(
    private cartService: CartService,
    public dialogRef: MatDialogRef<CheckoutComponent> // Inject MatDialogRef
  ) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  submitOrder(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const orderDetails = {
      name: this.name,
      email: this.email,
      address: this.address,
      paymentMethod: this.paymentMethod,
      items: this.cartItems,
      totalAmount: this.totalAmount
    };
    console.log('Order submitted:', orderDetails);
    alert('Order placed successfully!');
    this.dialogRef.close(); // Close the dialog after submitting
  }

  closeDialog(): void {
    this.dialogRef.close(); // Manually close the dialog if needed
  }
  cancelOrder() {
    this.dialogRef.close(); // Close the dialog without placing order
  }
}
