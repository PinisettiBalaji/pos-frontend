import { Injectable } from '@angular/core';
import { CustomerOrder } from '../models/customer-order.model';
import { CustomerOrderService } from './customer-order.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesReportService {

  constructor(private customerOrderService: CustomerOrderService) { }

  // Generate daily sales report
  generateDailyReport(date: Date): Observable<CustomerOrder[]> {
    const startDate = new Date(date.setHours(0, 0, 0, 0));
    const endDate = new Date(date.setHours(23, 59, 59, 999));

    return new Observable<CustomerOrder[]>((observer) => {
      this.customerOrderService.getOrders().subscribe((orders) => {
        const dailyOrders = orders.filter((order) => {
          return order.orderDate >= startDate && order.orderDate <= endDate;
        });
        observer.next(dailyOrders);
        observer.complete();
      });
    });
  }

  // Generate monthly sales report
  generateMonthlyReport(month: number, year: number): Observable<CustomerOrder[]> {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59);

    return new Observable<CustomerOrder[]>((observer) => {
      this.customerOrderService.getOrders().subscribe((orders) => {
        const monthlyOrders = orders.filter((order) => {
          return order.orderDate >= startDate && order.orderDate <= endDate;
        });
        observer.next(monthlyOrders);
        observer.complete();
      });
    });
  }

  // Generate yearly sales report
  generateYearlyReport(year: number): Observable<CustomerOrder[]> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 0, 23, 59, 59);

    return new Observable<CustomerOrder[]>((observer) => {
      this.customerOrderService.getOrders().subscribe((orders) => {
        const yearlyOrders = orders.filter((order) => {
          return order.orderDate >= startDate && order.orderDate <= endDate;
        });
        observer.next(yearlyOrders);
        observer.complete();
      });
    });
  }
}
