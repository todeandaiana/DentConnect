import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, doc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDoctor } from 'src/app/shared/interfaces/doctor.interface';

@Component({
  selector: 'app-edit-doctori',
  templateUrl: './edit-doctori.component.html',
  styleUrls: ['./edit-doctori.component.css']
})
export class EditDoctoriComponent implements OnInit {

  clinicsList: any[] = [];
  clinicId: string;
  selectedClinic:string;

  specializationsList: any[] =[];
  specializationsId: string [] =[];
  selectedSpecializations:any[] = [];
  specializationsListFiltered :any[] =[];
  newDoctor: IDoctor | null = null;

  doctorForm: FormGroup;
  doctorId:string;

  ngOnInit(): void {
    this.getAllClinics();
    this.getAllSpecializations();

  }

  constructor(private firestore: AngularFirestore, private router: Router) {
    this.doctorForm = new FormGroup({
      name: new FormControl('', Validators.required),
      specializations: new FormControl('', Validators.required),
      clinic: new FormControl('', Validators.required)
    })

    this.doctorId = this.router.getCurrentNavigation().extras.state['id'];
    this.getDoctor();
  }

  getAllClinics(){
    this.firestore.collection('clinici').valueChanges().subscribe(clinics => {
      this.clinicsList = clinics;
    })
  }

  getClinic(clinicId:string){
    this.firestore.collection('clinici').doc(clinicId).get().subscribe( (doc) => {
      const clinic: any = doc.data();
      console.log(clinic);
      this.selectedClinic = clinic.nume;
      // this.doctorForm.patchValue({
      //   clinic: clinic
      // });
      this.clinicId=clinic.id_clinica;
      console.log(this.selectedClinic);
    })
  }

  getSpecializations(specializationsId: string[]) {
    this.firestore.collection('specializari').get().subscribe((snapshot) => {
      snapshot.forEach((doc) => {
        const specialization: any = doc.data();
        if (specializationsId.includes(doc.id)) { 
          this.selectedSpecializations.push(specialization.nume); 
        }
      });
      this.doctorForm.patchValue({
        specializations: this.selectedSpecializations
      })
    });
    console.log(this.selectedSpecializations);
  }
  
  getAllSpecializations(){
    this.firestore.collection('specializari').valueChanges().subscribe(specializations => {
      this.specializationsList = specializations;
    })
  }

  getDoctor(){
    this.firestore.collection('doctori').doc(this.doctorId).get().subscribe( (doc) => {
      const doctor: any = doc.data();
      this.getClinic(doctor.id_clinica);
      this.getSpecializations(doctor.id_specializari);
      this.doctorForm.patchValue({
        name: doctor.nume,
        specializations:this.specializationsList,
      })
    })
  }

  updateClinicSelection(event:any){
    console.log(event);
    const found = this.clinicsList.find( element=> element.nume === event.value);
    this.clinicId = found.id_clinica;
    console.log(found);
    this.specializationsListFiltered = this.specializationsList.filter(value=> value.id_clinici.includes(found.id_clinica));
    console.log(this.specializationsListFiltered);
  }

  updateSpecializationSelection(event:any []){
    console.log(event);
    this.specializationsId =[];
    event.forEach(element => {
      const found = this.specializationsList.find(value => value.nume === element);
      console.log(found);
      this.specializationsId.push(found.id_specializare);
    });
    console.log(this.specializationsId);
  }

  updateDoctor() {
    this.firestore
    .collection('doctori')
    .doc(this.doctorId)
    .update({
      nume: this.doctorForm.value.name,
      id_specializari: this.specializationsId,
      id_clinica: this.clinicId
    })
    .then(() => {
      this.router.navigate(["/show-doctori"]);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  Back(){
    this.router.navigate(["/show-doctori"]);
  }

  get f() {
    return this.doctorForm.controls;
  }


  onFormGroup() {
    console.log(this.doctorForm);
  }

}


 
  


