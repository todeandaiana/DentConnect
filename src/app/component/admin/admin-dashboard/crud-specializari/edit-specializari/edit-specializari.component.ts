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
  selectedClinics: any[] =[];
  clinicsId: string[] = [];
  selectedClinicId: string[] = [];
  newSpecialization: ISpecialization | null = null;
  specializationForm: FormGroup;
  specializationId:string;

  ngOnInit(): void {
    this.getAllClinics();
  }

  constructor(private firestore: AngularFirestore, private router: Router) {
    this.specializationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      clinics: new FormControl('', Validators.required)
    })

    this.specializationId = this.router.getCurrentNavigation().extras.state['id'];
    this.getSpecialization();
  }

  getAllClinics(){
    this.firestore.collection('clinici').valueChanges().subscribe(clinics => {
      this.clinicsList = clinics;
    })
  }

  getClinics(clinicsId: string[]){
    this.firestore.collection('clinici').get().subscribe((snapshot) => {
      snapshot.forEach((doc) => {
        const clinic: any = doc.data();
        if (clinicsId.includes(doc.id)) { 
          this.selectedClinics.push(clinic.nume); 
        }
      });
      this.specializationForm.patchValue({
        clinics: this.selectedClinics
      })
    });
  }

  updateClinicSelection(event:any[]){
    this.clinicsId =[];
    event.forEach(element=>{
      const found = this.clinicsList.find(value=> value.nume === element);
      this.clinicsId.push(found.id_clinica);
    })
  }

  Back(){
    this.router.navigate(["/show-specializari"]);
  }
  
  getSpecialization(){
    this.firestore.collection('specializari').doc(this.specializationId).get().subscribe( (doc) => {
      const specialization: any = doc.data();
      this.getClinics(specialization.id_clinici);
      this.specializationForm.patchValue({
        name: specialization.nume,
        clinics: this.clinicsList
      })
    })
  }

  updateSpecialization(){
    this.firestore.collection('specializari').doc(this.specializationId).update({
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

}

  



