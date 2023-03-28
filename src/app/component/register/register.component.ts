import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  email : string = '';
  password : string= '';
  name : string = 'Ana';
  roleAs : string = 'customer';
  newUser: IUser | null = null;

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
    this.auth.register(this.email, this.password);
    this.email='';
    this.password='';


  }
}
