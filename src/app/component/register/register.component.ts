import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator, ValidateName } from 'src/app/shared/custom-validators.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  email : string = '';
  password : string= '';
  name : string = '';
  roleAs : string = 'customer';
  newUser: IUser | null = null;
  hide=true;

  registerForm: FormGroup= new FormGroup({
    name: new FormControl('', [Validators.required, ValidateName()]),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required, passwordMatchValidator()]),
    confirmPassword: new FormControl('', [Validators.required, passwordMatchValidator() ])
  })

  constructor(private auth: AuthService){}

  ngOnInit(): void {
  }

  register(){
    if(this.email == ''){
      alert('Please enter the email');
      return;
    }

    if(this.password == ''){
      alert('Please enter the password');
      return;
    }
    this.newUser = {
      name: this.name,
      roleAs: this.roleAs,
      email: this.email,
      password: this.password
    }
    this.auth.register(this.newUser);

    this.email='';
    this.password='';
    this.newUser = null;
  }
}
