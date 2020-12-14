import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigBudgetComponent } from './config-budget/config-budget.component';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { SignupComponent } from './signup/signup.component';
import { ConfigIncomeComponent } from './config-income/config-income.component';
import { AuthGuard } from './shared/auth.guard';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
    data: {
      breadcrumb: 'Home',
    },
  },
  {
    path: 'about',
    data: {
      breadcrumb: 'about',
    },
    component: AboutComponent,
  },
  {
    path: 'login',
    data: {
      breadcrumb: 'login',
    },
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      breadcrumb: 'signup',
    },
  },
  {
    path: 'contact',
    data: {
      breadcrumb: 'contact',
    },
    component: ContactComponent,
  },
  {
    path: 'dashboard/:id',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'dashboard',
    },
    children: [
      {
        path: '',
        component: DashboardDetailComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: 'charts',
        },
      },
      {
        path: 'config',
        component: ConfigBudgetComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: 'config',
        },
      },
      {
        path: 'add',
        component: AddBudgetComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: 'add',
        },
      },
      {
        path: 'income',
        component: ConfigIncomeComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: 'income',
        },
      },
    ],
  },
  {
    path: '**',
    component: P404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
