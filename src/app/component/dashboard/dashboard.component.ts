import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleMap } from '@angular/google-maps';
import { IMarkerProperties } from 'src/app/shared/interfaces/MarkerProperties.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public currentUserName: string = '';
  clinicsList: {nume: string, adresa: string, program: string, telefon: string} [] = [];

  @ViewChild('myGoogleMap', { static: true }) map!: GoogleMap;

  mapOptions: google.maps.MapOptions = {
    center: {lat: 46.7730109, lng: 23.6},
    zoom:13
  }

  markers: IMarkerProperties[] = [
    { position: { lat: 46.76075511653318, lng: 23.613973325591896}, name: 'DentaPro Clinic' }, // DentaPro Clinic= sirbu =AM
    { position: { lat: 46.76182936112267, lng: 23.564898467920205}, name: 'Stomestet'}, // Stomestet = manastur
    { position: { lat: 46.77244059175123, lng: 23.5930983612925 }, name: 'DentaLux Clinic'}, // DentaLux Clinic= alverna = centru
  ];

  constructor(private router: Router, private authService: AuthService, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if(user !== undefined)
        this.currentUserName = user.name;
    })

    this.getClinics();
  }

  OnProgramari(){
    this.router.navigate(['/programari-adulti']);
  }

  OnVizualizareDoctori(){
    this.router.navigate(['/vizualizare-doctori']);
  }

  OnIstoricProgramari(){
    this.router.navigate(['/istoric-programari']);
  }

  OnVizualizareServicii(){
    this.router.navigate(['/vizualizare-servicii']);
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
