import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IService } from 'src/app/shared/interfaces/service.interface';

@Component({
  selector: 'app-add-servicii',
  templateUrl: './add-servicii.component.html',
  styleUrls: ['./add-servicii.component.css']
})
export class AddServiciiComponent implements OnInit {

  newService : IService | null = null;
  serviceForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    clinics: new FormControl({id:' jdjs', price: 'dksnkjdn', avialable: true}),
    clinica: new FormControl(true),
    price1: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    price2: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    price3: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
  })

  ngOnInit(): void {
    
  }

  constructor(private router:Router, private firestore: AngularFirestore) {}


  onSendService(){
    this.newService ={
      nume: this.serviceForm.value.name,
      pret1: this.serviceForm.value.price1,
      pret2: this.serviceForm.value.price2,
      pret3: this.serviceForm.value.price3
    };
    this.sendService(this.newService);
    this.router.navigate(['/show-servicii']);

  }

  Back(){
    this.router.navigate(["/show-servicii"]);
  }

  sendService(service:any){
    const serviceRef:any = this.firestore.collection(`servicii`);
    const ServiceData ={
      // user_id: localStorage['uid'],
      nume: service.nume,
      pret1:service.pret1,
      pret2:service.pret2,
      pret3:service.pret3
    };
    return serviceRef.doc().set(ServiceData, {merge: true});
  }
  
}
