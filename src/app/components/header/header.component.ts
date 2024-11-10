import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() sidenavToggle = new EventEmitter<void>();
  @Output() searchTerm = new EventEmitter<string>(); // O

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement; // Cast the event target to HTMLInputElement
    const searchValue = input.value; // Get the value from the input
    this.searchTerm.emit(searchValue); // Emit the search term to be used in the parent component
  }

}
