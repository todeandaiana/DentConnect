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
  specializationsListFiltered :any[] =[];
  newDoctor: IDoctor | null = null;

  ngOnInit(): void {
    this.getClinics();
    this.getSpecializations();
  }

  doctorForm: FormGroup =new FormGroup({
    name: new FormControl('', Validators.required),
    specializations: new FormControl('', Validators.required),
    clinic: new FormControl('', Validators.required)
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

  updateClinicSelection(event:any){
    console.log(event);
    this.specializationsListFiltered = this.specializationsList.filter(value=> value.id_clinici.includes(event.id_clinica));
    console.log(this.specializationsListFiltered);
  }

  updateSpecializationSelection(event:any []){
    this.specializationsId =[];
    event.forEach(element => {
      this.specializationsId.push(element.id_specializare);
      
    });
    console.log(event);

    console.log(this.specializationsId);
  }

  onSendDoctor(){
    console.log(this.doctorForm.value.specializations.id_specializare);
    console.log(this.doctorForm.value.clinic.id_clinica);
    this.newDoctor ={
      nume: this.doctorForm.value.name,
      id_specializari: this.specializationsId,
      id_clinica: this.doctorForm.value.clinic.id_clinica
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
