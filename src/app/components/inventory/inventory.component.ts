import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryItem } from 'src/app/models/inventory-item.model';
import { InventoryService } from 'src/app/services/inventory.service';
import { AddItemDialogComponent } from '../../dialogBoxes/add-item-dialog/add-item-dialog.component';
import { DeleteItemDialogComponent } from 'src/app/dialogBoxes/delete-item-dialog/delete-item-dialog.component';
import { EditItemDialogComponent } from 'src/app/dialogBoxes/edit-item-dialog/edit-item-dialog.component';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'totalValue', 'edit', 'delete'];
  // inventoryItems$!: Observable<InventoryItem[]>;
  dataSource: MatTableDataSource<InventoryItem> = new MatTableDataSource<InventoryItem>(); // Initialize with empty data source


  constructor(private dialog: MatDialog, private inventoryService: InventoryService) { }
  ngOnInit() {
    // Initialize the observable from the service
    this.inventoryService.getInventoryItems().subscribe(items => {
      // Update the dataSource when items are fetched from the service
      this.dataSource.data = items;
    });
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventoryService.addItem(result); // Add the new item to the inventory
        this.refreshDataSource();
      }
    });
  }

  openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      width: '400px',
      data: { ...item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventoryService.updateItem(result); // Update the item in the inventory
        this.refreshDataSource();
      }
    });
  }

  openDeleteDialog(item: any): void {
    const dialogRef = this.dialog.open(DeleteItemDialogComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventoryService.deleteItem(item.id); // Delete the item from the inventory
        this.refreshDataSource();
      }
    });
  }

  // Method to refresh the dataSource by reloading items from the service
  private refreshDataSource() {
    this.inventoryService.getInventoryItems().subscribe(items => {
      this.dataSource.data = items; // Reassign the updated list to dataSource
    });
  }
}
