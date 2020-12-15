import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Budget } from './budget';
import { Income } from './income';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  endpoint = '/api'  // url for deployment on apps platform
  //endpoint = 'http://localhost:3000/api'; // for local
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
              public router: Router) {

     }
// Services for add-budget-component

     // add budget details for user
     public addBudgetToUser(budget: Budget): Observable<any> {
      const api = `${this.endpoint}/budget/add`;
      return this.http.post(api, budget);
    }

    // get all budget records for user
    public getAllUserBudgetData(id: number): Observable<any> {
      const api = `${this.endpoint}/budget/all/${id}`;
      return this.http.get(api);
    }
    // get budget category
    public getUserBudgetCategoryNames(id: number): Observable<any> {
      const api = `${this.endpoint}/budget/category/${id}`;
      return this.http.get(api);
    }

// Services for add-income-component

    // add income details for user
    public addIncome(income: Income): Observable<any> {
      const api = `${this.endpoint}/income/add`;
      return this.http.post(api, income);
    }
     // fetch income details for user
     public getIncome(id: number): Observable<any> {
      const api = `${this.endpoint}/income/${id}`;
      return this.http.get(api);
    }

// Services for dashboard-component
    //  get data for chart1
    public getChart1Data(id: number): Observable<any> {
      const api = `${this.endpoint}/budget/dashboard/chart1/${id}`;
      return this.http.get(api);
    }

     //  get data for chart2
     public getChart2Data(id: number): Observable<any> {
      const api = `${this.endpoint}/budget/dashboard/chart2/${id}`;
      return this.http.get(api);
    }

     //  get data for chart3
     public getChart3Data(id: number): Observable<any> {
      const api = `${this.endpoint}/budget/dashboard/chart3/${id}`;
      return this.http.get(api);
    }

// Services for config-budget-component

 // add budget category
 public addUserBudgetCategoryNames(budget: Budget): Observable<any> {
  const api = `${this.endpoint}/budget/config`;
  return this.http.post(api, budget);
}

}
