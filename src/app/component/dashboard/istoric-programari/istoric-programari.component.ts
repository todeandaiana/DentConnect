import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-istoric-programari',
  templateUrl: './istoric-programari.component.html',
  styleUrls: ['./istoric-programari.component.css']
})
export class IstoricProgramariComponent implements OnInit {


  AdultAppointmentsList: {id:string, clinica:string, nume_pacient: string, data: string, ora:string, specializare:string, serviciu:string, doctor:string, status:string} [] = [];
  ChildAppointmentsList: {id:string, clinica:string, nume_pacient: string, nume_insotitor:string, data: string, ora:string, specializare:string, serviciu:string, doctor:string, status:string} [] = [];
  ReviewsList: {id:string, id_programare:string, clinica:string, nume_pacient: string, tip:string ,nume_insotitor:string, data: string, specializare:string, serviciu:string, doctor:string, nota:number, comentarii:string} [] = [];

  AdultdisplayedColumns: string[] = ['Nr.crt', 'Clinica', 'Pacient', 'Data', 'Ora', 'Specializare', 'Serviciu', 'Doctor', 'Review'];
  ChilddisplayedColumns: string[] = ['Nr.crt', 'Clinica', 'Pacient','Însoțitor', 'Data', 'Ora', 'Specializare', 'Serviciu', 'Doctor', 'Review'];
  ReviewdisplayedColumns: string[] = ['Nr.crt', 'Clinica', 'Pacient', 'Tip', 'Însoțitor', 'Data examinării', 'Specializare', 'Serviciu', 'Doctor', 'Nota', 'Comentarii'];

  public AdultdataSource:any;
  public ChilddataSource:any;
  public ReviewdataSource:any;

  DisableReview= false;

  ngOnInit(): void {
    this.getAdultAppointments();
    this.getChildAppointments();
    this.getReviews();
  }

  constructor(private firestore: AngularFirestore, private router: Router) {}
  
  
  getAdultAppointments(){
    const userId = localStorage.getItem('uid');
    this.firestore.collection('programari_adulti', ref => ref.where('tip', '==', 'Adult')).get().subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const programare: any = doc.data();
          if(programare.user_id === userId ) {
            const timestampFirebase=programare.data;
            const date = timestampFirebase.toDate();
            const dateformat= date.getFullYear()+ '-' +(date.getMonth()+1) + '-' + date.getDate() ;
            this.AdultAppointmentsList.push({id:doc.id,clinica: programare.clinica, nume_pacient: programare.nume_pacient, data: dateformat, ora: programare.ora, specializare:programare.specializare, serviciu: programare.serviciu, doctor:programare.doctor, status:programare.status});
            this.AdultdataSource = new MatTableDataSource(this.AdultAppointmentsList);
          }
        });
      });
  }

  getChildAppointments(){
    const userId = localStorage.getItem('uid');
    this.firestore
      .collection('programari_adulti', ref => ref.where('tip', '==', 'Copil'))
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const appointment: any = doc.data();
          if(appointment.user_id === userId ) {
            const timestampFirebase=appointment.data;
            const date = timestampFirebase.toDate();
            const dateformat= date.getFullYear()+ '-' +(date.getMonth()+1) + '-' + date.getDate() ;
            this.ChildAppointmentsList.push({id:doc.id, clinica: appointment.clinica, nume_pacient: appointment.nume_pacient, nume_insotitor:appointment.nume_insotitor, data: dateformat, ora: appointment.ora, specializare:appointment.specializare, serviciu: appointment.serviciu, doctor:appointment.doctor, status:appointment.status});
            this.ChilddataSource = new MatTableDataSource(this.ChildAppointmentsList);
          }
        });
      });
  }

  getReviews(){
    const userId = localStorage.getItem('uid');
    this.firestore
      .collection('recenzii')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const review: any = doc.data();
          if(review.user_id === userId) {
            const timestampFirebase=review.data;
            const date = timestampFirebase.toDate();
            const dateformat= date.getFullYear()+ '-' +(date.getMonth()+1) + '-' + date.getDate() ;
            this.ReviewsList.push({id:doc.id, id_programare:review.id_programare, clinica: review.clinica, nume_pacient: review.nume_pacient, tip:review.tip, nume_insotitor:review.nume_insotitor, data: dateformat, specializare:review.specializare, serviciu: review.serviciu, doctor:review.doctor, nota:review.nota, comentarii:review.comentarii});
            this.ReviewdataSource = new MatTableDataSource(this.ReviewsList);
          }
        });
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.AdultdataSource.filter = filterValue.trim().toLowerCase();
    this.ChilddataSource.filter = filterValue.trim().toLowerCase();
  }

  OnReviewDoctor(appointment:any){
    console.log(appointment);
    this.router.navigate(['/add-review-doctori'], {state: {id:appointment.id}});
  }

  ReviewExists(appointment:any){
    const exista = this.ReviewsList.find(recenzie => recenzie.id_programare === appointment.id);
    const today = new Date();
    const appointmentDate:Date =new Date(appointment.data);
    if(exista || appointmentDate.getTime() > today.getTime()){
      return true;
    } else {
      return false;
    }
  }

  Back() {
    this.router.navigate(['/dashboard']);
  }
  
}
