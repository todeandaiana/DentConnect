import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  ngOnInit():void {
  }
  constructor(private auth: AuthService, private router:Router){}

 
   login(){
     this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
      // setTimeout( () =>{
      //   const role = localStorage.getItem("role");
      // console.log(role);
      // if(role === 'customer'){
      //   this.router.navigate(["/dashboard"]);
      // }else {
      //   if(role === 'admin'){
      //     this.router.navigate(["/admin-dashboard"]);
      //   }
      //   else {
      //     this.router.navigate(["/"]);
      //   }
      // }
      // }, 1000);
  }
}
