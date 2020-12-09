import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'pb-about',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
  }

  goToPage(pageName: string): void {
    this.router.navigate([`.${pageName}`], { relativeTo: this.route });
  }

}
