import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  constructor(private cartService: CartService) { }
  @ViewChild('cartDrawer') cartDrawer!: MatDrawer;
  @Input() searchTerm: string = ''; // Receive search term from parent component

  products = [
    { id: 1, name: 'Product 1', price: 100, quantity: 1, imageUrl: 'assets/product1.jpg' },
    { id: 2, name: 'Product 2', price: 200, quantity: 1, imageUrl: 'assets/product2.jpg' },
    { id: 3, name: 'Product 3', price: 150, quantity: 1, imageUrl: 'assets/product3.jpg' },
  ];

  filteredProducts = [...this.products];

  ngOnInit() {
    this.filteredProducts = this.products; // Initialize with all products
  }
  
  ngOnChanges() {
    this.filterProducts();
  }

  filterProducts() {
    if (this.searchTerm) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.products]; // If no search term, show all products
    }
  }

  addToCart(product: any) {
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      imageUrl: product.imageUrl
    };
    this.cartService.addToCart(item);
    this.cartDrawer.open();
  }

  increaseQuantity(product: any) {
    product.quantity++;
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }
}


