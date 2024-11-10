import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { CartComponent } from './components/cart/cart.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SalesReportComponent } from './components/sales-report/sales-report.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'reports', component: ReportListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'sales-report', component: SalesReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
