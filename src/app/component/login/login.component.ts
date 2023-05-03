import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email : string = '';
  password : string= '';
  hide=true;

  loginForm: FormGroup = new FormGroup ({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', Validators.required),
  })


//   passwordMatchValidator(form: FormGroup) {
//     return form.get('password').value === form.get('passwordConfirm').value ? null : {'mismatch': true};
//  }

  ngOnInit():void {
  }
  constructor(private auth: AuthService){}

 
  login(){
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password);
  }
}
