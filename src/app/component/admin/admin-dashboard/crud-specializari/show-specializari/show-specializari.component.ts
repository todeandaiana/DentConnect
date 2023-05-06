import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-specializari',
  templateUrl: './show-specializari.component.html',
  styleUrls: ['./show-specializari.component.css']
})
export class ShowSpecializariComponent implements OnInit{
  SpecializationsList: {id:string, nume:string, id_clinici:string[]} [] =[];
  SpecializationsdisplayedColumns: string[] =['Nr.crt', 'Nume', 'Clinici', 'Editează', 'Șterge'];
  clinicsList: any[] =[];

  public SpecializationdataSource:any;
  public edit: boolean = false;
  public id:string;

  ngOnInit(): void {
    this.getSpecializations();
    this.getClinics();
  }

  constructor(private firestore: AngularFirestore, private router: Router) {
  }

  getSpecializations(){
    this.firestore
      .collection('specializari')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const specialization: any = doc.data();
            this.SpecializationsList.push({id: doc.id, nume: specialization.nume, id_clinici:specialization.id_clinici});
            this.SpecializationdataSource = new MatTableDataSource(this.SpecializationsList);          
        });
      });
  }

    getClinics(){
    this.firestore.collection('clinici').valueChanges().subscribe(clinics => {
      this.clinicsList = clinics;
    })
  }

  DisplayClinic(clinic:any, clinicsId: any[]){
    return clinicsId.includes(clinic.id_clinica);
  }


  AddSpecialization(){
    this.router.navigate(['/add-specializari']);
  }

  EditSpecialization(specialization:any){
    this.router.navigate(['/edit-specializari'], {state: {id:specialization.id}});
  }

  DeleteSpecialization(specialization: any) : void {
    this.firestore.collection('specializari').doc(specialization.id).delete();
    // this.getServices();
  }

  Back(){
    this.router.navigate(['/admin-dashboard']);
  }

}
