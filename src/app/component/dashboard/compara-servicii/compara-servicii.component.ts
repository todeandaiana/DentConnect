import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-compara-servicii',
  templateUrl: './compara-servicii.component.html',
  styleUrls: ['./compara-servicii.component.css']
})
export class ComparaServiciiComponent implements OnInit{

  servicesList: {id:string, specializare:string, nume:string, pret1: string, pret2:string, pret3:string} [] = [];
  public dataSource:any;

  displayedColumns: string[] = ['Nr.crt', 'Specializare', 'Serviciu', 'DentaPro Clinic', 'Stomestet', 'DentaLux Clinic'];

  ngOnInit(): void {
  }

  constructor(private firestore: AngularFirestore, private router: Router){
    this.getServices();

  }

  getServices() {
    this.firestore
      .collection('servicii')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const service: any = doc.data();

          this.firestore.collection('specializari').doc(service.id_specializari).get().subscribe((specializationDoc) =>{
            const specialization:any=specializationDoc.data() ;
            service.specialization=specialization.nume;
            this.servicesList.push({id:doc.id, specializare: service.specialization, nume: service.nume, pret1: service.pret1, pret2:service.pret2, pret3: service.pret3});
            this.dataSource=new MatTableDataSource(this.servicesList)});
          }
          )
      });
    }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  OnAdultAppointment(){
    this.router.navigate(['/programari-adulti']);
  }

  OnChildAppointment(){
    this.router.navigate(['/programari-copii']);
  }

  Back() {
    this.router.navigate(['/dashboard']);
  }

}
