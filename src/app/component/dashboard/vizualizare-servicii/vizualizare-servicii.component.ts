import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IPrice } from 'src/app/shared/interfaces/price.interface';

@Component({
  selector: 'app-vizualizare-servicii',
  templateUrl: './vizualizare-servicii.component.html',
  styleUrls: ['./vizualizare-servicii.component.css']
})
export class VizualizareServiciiComponent implements OnInit{

  ServicesList: {id: string, nume:string, id_specializare:string, preturi: IPrice[], descriere:string} [] = [];
  ServicesdisplayedColumns: string[] = ['Nr.crt', 'Nume', 'Descriere', 'Specializare', 'Clinici'];
  clinicsList: any[] =[];
  specializationsList:any[] =[];

  public ServicedataSource:any;
  public edit: boolean = false;
  public id:string;
  public panelOpenState = false;

  services: any[];

  ngOnInit(): void {
    this.getClinics();
    this.getSpecializations();
    this.getServices();
  }

  constructor(private firestore: AngularFirestore, private router: Router) {
  }

  getClinics(){
    this.firestore.collection('clinici').valueChanges().subscribe(clinics => {
      this.clinicsList = clinics;
    })
  }

  getSpecializations(){
    this.firestore.collection('specializari').valueChanges().subscribe(specializations => {
      this.specializationsList = specializations;
    })
  }


  getServices(){
    this.firestore.collection('serviciii').get().subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const service: any = doc.data();
            this.ServicesList.push({id: doc.id, nume: service.nume, id_specializare:service.id_specializare, preturi:service.preturi, descriere:service.descriere});
            this.ServicedataSource = new MatTableDataSource(this.ServicesList);          
        });
      });
  }

  DisplaySpecialization(specialization:any, specializationId: string){
    return specializationId === specialization.id_specializare;
  }

  DisplayClinic(clinic:any, clinicsId: any[]){
    return clinicsId.filter(value => value.id_clinica === clinic.id_clinica).length>0;
  }

  DisplayPrice(clinic:any, prices: any[]){      
    return prices.find(value => value.id_clinica === clinic.id_clinica).pret;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.ServicedataSource.filter = filterValue.trim();
  }

  Back(){
    this.router.navigate(['/dashboard']);
  }
}

