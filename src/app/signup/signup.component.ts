import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor( public fb: FormBuilder, public authService: AuthService, public router: Router) {
    this.signUpForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
    });
   }

  ngOnInit(): void {
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  public signUpUser(): void {
    this.authService.signUp(this.signUpForm.value);
  }

}

