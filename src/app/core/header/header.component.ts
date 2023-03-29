import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public isAuthenticated = true;

  constructor(private router: Router) {} 

  onLogin(){
    this.router.navigate(['/login']);
  }

  onRegister(){
    this.router.navigate(['/register']);
  }

  onLogout() {
    this.router.navigate(['/home']);
  }
}
