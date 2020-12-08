import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isUserLoggedIn = false;
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    // if (this.authService.currentUser && this.authService.currentUser.id){
    //   this.isUserLoggedIn = true;
    // }
    this.authService.getLoginStatus().subscribe(status => this.isUserLoggedIn = status);
  }

  goToDashboard(pageName: string): void {
    const fullPage = pageName + '/' + this.authService.currentUser.id;
    this.router.navigate([`${fullPage}`]);
    //this.router.navigate([`${pageName}`]);
  }


  public logoutUser(): void {
    this.authService.logout();
    this.isUserLoggedIn = false;
  }

}
