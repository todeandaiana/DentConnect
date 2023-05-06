import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISpecialization } from 'src/app/shared/interfaces/specialization.interface';

@Component({
  selector: 'app-edit-specializari',
  templateUrl: './edit-specializari.component.html',
  styleUrls: ['./edit-specializari.component.css']
})
export class EditSpecializariComponent implements OnInit {
  clinicsList: any[] =[];
  clinicsId: string[] = [];
  selectedClinicId: string[] = [];
  newSpecialization: ISpecialization | null = null;
  specializationForm: FormGroup;
  specializationId:string;

  ngOnInit(): void {
    this.getClinics();
  }

  constructor(private firestore: AngularFirestore, private router: Router) {
    this.specializationForm = new FormGroup({
      name: new FormControl('', Validators.required)
    })

    this.specializationId = this.router.getCurrentNavigation().extras.state['id'];
    this.getSpecialization();
  }

  getClinics(){
    this.firestore.collection('clinici').valueChanges().subscribe(clinics => {
      this.clinicsList = clinics;
    })
  }

  // updateClinicSelection(event:any, id_clinica:string){
  //   if(event.checked === true){
  //     this.selectedClinicId.push(id_clinica);
  //   }
  //   else {
  //     const index = this.selectedClinicId.indexOf(id_clinica);
  //     if(index !== -1){
  //       this.selectedClinicId.splice(index,1);
  //     }
  //   }
  // }

  Back(){
    this.router.navigate(["/show-specializari"]);
  }

  getSpecialization(){
    this.firestore.collection('specializari').doc(this.specializationId).get().subscribe( (doc) => {
      const specialization: any = doc.data();
      this.specializationForm.patchValue({
        name: specialization.nume,
      })
      this.clinicsId=specialization.id_clinici;
    })
  }

  updateSpecialization(){
    this.firestore
    .collection('specializari')
    .doc(this.specializationId)
    .update({
      nume: this.specializationForm.value.name,
      id_clinici: this.clinicsId
    })
    .then(() => {
      this.router.navigate(["/show-specializari"]);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  ClinicExists(clinic:any){
    return this.clinicsId.includes(clinic.id_clinica);
  }
  }

  // clinicExists(id_clinica:string): boolean{
  //   const clinicRef = this.firestore.collection('specializari', ref => ref.where('id_clinici', "array-contains", id_clinica)).get().subscribe( () =>{
  //     if(clinicRef){
  //       return true;
  //     }else{
  //       return false;
  //     }
  //   })
  // }

  // clinicExists(idClinica: string): boolean {
  //   const clinicaRef = this.firestore.collection('specializari' , ref => ref.where('id_clinici', "array-contains", idClinica));
  //   clinicaRef.get().subscribe((doc) => {
  //     if (doc) {
  //       return true;
  //     } else {
  //       return false;
  //     }
      
  //   });
  //   return true;
  // }


 

  // sendSpecialization(specialization :any){
  //   const specializationRef:any = this.firestore.collection(`specializari`);
  //   const SpecializationData ={
  //     nume: specialization.nume,
  //     id_clinici: specialization.id_clinici
  //   };
  //   return specializationRef.add(SpecializationData).then((docRef:any) => {
  //     const id_specializare = docRef.id;
  //     return specializationRef.doc(id_specializare).update({id_specializare: id_specializare});
  //   }).catch((error:any) => {
  //     console.error("Eroare la salvarea documentului: ", error);
  //   });
  // }

  



