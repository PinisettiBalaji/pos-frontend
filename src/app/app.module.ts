import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
//components
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { MatTableModule } from '@angular/material/table';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { InventoryComponent } from './components/inventory/inventory.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddItemDialogComponent } from './dialogBoxes/add-item-dialog/add-item-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditItemDialogComponent } from './dialogBoxes/edit-item-dialog/edit-item-dialog.component';
import { DeleteItemDialogComponent } from './dialogBoxes/delete-item-dialog/delete-item-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainLayoutComponent,
    ProductListComponent,
    CustomerListComponent,
    ReportListComponent,
    OrderListComponent,
    CartComponent,
    InventoryComponent,
    AddItemDialogComponent,
    EditItemDialogComponent,
    DeleteItemDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'INR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
