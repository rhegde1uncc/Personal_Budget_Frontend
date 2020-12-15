import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'pb-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss']
})
export class AddBudgetComponent implements OnInit {
  public categoryNames: any;
  id: number;
  addBudgetForm: FormGroup;
  tablerows: any;
  hasData = false;

  constructor(private router: Router, private route: ActivatedRoute,
              public fb: FormBuilder,
              public dataService: DataService,
              public authService: AuthService) {


    //this.route.params.subscribe( params => {this.id = params.id; });
    this.id = Number(this.route.parent.snapshot.paramMap.get( 'id' ));
    //this.id = authService.currentUser.id;

    this.addBudgetForm = this.fb.group({
      date: [''],
      categoryName: [''],
      value: [''],
      uid: this.id,
    });
   }

  ngOnInit(): void {
    this.getUserBudgetCategoryNames();
    this.getAllUserBudgetData();
  }

  // fetch  all budget category names for user
  private getUserBudgetCategoryNames(): void {
    this.dataService.getUserBudgetCategoryNames(this.id).subscribe((res: any) => {
        this.categoryNames = [];
        if (res.data){
          for (const element of res.data) {
            this.categoryNames.push(element.categoryName);
          }
        }
      });
  }

  // add new budget record for user
  public addBudgetToUser(): void {
    this.dataService.addBudgetToUser(this.addBudgetForm.value).subscribe((res: any) => {
      this.getAllUserBudgetData();
      this.addBudgetForm.reset();
    });

  }

  // get all budget records for user
  public getAllUserBudgetData(): void {
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


}
