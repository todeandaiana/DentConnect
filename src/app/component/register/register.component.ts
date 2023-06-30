import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateName, ValidatePassword } from 'src/app/shared/custom-validators.directive';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    passwordConfirm: new FormControl('', [Validators.required, ValidatePassword()]),
  }, this.passwordMatchValidator)

  passwordMatchValidator(form: FormGroup) {
     return form.get('password').value === form.get('passwordConfirm').value ? null : {'mismatch': true};
  }

  constructor(private auth: AuthService){}

  ngOnInit(): void {
  }

  register(){
    this.newUser = {
      name: this.registerForm.value.name,
      roleAs: this.roleAs,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    }
    this.auth.register(this.newUser);
    this.newUser = null;
  }
}

