import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compara-servicii',
  templateUrl: './compara-servicii.component.html',
  styleUrls: ['./compara-servicii.component.css']
})
export class ComparaServiciiComponent implements OnInit {

  specializationsList: {} [] = [];
  servicesList: {nume:string, pret1: string, pret2:string, pret3:string} [] = [];

  ngOnInit(): void {
    this.getServices();
  }

  constructor(private firestore: AngularFirestore, private router: Router){}

  getServices() {
    this.firestore
      .collection('servicii')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const service: any = doc.data();
          this.servicesList.push({nume: service.nume, pret1: service.pret1, pret2:service.pret2, pret3: service.pret3});
        });
      });
  }

  OnAdultAppointment(){
    this.router.navigate(['/programari-adulti']);
  }

  OnChildAppointment(){
    this.router.navigate(['/programari-copii']);
  }
}
