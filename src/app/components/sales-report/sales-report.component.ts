import { Component, OnInit } from '@angular/core';
import { CustomerOrder } from 'src/app/models/customer-order.model';
import { SalesReportService } from 'src/app/services/sales-report.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {
  dailyReport: CustomerOrder[] = [];
  monthlyReport: CustomerOrder[] = [];
  yearlyReport: CustomerOrder[] = [];

  constructor(private salesReportService: SalesReportService) { }

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    const today = new Date();

    // Load Daily, Monthly, and Yearly reports
    this.salesReportService.generateDailyReport(today).subscribe((orders) => {
      this.dailyReport = orders;
    });

    this.salesReportService.generateMonthlyReport(today.getMonth(), today.getFullYear()).subscribe((orders) => {
      this.monthlyReport = orders;
    });

    this.salesReportService.generateYearlyReport(today.getFullYear()).subscribe((orders) => {
      this.yearlyReport = orders;
    });
  }
}
