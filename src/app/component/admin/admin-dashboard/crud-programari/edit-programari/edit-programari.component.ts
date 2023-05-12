import { DatePipe, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ValidateHour, ValidateName, ValidatePhone } from 'src/app/shared/custom-validators.directive';
import { ProgramareAdultService } from 'src/app/shared/services/programare.service';

@Component({
  selector: 'app-edit-programari',
  templateUrl: './edit-programari.component.html',
  styleUrls: ['./edit-programari.component.css']
})
export class EditProgramariComponent implements OnInit{

  data: Date;
  ora: Time;
  nume_pacient: string;
  email: string;
  telefon: string;
  mesaj: string;
  status: string;
  clinicsList: { id: string; nume: string }[] = [];
  specializationsList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  servicesList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  doctorsList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]> ([]);
  specialization_id: string;
  clinic_id: string;
  today: string;
  appointmentForm: FormGroup;
  appointmentId:string;

  ngOnInit(): void {
    setTimeout( () =>
    this.initializeLists(), 1000
    )
  }


  constructor(private router: Router, private programare: ProgramareAdultService, private firestore: AngularFirestore, private datepipe: DatePipe) {
    this.today=this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.getClinics();
    this.appointmentForm=new FormGroup({
      pacient_name: new FormControl('', [Validators.required, ValidateName()]),
      type: new FormControl('', Validators.required),
      adult_name: new FormControl('', Validators.required),
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
    this.appointmentId = this.router.getCurrentNavigation().extras.state['id'];
    this.getAppointment();
    
  }

  DateFilter = (d:Date) : boolean => {
    const day = d.getDay();
    return day !==0 && day !=6;
  }

  get f() {
    return this.appointmentForm.controls;
  }


  onFormGroup() {
    console.log(this.appointmentForm);
  }

  Back(){
    this.router.navigate(['/show-programari']);
  }

  showAdultName(){
    if(this.appointmentForm.controls["type"].value === 'Copil'){
      return true;
    }
    else{
      return false;
    }
  }

  async initializeLists(){
    const foundClinic = this.clinicsList.find( (clinic) => this.appointmentForm.value.clinic === clinic.nume);
    await this.changeClinic(foundClinic);

    setTimeout( async () => {
      const foundSpecialization = this.specializationsList$.value.find( (specialization) => this.appointmentForm.value.specialization === specialization.nume);
      await this.changeSpecialization(foundSpecialization)
    }, 500)
    
    setTimeout( async () => {
      const foundService = this.servicesList$.value.find( (service) => this.appointmentForm.value.service === service.nume);
      await this.changeService(foundService);
    }, 500)


    setTimeout( async () => {
      const foundDoctor = this.doctorsList$.value.find( (doctor) => this.appointmentForm.value.doctor === doctor.nume);
      await this.changeDoctor(foundDoctor);
    }, 500)
  }

  getAppointment(){
    this.firestore.collection('programari_adulti').doc(this.appointmentId).get().subscribe( (doc) =>
    {
          const appointment: any = doc.data();
          const timestampFirebase=appointment.data;
          const date = timestampFirebase.toDate();
          this.appointmentForm.patchValue({
            clinic: appointment.clinica, 
            type: appointment.tip,
            adult_name:appointment.nume_insotitor,
            pacient_name: appointment.nume_pacient, 
            date: date, 
            hour: appointment.ora, 
            email:appointment.email, 
            phone:appointment.telefon, 
            specialization:appointment.specializare, 
            service: appointment.serviciu, 
            doctor:appointment.doctor, 
            message:appointment.mesaj, 
            status:appointment.status
          });
    });
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
  }

  updateAppointment() {
    this.firestore
      .collection('programari_adulti')
      .doc(this.appointmentId)
      .update({
        nume_pacient: this.appointmentForm.value.pacient_name,
        tip:this.appointmentForm.value.type,
        nume_insotitor:this.appointmentForm.value.adult_name,
        email: this.appointmentForm.value.email,
        telefon: this.appointmentForm.value.phone,
        data: this.appointmentForm.value.date,
        ora: this.appointmentForm.value.hour,
        clinica: this.appointmentForm.value.clinic,
        specializare: this.appointmentForm.value.specialization,
        serviciu: this.appointmentForm.value.service,
        doctor: this.appointmentForm.value.doctor,
        mesaj: this.appointmentForm.value.message,
        status:this.appointmentForm.value.status
      })
      .then(() => {
        this.router.navigate(["/show-programari"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
