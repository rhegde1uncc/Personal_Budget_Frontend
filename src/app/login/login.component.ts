import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor( public fb: FormBuilder, public authService: AuthService, public router: Router) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
   }

  ngOnInit(): void {
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  public loginUser(): void {
    this.authService.signIn(this.loginForm.value);
  }

}
