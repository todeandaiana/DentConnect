import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router, private authService: AuthService) {} 

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if(user === undefined) {
        this.isAuthenticated$.next(false);
      } else {
        this.isAuthenticated$.next(true);
      }
    })
  }

  onLogin(){
    this.router.navigate(['/login']);
  }

  onRegister(){
    this.router.navigate(['/register']);
  }

  onLogout() {
    this.authService.logout();
  }
}
