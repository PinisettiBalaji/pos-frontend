import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSidenavOpened = true;  // Set to true if you want it open by default

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

}
