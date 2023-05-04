import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  public currentAdminName:string;

  constructor(private router: Router, private authService: AuthService){}
  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user=> {
      if(user !== undefined)
      this.currentAdminName=user.name;
    })
  }

  OnShowClinics(){
    this.router.navigate(['/show-clinici']);

  }

  OnShowSpecializations(){
    this.router.navigate(['/show-specializari']);

  }

  OnShowServices(){
    this.router.navigate(['/show-servicii']);
  }

  OnShowDoctors(){
    this.router.navigate(['/show-doctors']);

  }

  OnShowUsers(){
    this.router.navigate(['/show-users']);
  }

  OnShowAdultAppointments(){
    this.router.navigate(['/show-programari']);
  }

  OnShowChildAppointment(){
    this.router.navigate(['/show-programari-copii']);
  }
  
 
}
