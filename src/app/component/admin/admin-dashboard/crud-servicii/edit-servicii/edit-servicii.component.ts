import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-servicii',
  templateUrl: './edit-servicii.component.html',
  styleUrls: ['./edit-servicii.component.css']
})
export class EditServiciiComponent implements OnInit{
  serviceForm: FormGroup;
  serviceId:string;

  ngOnInit(): void {
    
  }

  constructor(private router: Router, private firestore: AngularFirestore) {
    this.serviceForm= new FormGroup({
      name: new FormControl('', Validators.required),
      price1: new FormControl('', Validators.required),
      price2: new FormControl('', Validators.required),
      price3: new FormControl('', Validators.required)
    })

    this.serviceId = this.router.getCurrentNavigation().extras.state['id'];
    this.getService();
  }

  get f() {
    return this.serviceForm.controls;
  }


  onFormGroup() {
    console.log(this.serviceForm);
  }

  Back(){
    this.router.navigate(['/show-servicii']);
  }

  getService(){
    this.firestore.collection('servicii').doc(this.serviceId).get().subscribe( (doc) => {
      const service: any = doc.data();
      this.serviceForm.patchValue({
        name: service.nume,
        price1: service.pret1,
        price2: service.pret2,
        price3: service.pret3
      })
    })
  }

  updateService() {
    this.firestore
    .collection('servicii')
    .doc(this.serviceId)
    .update({
      nume: this.serviceForm.value.name,
      pret1: this.serviceForm.value.price1,
      pret2: this.serviceForm.value.price2,
      pret3: this.serviceForm.value.price3
    })
    .then(() => {
      this.router.navigate(["/show-servicii"]);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  
}
