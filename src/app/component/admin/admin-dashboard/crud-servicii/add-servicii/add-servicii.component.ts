import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { IPrice } from 'src/app/shared/interfaces/price.interface';
import { IService } from 'src/app/shared/interfaces/service.interface';

@Component({
  selector: 'app-add-servicii',
  templateUrl: './add-servicii.component.html',
  styleUrls: ['./add-servicii.component.css']
})
export class AddServiciiComponent implements OnInit {

  @ViewChild('priceInput', {static: false}) priceInput: MatInput;

  clinicsList: any[] =[];
  clinicsId: string[] = [];

  specializationsList:any[] =[];
  specializationId: string;

  selectedClinicsAndPrices: IPrice[] = [];
  showPrice: boolean = false;
  newService : IService | null = null;


  serviceForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    specializations: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.getClinics();
    this.getSpecializations();
  }

  constructor(private router:Router, private firestore: AngularFirestore) {}

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

  isAvailable(clinic:any){
    const specialization = this.serviceForm.controls["specializations"].value;
    if(specialization.id_clinici === undefined){
      return true;
    }
     return specialization.id_clinici.includes(clinic.id_clinica);
  }

  private selectedClinicExists(id_clinica:string){
    const found = this.selectedClinicsAndPrices.find(value => value.id_clinica === id_clinica)
    return found? true :false;
  }

  onPriceInput(event:any, id_clinica:string){
    if (event){
      console.log(this.selectedClinicExists(id_clinica));
      if(this.selectedClinicsAndPrices.length >0 && this.selectedClinicExists(id_clinica) ){
        this.selectedClinicsAndPrices.forEach(value => {
          if(value.id_clinica === id_clinica){
            value.pret = event.target.value;
          }
        })
      }
      else {
        this.selectedClinicsAndPrices.push({ id_clinica: id_clinica, pret: event.target.value });
      }
    }
  }

  updateSpecializationSelection(event:any, id_specializare:string){
    if(event.checked === true){
      this.specializationId = id_specializare;
    }
  }

  onSendService(){
    console.log(this.selectedClinicsAndPrices);
    this.newService ={
      nume: this.serviceForm.value.name,
      id_specializare: this.serviceForm.value.specializations.id_specializare,
      preturi: this.selectedClinicsAndPrices.filter(value => value.pret !== ''),
      descriere:this.serviceForm.value.description
    
    };
    console.log(this.newService);
    this.sendService(this.newService);
    this.router.navigate(['/show-servicii']);
  }

  Back(){
    this.router.navigate(["/show-servicii"]);
  }

  sendService(service:any){
    const serviceRef:any = this.firestore.collection(`serviciii`);
    const ServiceData ={
      nume: service.nume,
      id_specializare: service.id_specializare,
      preturi: service.preturi,
      descriere: service.descriere
    };
    return serviceRef.add(ServiceData).then((docRef:any) => {
      const id_serviciu = docRef.id;
      return serviceRef.doc(id_serviciu).update({id_serviciu: id_serviciu});
    }).catch((error:any) => {
      console.error("Eroare la salvarea documentului: ", error);
    });
  }
  
}
