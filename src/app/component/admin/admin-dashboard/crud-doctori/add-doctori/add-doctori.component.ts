import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDoctor } from 'src/app/shared/interfaces/doctor.interface';

@Component({
  selector: 'app-add-doctori',
  templateUrl: './add-doctori.component.html',
  styleUrls: ['./add-doctori.component.css']
})
export class AddDoctoriComponent implements OnInit{

  clinicsList: any[] = [];
  clinicId: string;

  specializationsList: any[] =[];
  specializationsId: string [] =[];
  newDoctor: IDoctor | null = null;

  ngOnInit(): void {
    this.getClinics();
    this.getSpecializations();
  }

  doctorForm: FormGroup =new FormGroup({
    name: new FormControl('', Validators.required)
  })

  constructor(private firestore: AngularFirestore, private router: Router) {}

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

  onSendDoctor(){
    this.newDoctor ={
      nume: this.doctorForm.value.name,
      id_specializari: this.specializationsId,
      id_clinica: this.clinicId
    };
    this.sendDoctor(this.newDoctor);
    this.router.navigate(['/show-doctori']);
  }

  sendDoctor(doctor :any){
    const doctorRef:any = this.firestore.collection(`doctori`);
    const DoctorData ={
      nume: doctor.nume,
      id_specializari: doctor.id_specializari,
      id_clinica: doctor.id_clinica
    };
    return doctorRef.add(DoctorData).then((docRef:any) => {
      const id_doctor = docRef.id;
      return doctorRef.doc(id_doctor).update({id_doctor: id_doctor});
    }).catch((error:any) => {
      console.error("Eroare la salvarea documentului: ", error);
    });
  }

  Back(){
    this.router.navigate(["/show-doctori"]);
  }
}
