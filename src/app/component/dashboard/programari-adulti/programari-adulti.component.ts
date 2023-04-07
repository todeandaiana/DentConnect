import { DatePipe, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { Observable, Timestamp } from 'rxjs';
import { IProgramareAdult } from 'src/app/shared/interfaces/programareAdult.interface';
import { ProgramareAdultService } from 'src/app/shared/services/programareAdult.service';
import { FormGroup, FormControl } from '@angular/forms';




@Component({
  selector: 'app-programari-adulti',
  templateUrl: './programari-adulti.component.html',
  styleUrls: ['./programari-adulti.component.css']
})
export class ProgramariAdultiComponent implements OnInit {

  data: Date;
  ora: Time;
  nume_pacient: string = '';
  email: string ='';
  telefon: string ='';
  detalii: string ='';
  newProgramareAdult: IProgramareAdult | null = null;

  appointmentForm: FormGroup = new FormGroup({
      pacient_name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      date: new FormControl(''),
      hour: new FormControl(''),
      details: new FormControl(''),
      clinic: new FormControl('')
  });

  ngOnInit(): void {}

  constructor(private router: Router, private programare: ProgramareAdultService, private firestore: AngularFirestore){
    this.selectedClinic();
  }

  Back(){
    this.router.navigate(['/dashboard']);
  }

  onResetForm(){
    const form = document.getElementById('appointment-form') as HTMLFormElement;
    form.reset();
  }

  onFormGroup(){
    console.log(this.appointmentForm);
  }

  onSendAdultAppointment(){
    this.newProgramareAdult = {
      nume_pacient: this.appointmentForm.value.pacient_name,
      email: this.appointmentForm.value.email,
      telefon: this.appointmentForm.value.phone,
      detalii: this.appointmentForm.value.details,
      data: this.appointmentForm.value.date,
      ora: this.appointmentForm.value.hour,
      clinica: this.appointmentForm.value.clinic.nume
    }
    this.programare.sendProgramareAdult(this.newProgramareAdult);
    console.log(this.appointmentForm);
    this.router.navigate(['/dashboard']);
  }

 

  clinicsList :{ id:string, nume: string} [] = [];
  
  selectedClinic(){
    this.firestore.collection('clinici').get().subscribe(snapshot => {
      snapshot.forEach(doc => {
        const clinic:any= doc.data();
        this.clinicsList.push({id : doc.id, nume: clinic.nume});
      })
    })
  }

  changeClinic(clinic:any){
    console.log(clinic);
    this.programare.getSpecializations(clinic.id)
    .then( res => {
      console.log(res);
    })
    .catch(e => {
      console.log(e);
    })
  }
}

