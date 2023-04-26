import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ValidateName } from 'src/app/shared/custom-validators.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  roleAs : string = 'customer';
  newUser: IUser | null = null;
  hide=true;

  registerForm: FormGroup= new FormGroup({
    name: new FormControl('', [Validators.required, ValidateName()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    // confirmPassword: new FormControl('', [Validators.required])
  })

  
  constructor(private auth: AuthService){

  }

  ngOnInit(): void {
  }

  register(){

    this.newUser = {
      name: this.registerForm.value.name,
      roleAs: this.roleAs,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }
    this.auth.register(this.newUser);

    // this.email='';
    // this.password='';
    this.newUser = null;
  }
}
