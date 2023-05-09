import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IPrice } from 'src/app/shared/interfaces/price.interface';

@Component({
  selector: 'app-show-servicii',
  templateUrl: './show-servicii.component.html',
  styleUrls: ['./show-servicii.component.css']
})
export class ShowServiciiComponent implements OnInit{
  ServicesList: {id: string, nume:string, id_specializare:string, preturi: IPrice[]} [] = [];
  ServicesdisplayedColumns: string[] = ['Nr.crt', 'Nume', 'Specializare', 'Clinici', 'Editează', 'Șterge'];
  clinicsList: any[] =[];
  specializationsList:any[] =[];

  public ServicedataSource:any;
  public edit: boolean = false;
  public id:string;

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
    this.firestore
      .collection('serviciii')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const service: any = doc.data();
            this.ServicesList.push({id: doc.id, nume: service.nume, id_specializare:service.id_specializare, preturi:service.preturi});
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

  AddService(){
    this.router.navigate(['/add-servicii']);
  }

  EditService(service:any){
    this.router.navigate(['/edit-servicii'], {state: {id:service.id}});
  }

  DeleteService(service: any) : void {
    this.firestore.collection('serviciii').doc(service.id).delete();
  }

  Back(){
    this.router.navigate(['/admin-dashboard']);
  }
}

