import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public currentUserName: string = '';
  clinicsList: {nume: string, adresa: string, program: string, telefon: string} [] = [];
  constructor(private router: Router, private authService: AuthService, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if(user !== undefined)
        this.currentUserName = user.name;
    })

    this.getClinics();
  }

  OnAdultAppointment(){
    this.router.navigate(['/programari-adulti']);
  }

  OnChildAppointment(){
    this.router.navigate(['/programari-copii']);
  }

  OnHistoryAppointment(){
    this.router.navigate(['/istoric-programari']);
  }

  OnCompareServices(){
    this.router.navigate(['/compara-servicii']);
  }


    getClinics() {
      this.firestore
        .collection('clinici')
        .get()
        .subscribe((snapshot) => {
          snapshot.forEach((doc) => {
            const clinic: any = doc.data();
            this.clinicsList.push({nume: clinic.nume, adresa: clinic.adresa, program:clinic.program, telefon: clinic.telefon});
          });
        });
    }
  }
