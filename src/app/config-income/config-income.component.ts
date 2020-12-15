import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'pb-config-income',
  templateUrl: './config-income.component.html',
  styleUrls: ['./config-income.component.scss'],
})
export class ConfigIncomeComponent implements OnInit {
  id: number;
  addIncomeForm: FormGroup;
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
    this.addIncomeForm = this.fb.group({
      monthlyIncome: [''],
      uid: this.id,
    });
  }

  ngOnInit(): void {
    this.getIncome();
  }

  // add new income record for user
  public addMonthlyIncomeToUser(): void {
    this.dataService.addIncome(this.addIncomeForm.value).subscribe((res: any) => {
      this.getIncome();
      this.addIncomeForm.reset();
    });

  }

  // get all budget records for user
  public getIncome(): void {
    this.dataService.getIncome(this.id).subscribe((res: any) => {
      this.tablerows = [];
      for (const element of res.data) {
          this.tablerows.push(element.monthlyIncome);
        }
      if ( this.tablerows.length > 0){
          this.hasData = true;
        }
    });

  }
}
