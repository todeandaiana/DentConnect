import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { IPrice } from 'src/app/shared/interfaces/price.interface';
import { IService } from 'src/app/shared/interfaces/service.interface';

@Component({
  selector: 'app-edit-servicii',
  templateUrl: './edit-servicii.component.html',
  styleUrls: ['./edit-servicii.component.css']
})


export class EditServiciiComponent implements OnInit{

  @ViewChild('priceInput', {static: false}) priceInput: MatInput;


  clinicsList: any[] =[];
  clinicsId: string[] = [];

  specializationsList:any[] =[];
  specializationId: string;

  selectedClinicsAndPrices: IPrice[] = [];

  showPrice: boolean = false;

  newService : IService | null = null;
  serviceForm: FormGroup;
  serviceId:string;
  selectedSpecialization:string;



  ngOnInit(): void {
    this.getClinics();
    this.getAllSpecializations();
  }

 

  constructor(private router: Router, private firestore: AngularFirestore) {
    this.serviceForm= new FormGroup({
      name: new FormControl('', Validators.required),
      specializations: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required)
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

  getClinics(){
    this.firestore.collection('clinici').valueChanges().subscribe(clinics => {
      this.clinicsList = clinics;
    })
  }

  getAllSpecializations(){
    this.firestore.collection('specializari').valueChanges().subscribe(specializations => {
      this.specializationsList = specializations;
    })
  }

  getSpecialization(specializationId: string){
    this.firestore.collection('specializari').doc(specializationId).get().subscribe( (doc) => {
      const specialization: any = doc.data();
      console.log(specialization);
      this.selectedSpecialization = specialization.nume;
    })
  }


  getService(){
    this.firestore.collection('serviciii').doc(this.serviceId).get().subscribe( (doc) => {
      const service: any = doc.data();
      this.getSpecialization(service.id_specializare);
      this.selectedClinicsAndPrices = service.preturi;
      console.log(this.selectedClinicsAndPrices);
      this.serviceForm.patchValue({
        name: service.nume,
        description: service.descriere,
        specializations:this.specializationsList,

      })
    })
  }

  
  updateService() {
    this.firestore
    .collection('serviciii')
    .doc(this.serviceId)
    .update({
      nume: this.serviceForm.value.name,
      descriere: this.serviceForm.value.description,
      id_specializare: this.serviceForm.value.specializations.id_specializare,
      preturi: this.selectedClinicsAndPrices.filter(value => value.pret !== '')
    })
    .then(() => {
      this.router.navigate(["/show-servicii"]);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  private selectedClinicExists(id_clinica:string){
    const found = this.selectedClinicsAndPrices.find(value => value.id_clinica === id_clinica)
    return found? true :false;
  }

  getClinicName(id_clinica:string){
    const found= this.clinicsList.find(value => value.id_clinica === id_clinica)
    return found.nume;
  }

  onPriceInput(event:any, id_clinica:string){
    console.log(event.target.value);
    if (event){
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
      console.log(this.selectedClinicsAndPrices);
    }
  }

}
