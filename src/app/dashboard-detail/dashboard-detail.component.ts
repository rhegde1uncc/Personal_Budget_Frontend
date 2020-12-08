import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'pb-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss']
})
export class DashboardDetailComponent implements OnInit {

  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#8d6b19',
          '#cc65fe',
          '#aaae11',
          '#ff3618',
        ],
      },
    ],
    labels: [],
  };

  public dataSource2 = {
    datasets: [
      {
        label: ['Income'],
        data: [],
        barPercentage: 0.5,
        barThickness: 50,
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
      },
      {
        label: ['Spending'],
        backgroundColor: [
          '#36a2eb',
      ],
      }
    ],
    labels: ['Income', 'Spending'],
  };

  options2 = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

  public dataSource3 = {
    datasets: [
      {
        data: [],
        borderColor: '#00AEFF',
        fill: false
      },
    ],
    labels: [],
  };

  options3 = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true
      }],
      yAxes: [{
        display: true
      }],
    }
  };
  id: number;
  tablerows: any;
  hasData = false;
  hasDataforChart1 = false;
  hasDataforChart2 = false;
  hasDataforChart3 = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public dataService: DataService,
              public authService: AuthService) {

      this.route.params.subscribe( params => {this.id = params.id; });
      if (!Number.isFinite(this.id)){
        this.id = authService.currentUser.id;
      }
      //this.id = authService.currentUser.id;
    }

  ngOnInit(): void {
  this.getChart1Data();
  this.getChart2Data();
  this.getChart3Data();
  this.getAllUserBudgetData();
  }

  // get all budget records for user
  private getAllUserBudgetData(): void {
    this.dataService.getAllUserBudgetData(this.id).subscribe((res: any) => {
      this.tablerows = [];
      for (const element of res.data) {
        element.date = this.parseDate(element.date);
        this.tablerows.push(element);
        }
      if ( this.tablerows.length > 0){
          this.hasData = true;
        }
    });
  }
private parseDate(date): any {
  const newDate = new Date(date);

  return (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
}


  private getChart1Data(): void {
    this.dataService.getChart1Data(this.id).subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
            this.dataSource.datasets[0].data[i] = res.data[i].total;
            this.dataSource.labels[i] = res.data[i].category;
          }
      this.hasDataforChart1 = true;
      this.createDonutChart();
    });
  }

  private getChart2Data(): void {
    this.dataService.getChart2Data(this.id).subscribe((res: any) => {
      if (res.data.length > 0){
            this.dataSource2.datasets[0].data.push(res.data[0].totalIncome);
            this.dataSource2.datasets[0].data.push(res.data[0].totalExpense);
          }
      this.hasDataforChart2 = true;
      this.createBarChart();
    });
  }

  private getChart3Data(): void {
    this.dataService.getChart3Data(this.id).subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
            this.dataSource3.datasets[0].data[i] = res.data[i].total;
            this.dataSource3.labels[i] = res.data[i].month;
          }
      this.hasDataforChart3 = true;
      this.createLineChart();
    });
  }

  private createDonutChart(): void {
    const ctx = document.getElementById('donutChart');
    const myPieChart = new Chart(ctx, {
      type: 'doughnut',
      data: this.dataSource,
    });
  }

  private createBarChart(): void {
    const ctx = document.getElementById('barChart');
    const myBarChart = new Chart(ctx, {
      type: 'bar',
      data: this.dataSource2,
      options: this.options2,
    });
  }

  private createLineChart(): void {
    const ctx = document.getElementById('lineChart');
    const myLineChart = new Chart(ctx, {
      type: 'line',
      data: this.dataSource3,
      options: this.options3,
    });
  }

}
