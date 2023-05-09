import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISpecialization } from 'src/app/shared/interfaces/specialization.interface';

@Component({
  selector: 'app-add-specializari',
  templateUrl: './add-specializari.component.html',
  styleUrls: ['./add-specializari.component.css']
})
export class AddSpecializariComponent implements OnInit{

  clinicsList: any[] =[];
  clinicsId: string[] = [];
  newSpecialization: ISpecialization | null = null;

  ngOnInit(): void {
    this.getClinics();
  }

  specializationForm: FormGroup =new FormGroup({
    name: new FormControl('', Validators.required),
    clinics: new FormControl('', Validators.required)
  })

  constructor(private firestore: AngularFirestore, private router: Router) {}

  getClinics(){
    this.firestore.collection('clinici').valueChanges().subscribe(clinics => {
      this.clinicsList = clinics;
    })
  }

  updateClinicSelection(event:any []){
    this.clinicsId =[];
    event.forEach(element=>{
      this.clinicsId.push(element.id_clinica);
    })
  }

  Back(){
    this.router.navigate(["/show-specializari"]);
  }

  onSendSpecialization(){
    this.newSpecialization ={
      nume: this.specializationForm.value.name,
      id_clinici: this.clinicsId
    };
    this.sendSpecialization(this.newSpecialization);
    this.router.navigate(['/show-specializari']);
  }

  sendSpecialization(specialization :any){
    const specializationRef:any = this.firestore.collection(`specializari`);
    const SpecializationData ={
      nume: specialization.nume,
      id_clinici: specialization.id_clinici
    };
    return specializationRef.add(SpecializationData).then((docRef:any) => {
      const id_specializare = docRef.id;
      return specializationRef.doc(id_specializare).update({id_specializare: id_specializare});
    }).catch((error:any) => {
      console.error("Eroare la salvarea documentului: ", error);
    });
  }

  
}
