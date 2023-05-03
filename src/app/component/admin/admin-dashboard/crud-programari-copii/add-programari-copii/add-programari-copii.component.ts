import { DatePipe, Time } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ValidateHour, ValidateName, ValidatePhone } from 'src/app/shared/custom-validators.directive';
import { IProgramareCopil } from 'src/app/shared/interfaces/programareCopil.interface';
import { ProgramareCopilService } from 'src/app/shared/services/programareCopil.service';

@Component({
  selector: 'app-add-programari-copii',
  templateUrl: './add-programari-copii.component.html',
  styleUrls: ['./add-programari-copii.component.css']
})
export class AddProgramariCopiiComponent {
  data: Date;
  ora: Time;
  nume_pacient: string;
  email: string;
  telefon: string;
  mesaj: string;
  status:string = 'Trimis';
  newProgramareCopil: IProgramareCopil | null = null;
  clinicsList: { id: string; nume: string }[] = [];
  specializationsList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  servicesList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  doctorsList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]> ([]);
  specialization_id: string;
  clinic_id: string;
  today: string;

  appointmentForm: FormGroup = new FormGroup({
    pacient_name: new FormControl('', [Validators.required, ValidateName()]),
    pacient_age: new FormControl('', Validators.required),
    adult_name: new FormControl('', [Validators.required, ValidateName()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, ValidatePhone('07')]),
    date: new FormControl('', [Validators.required]),
    hour: new FormControl('', [Validators.required, ValidateHour()]),
    clinic: new FormControl('', [Validators.required]),
    specialization: new FormControl('', [Validators.required]),
    service: new FormControl('', [Validators.required]),
    doctor: new FormControl('', Validators.required),
    message: new FormControl(''),
    status: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    
  }

  constructor(private router: Router, private programare: ProgramareCopilService, private firestore: AngularFirestore, private datepipe: DatePipe)
   {
    this.today=this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.getClinics();
  }

  DateFilter = (d:Date) : boolean => {
    const day = d.getDay();
    return day !==0 && day !=6;
  }

  get f() {
    return this.appointmentForm.controls;
  }

  Back() {
    this.router.navigate(['/admin-dashboard']);
  }

  onFormGroup() {
    console.log(this.appointmentForm);
  }

  onResetForm() {
    const form = document.getElementById('appointment-form') as HTMLFormElement;
    form.reset();
  }
  
  onSendChildAppointment(){
    this.newProgramareCopil = {
      nume_pacient: this.appointmentForm.value.pacient_name,
      varsta_pacient: this.appointmentForm.value.pacient_age,
      nume_insotitor: this. appointmentForm.value.adult_name,
      email: this.appointmentForm.value.email,
      telefon: this.appointmentForm.value.phone,
      data: this.appointmentForm.value.date,
      ora: this.appointmentForm.value.hour,
      clinica: this.appointmentForm.value.clinic.nume,
      specializare: this.appointmentForm.value.specialization.nume,
      serviciu:this.appointmentForm.value.service.nume,
      doctor:this.appointmentForm.value.doctor.nume,
      mesaj: this.appointmentForm.value.message,
      status:this.appointmentForm.value.status
    };
    this.programare.sendProgramareCopil(this.newProgramareCopil);
    console.log(this.appointmentForm);
    this.router.navigate(['/show-programari-copii']);

  }

  getClinics() {
    this.firestore
      .collection('clinici')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const clinic: any = doc.data();
          this.clinicsList.push({ id: doc.id, nume: clinic.nume });
        });
      });
  }

  changeClinic(clinic: any) {
    console.log(clinic);
    this.clinic_id=clinic.id;
    this.programare
      .getSpecializations(clinic.id)
      .then((res) => {
        this.specializationsList$.next(res);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  changeSpecialization(specialization:any){
    console.log(specialization);
    this.specialization_id=specialization.id;
    this.programare
      .getServices(specialization.id)
      .then((res) => {
        this.servicesList$.next(res);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  changeService(service:any){
    console.log(service);
    this.programare
    .getDoctors(this.specialization_id, this.clinic_id)
     .then((res) => {
       this.doctorsList$.next(res);
        console.log(res);
   })
  .catch((e) => {
    console.log(e);
  });
  }

  changeDoctor(doctor:any){
    console.log(doctor);

  }
}

  
