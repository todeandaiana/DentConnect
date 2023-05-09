import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IDoctor } from 'src/app/shared/interfaces/doctor.interface';

@Component({
  selector: 'app-show-doctori',
  templateUrl: './show-doctori.component.html',
  styleUrls: ['./show-doctori.component.css']
})
export class ShowDoctoriComponent implements OnInit{


  DoctorsList: {id:string, nume:string, id_clinica:string, id_specializari: string []}[] =[];
  DoctorsdisplayedColumns: string[] =['Nr.crt', 'Nume', 'Clinica', 'Specializare', 'Editează', 'Șterge'];
  clinicsList: any[] =[];
  specializationsList: any[] =[];

  public DoctordataSource:any;
  public edit: boolean = false;
  public id:string;

  ngOnInit(): void {
    this.getSpecializations();
    this.getClinics();
  }

  constructor(private firestore: AngularFirestore, private router: Router) {
    this.getDoctors();
  }

  getDoctors(){
    this.firestore
      .collection('doctori')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const doctor: any = doc.data();
            this.DoctorsList.push({id: doc.id, nume: doctor.nume, id_clinica:doctor.id_clinica, id_specializari: doctor.id_specializari});
            this.DoctordataSource = new MatTableDataSource(this.DoctorsList);          
        });
      });
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

  DisplayClinic(clinic:any, clinicId: string){
    return clinicId === clinic.id_clinica;
  }

  DisplaySpecialization(clinic:any, specializationsId: any[]){
    return specializationsId.includes(clinic.id_specializare);
  }


  AddDoctor(){
    this.router.navigate(['/add-doctori']);
  }

  EditDoctor(doctor:any){
    this.router.navigate(['/edit-doctori'], {state: {id:doctor.id}});
  }

  DeleteDoctor(doctor: any) : void {
    this.firestore.collection('doctori').doc(doctor.id).delete();
  }

  Back(){
    this.router.navigate(['/admin-dashboard']);
  }


}
