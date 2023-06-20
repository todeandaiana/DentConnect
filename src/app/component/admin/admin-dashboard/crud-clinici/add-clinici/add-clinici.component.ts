import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IClinic } from 'src/app/shared/interfaces/clinic.interface';

@Component({
  selector: 'app-add-clinici',
  templateUrl: './add-clinici.component.html',
  styleUrls: ['./add-clinici.component.css']
})
export class AddCliniciComponent implements OnInit{

  newClinic: IClinic | null = null;

  clinicForm: FormGroup = new FormGroup ({
    name: new FormControl('', Validators.required),
      CUI: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      schedule: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    
  }

  constructor(private router:Router, private firestore: AngularFirestore) {}

  onSendClinic(){
    this.newClinic ={
      nume: this.clinicForm.value.name,
      adresa: this.clinicForm.value.address,
      CUI: this.clinicForm.value.CUI,
      program: this.clinicForm.value.schedule,
      telefon: this.clinicForm.value.phone
    };
    this.sendClinic(this.newClinic);
    this.router.navigate(['/show-clinici']);
  }

  sendClinic(clinic:any){
    const clinicRef:any = this.firestore.collection(`clinici`);
    const ClinicData ={
      nume: clinic.nume,
      adresa:clinic.adresa,
      CUI: clinic.CUI,
      program:clinic.program,
      telefon:clinic.telefon
    };
    return clinicRef.add(ClinicData).then((docRef:any) => {
      const id_clinica = docRef.id;
      return clinicRef.doc(id_clinica).update({id_clinica: id_clinica});
    }).catch((error:any) => {
      console.error("Eroare la salvarea documentului: ", error);
    });
  }

  Back(){
    this.router.navigate(["/show-clinici"]);
  }

}
