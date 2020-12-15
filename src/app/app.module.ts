import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './card/card.component';
import { P404Component } from './p404/p404.component';
import { ConfigBudgetComponent } from './config-budget/config-budget.component';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ConfigIncomeComponent } from './config-income/config-income.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    AboutComponent,
    ContactComponent,
    HomepageComponent,
    FooterComponent,
    HeroComponent,
    DashboardComponent,
    CardComponent,
    P404Component,
    ConfigBudgetComponent,
    AddBudgetComponent,
    SignupComponent,
    BreadcrumbComponent,
    ConfigIncomeComponent,
    DashboardDetailComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
