import { DatePipe, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ValidateHour, ValidateName, ValidatePhone } from 'src/app/shared/custom-validators.directive';
import { ProgramareAdultService } from 'src/app/shared/services/programare.service';

@Component({
  selector: 'app-edit-reviews-doctori',
  templateUrl: './edit-reviews-doctori.component.html',
  styleUrls: ['./edit-reviews-doctori.component.css']
})
export class EditReviewsDoctoriComponent {

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
  reviewForm: FormGroup;
  reviewId:string;

  ngOnInit(): void {
    setTimeout( () =>
    this.initializeLists(), 1000
    )
  }


  constructor(private router: Router, private programare: ProgramareAdultService, private firestore: AngularFirestore, private datepipe: DatePipe) {
    this.today=this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.getClinics();
    this.reviewForm=new FormGroup({
      pacient_name: new FormControl('', [Validators.required, ValidateName()]),
      type: new FormControl('', Validators.required),
      adult_name: new FormControl('', Validators.required),
      date: new FormControl('', [Validators.required]),
      clinic: new FormControl('', [Validators.required]),
      specialization: new FormControl('', [Validators.required]),
      service: new FormControl('', [Validators.required]),
      doctor: new FormControl('', Validators.required),
      mark: new FormControl('', Validators.required),
      message: new FormControl(''),
    });
    this.reviewId = this.router.getCurrentNavigation().extras.state['id'];
    this.getReview();
    
  }

  DateFilter = (d:Date) : boolean => {
    const day = d.getDay();
    return day !==0 && day !=6;
  }

  get f() {
    return this.reviewForm.controls;
  }


  onFormGroup() {
    console.log(this.reviewForm);
  }

  Back(){
    this.router.navigate(['/show-reviews-doctori']);
  }

  showAdultName(){
    if(this.reviewForm.controls["type"].value === 'Copil'){
      return true;
    }
    else{
      return false;
    }
  }

  async initializeLists(){
    const foundClinic = this.clinicsList.find( (clinic) => this.reviewForm.value.clinic === clinic.nume);
    await this.changeClinic(foundClinic);

    setTimeout( async () => {
      const foundSpecialization = this.specializationsList$.value.find( (specialization) => this.reviewForm.value.specialization === specialization.nume);
      await this.changeSpecialization(foundSpecialization)
    }, 500)
    
    setTimeout( async () => {
      const foundService = this.servicesList$.value.find( (service) => this.reviewForm.value.service === service.nume);
      await this.changeService(foundService);
    }, 500)


    setTimeout( async () => {
      const foundDoctor = this.doctorsList$.value.find( (doctor) => this.reviewForm.value.doctor === doctor.nume);
      await this.changeDoctor(foundDoctor);
    }, 500)
  }

  getReview(){
    this.firestore.collection('recenzii').doc(this.reviewId).get().subscribe( (doc) =>
    {
          const review: any = doc.data();
          const timestampFirebase=review.data;
          const date = timestampFirebase.toDate();
          this.reviewForm.patchValue({
            clinic: review.clinica, 
            type: review.tip,
            adult_name:review.nume_insotitor,
            pacient_name: review.nume_pacient, 
            date: date,  
            specialization:review.specializare, 
            service: review.serviciu, 
            doctor:review.doctor, 
            mark:review.nota,
            message:review.comentarii, 
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

  updateReview() {
    this.firestore
      .collection('recenzii')
      .doc(this.reviewId)
      .update({
        nume_pacient: this.reviewForm.value.pacient_name,
        tip:this.reviewForm.value.type,
        nume_insotitor:this.reviewForm.value.adult_name,
        data: this.reviewForm.value.date,
        clinica: this.reviewForm.value.clinic,
        specializare: this.reviewForm.value.specialization,
        serviciu: this.reviewForm.value.service,
        doctor: this.reviewForm.value.doctor,
        nota: this.reviewForm.value.mark,
        comentarii: this.reviewForm.value.message,
      })
      .then(() => {
        this.router.navigate(["/show-reviews-doctori"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

