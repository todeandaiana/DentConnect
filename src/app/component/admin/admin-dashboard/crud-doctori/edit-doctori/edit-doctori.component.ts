import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDoctor } from 'src/app/shared/interfaces/doctor.interface';

@Component({
  selector: 'app-edit-doctori',
  templateUrl: './edit-doctori.component.html',
  styleUrls: ['./edit-doctori.component.css']
})
export class EditDoctoriComponent implements OnInit {

  clinicsList: any[] =[];
  clinicId: string;
  selectedClinicId: string[] = [];

  doctorForm: FormGroup;
  doctorId:string;

  specializationsList: any[] =[];
  specializationsId: string [] =[];
  newDoctor: IDoctor | null = null;

  ngOnInit(): void {
    this.getClinics();
    this.getSpecializations();
  }


  constructor(private firestore: AngularFirestore, private router: Router) {
    this.doctorForm = new FormGroup({
      name: new FormControl('', Validators.required)
    })

    this.doctorId = this.router.getCurrentNavigation().extras.state['id'];
    this.getDoctor();
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

  updateClinicSelection(event:any, id_clinica:string){
    if(event.checked === true){
      this.clinicId = id_clinica;
    }
  }

  updateSpecializationSelection(event:any, id_specializare:string){
    if(event.checked === true){
      this.specializationsId.push(id_specializare);
    }
  }

  getDoctor(){
    this.firestore.collection('doctori').doc(this.doctorId).get().subscribe( (doc) => {
      const doctor :any = doc.data();
      this.doctorForm.patchValue({
        name: doctor.nume
      })
      this.clinicId=doctor.id_clinica;
      this.specializationsId=doctor.id_specializari;
    })
  }


  updateDoctor(){
    this.firestore
    .collection('doctori')
    .doc(this.doctorId)
    .update({
      nume: this.doctorForm.value.name,
      id_clinica: this.clinicId,
      id_specializari: this.specializationsId
    })
    .then(() => {
      this.router.navigate(["/show-specializari"]);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  Back(){
    this.router.navigate(["/show-doctori"]);
  }

  

}
