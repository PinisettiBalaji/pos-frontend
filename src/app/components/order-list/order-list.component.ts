import { Component } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {

  orders = [
    { orderId: 'ORD001', customer: 'John Doe', total: 250 },
    { orderId: 'ORD002', customer: 'Jane Smith', total: 150 },
  ];

  displayedColumns: string[] = ['orderId', 'customer', 'total'];
}
