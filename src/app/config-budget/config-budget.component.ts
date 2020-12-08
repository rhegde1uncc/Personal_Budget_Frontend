import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pb-config-budget',
  templateUrl: './config-budget.component.html',
  styleUrls: ['./config-budget.component.scss'],
})
export class ConfigBudgetComponent implements OnInit {
  id: number;
  configBudgetForm: FormGroup;
  tablerows: any;
  hasData = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public dataService: DataService
  ) {
    // this.route.params.subscribe((params) => {
    //   this.id = params.id;
    // });
    this.id = Number(this.route.parent.snapshot.paramMap.get( 'id' ));
    this.configBudgetForm = this.fb.group({
      date: [''],
      categoryName: [''],
      value: [''],
      uid: this.id,
    });
  }

  ngOnInit(): void {
    this.getUserBudgetCategoryNames();
    this.getUserBudgetCategoryNames();
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  // Add new categoryName value to user budget
  public addUserBudgetCategoryNames(): void {
    this.dataService
      .addUserBudgetCategoryNames(this.configBudgetForm.value)
      .subscribe((res: any) => {
        this.getUserBudgetCategoryNames();
      });
  }

  // get all the categoryName values for user
  public getUserBudgetCategoryNames(): void {
    this.dataService
      .getUserBudgetCategoryNames(this.id)
      .subscribe((res: any) => {
        this.tablerows = [];
        for (const element of res.data) {
          this.tablerows.push(element.categoryName);
        }
        if ( this.tablerows.length > 0){
          this.hasData = true;
        }
      });
  }
}
