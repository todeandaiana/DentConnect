import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-reviews-doctori',
  templateUrl: './show-reviews-doctori.component.html',
  styleUrls: ['./show-reviews-doctori.component.css']
})
export class ShowReviewsDoctoriComponent implements OnInit{

  ReviewsList: {id:string, id_programare:string, clinica:string, nume_pacient: string, tip:string ,nume_insotitor:string, data: string, specializare:string, serviciu:string, doctor:string, nota:number, comentarii:string} [] = [];

  ReviewdisplayedColumns: string[] = ['Nr.crt', 'Clinica', 'Pacient', 'Tip', 'Însoțitor', 'Data examinării', 'Specializare', 'Serviciu', 'Doctor', 'Nota', 'Comentarii'];

  public ReviewdataSource:any;

  ngOnInit():void{
    this.getReviews();
  }

  constructor(private firestore: AngularFirestore, private router: Router) {}

  getReviews(){
    const userId = localStorage.getItem('uid');
    this.firestore
      .collection('recenzii')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const review: any = doc.data();
          if(review.user_id === userId ) {
            const timestampFirebase=review.data;
            const date = timestampFirebase.toDate();
            const dateformat=date.getDate()+ '/' +(date.getMonth()+1) + '/' + date.getFullYear();
            this.ReviewsList.push({id:doc.id, id_programare:review.id_programare, clinica: review.clinica, nume_pacient: review.nume_pacient, tip:review.tip, nume_insotitor:review.nume_insotitor, data: dateformat, specializare:review.specializare, serviciu: review.serviciu, doctor:review.doctor, nota:review.nota, comentarii:review.comentarii});
            this.ReviewdataSource = new MatTableDataSource(this.ReviewsList);
          }
        });
      });
  }

  Back() {
    this.router.navigate(['/dashboard']);
  }

  EditReview(review:any){
    this.router.navigate(['/edit-review-doctori'], {state: {id:review.id}});

  }

  DeleteReview(review:any){
    this.firestore.collection('recenzii').doc(review.id).delete();
  }



}

