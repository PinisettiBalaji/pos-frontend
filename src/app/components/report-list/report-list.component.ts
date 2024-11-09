import { Component } from '@angular/core';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent {
  reports = [
    { reportId: 'R001', totalSales: 1000 },
    { reportId: 'R002', totalSales: 2000 },
  ];

  displayedColumns: string[] = ['reportId', 'totalSales'];

}
