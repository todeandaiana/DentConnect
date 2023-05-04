import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-clinici',
  templateUrl: './edit-clinici.component.html',
  styleUrls: ['./edit-clinici.component.css']
})
export class EditCliniciComponent implements OnInit{

  clinicForm: FormGroup;
  clinicId:string;

  ngOnInit(): void {
    
  }

  constructor(private router: Router, private firestore: AngularFirestore) {
    this.clinicForm= new FormGroup({
      name: new FormControl('', Validators.required),
      CUI: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      schedule: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required])
    })

    this.clinicId = this.router.getCurrentNavigation().extras.state['id'];
    this.getClinic();
  }

  get f() {
    return this.clinicForm.controls;
  }


  onFormGroup() {
    console.log(this.clinicForm);
  }

  Back(){
    this.router.navigate(['/show-clinici']);
  }

  getClinic(){
    this.firestore.collection('clinici').doc(this.clinicId).get().subscribe( (doc) => {
      const clinic: any = doc.data();
      this.clinicForm.patchValue({
        name: clinic.nume,
        CUI: clinic.CUI,
        address: clinic.adresa,
        schedule: clinic.program,
        phone: clinic.telefon
      })
    })
  }

  updateClinic() {
    this.firestore
    .collection('clinici')
    .doc(this.clinicId)
    .update({
      nume: this.clinicForm.value.name,
      CUI: this.clinicForm.value.CUI,
      adresa: this.clinicForm.value.address,
      program: this.clinicForm.value.schedule,
      telefon: this.clinicForm.value.phone
    })
    .then(() => {
      this.router.navigate(["/show-clinici"]);
    })
    .catch((error) => {
      console.error(error);
    });
  }

}
