import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IReviewDoctor } from 'src/app/shared/interfaces/review.interface';

@Component({
  selector: 'app-add-review-doctori',
  templateUrl: './add-review-doctori.component.html',
  styleUrls: ['./add-review-doctori.component.css']
})
export class AddReviewDoctoriComponent implements OnInit{

  reviewForm: FormGroup;
  reviewId:string;
  today:string;
  data:Date;
  isDisabled = false;
  showAdultName = false;
  newReviewDoctor: IReviewDoctor=null;

  ngOnInit(): void {
    
  }

  constructor(private router: Router, private firestore: AngularFirestore,  private datepipe: DatePipe) {
    this.today=this.datepipe.transform(new Date(), 'yyyy-MM-dd');


    this.reviewForm = new FormGroup({
      pacient_name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      adult_name: new FormControl(''),
      date: new FormControl('', Validators.required),
      clinic: new FormControl('', Validators.required),
      doctor: new FormControl('', Validators.required),
      specialization: new FormControl('', Validators.required),
      service: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      feedback: new FormControl('', Validators.required),
      terms: new FormControl(false, [Validators.requiredTrue]),
      GDPR: new FormControl(false, [Validators.requiredTrue]),

    })

    this.reviewId = this.router.getCurrentNavigation().extras.state['id'];
    this.getAppointmentData();

  }


  getAppointmentData(){
    this.firestore.collection('programari_adulti').doc(this.reviewId).get().subscribe( (doc)=>{
      const appointment: any = doc.data();
      const timestampFirebase=appointment.data;
      const date = timestampFirebase.toDate();
      this.reviewForm.patchValue({
        pacient_name: appointment.nume_pacient,
        type:appointment.tip,
        adult_name:appointment.nume_insotitor,
        date: date,
        clinic: appointment.clinica,
        doctor:appointment.doctor,
        specialization:appointment.specializare,
        service:appointment.serviciu
      })
    })
  }


  onSendReview(){
    this.newReviewDoctor ={
      nume_pacient:this.reviewForm.value.pacient_name,
      tip: this.reviewForm.value.type,
      nume_insotitor: this.reviewForm.value.adult_name,
      data: this.reviewForm.value.date,
      clinica: this.reviewForm.value.clinic,
      doctor: this.reviewForm.value.doctor,
      specializare:this.reviewForm.value.specialization,
      serviciu: this.reviewForm.value.service,
      nota: this.reviewForm.value.grade,
      comentarii: this.reviewForm.value.feedback
    }
    console.log(this.newReviewDoctor);
    this.sendReview(this.newReviewDoctor);
    this.router.navigate(['/istoric-programari']);
  }

  sendReview(review:any){
    const reviewRef:any = this.firestore.collection('recenzii');
      const ReviewData ={id_programare: this.reviewId ,user_id: localStorage['uid'],nume_pacient: review.nume_pacient,tip:review.tip,nume_insotitor: review.nume_insotitor? review.nume_insotitor : '',data: review.data,clinica:review.clinica,specializare:review.specializare,serviciu:review.serviciu,doctor:review.doctor,nota: review.nota,comentarii: review.comentarii};
      console.log(ReviewData);
      return reviewRef.add(ReviewData).then((docRef:any) => {
        const id_recenzie = docRef.id;
        return reviewRef.doc(id_recenzie).update({id_recenzie: id_recenzie});
      }).catch((error:any) => {
        console.error("Eroare la salvarea documentului: ", error);
      });
    }

  disable(){
    this.isDisabled = true;
    this.reviewForm.controls["pacient_name"].disable();
  }

  onTypeChange(){
    if (this.reviewForm.controls["type"].value === 'Copil') {
      this.showAdultName = true;
    } else {
      this.showAdultName = false;
    }
  }

  get f() {
    return this.reviewForm.controls;
  }

  onFormGroup() {
    console.log(this.reviewForm);
  }

  Back(){
    this.router.navigate(['/istoric-programari']);
  }
  
}
