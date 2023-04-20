import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  email :string ='';
  constructor(private auth: AuthService, private router: Router){}

  forgotpasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  ngOnInit(): void {
    
  }
  forgotPassword(){
    this.auth.forgotPassword(this.email);
    this.email='';
  }

  back() {
    this.router.navigate(['/login']);
  }
}
