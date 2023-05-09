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


  AdultAppointmentsList: {clinica:string, nume_pacient: string, data: string, ora:string, specializare:string, serviciu:string, doctor:string, status:string} [] = [];
  ChildAppointmentsList: {clinica:string, nume_pacient: string, nume_insotitor:string, data: string, ora:string, specializare:string, serviciu:string, doctor:string, status:string} [] = [];
  AdultdisplayedColumns: string[] = ['Nr.crt', 'Clinica', 'Pacient', 'Data', 'Ora', 'Specializare', 'Serviciu', 'Doctor', 'Review'];
  ChilddisplayedColumns: string[] = ['Nr.crt', 'Clinica', 'Pacient','Însoțitor', 'Data', 'Ora', 'Specializare', 'Serviciu', 'Doctor', 'Review'];
  public AdultdataSource:any;
  public ChilddataSource:any;



  ngOnInit(): void {
    this.getAdultAppointments();
    this.getChildAppointments();
    // this.ChangeSatusColor();

  }

  constructor(private firestore: AngularFirestore, private router: Router) {}
  
  
  getAdultAppointments(){
    const userId = localStorage.getItem('uid');
    this.firestore
      .collection('programari_adulti', ref => ref.where('tip', '==', 'Adult'))
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const appointment: any = doc.data();
          if(appointment.user_id === userId ) {
            const timestampFirebase=appointment.data;
            const date = timestampFirebase.toDate();
            const dateformat=date.getDate()+ '/' +(date.getMonth()+1) + '/' + date.getFullYear();
            this.AdultAppointmentsList.push({clinica: appointment.clinica, nume_pacient: appointment.nume_pacient, data: dateformat, ora: appointment.ora, specializare:appointment.specializare, serviciu: appointment.serviciu, doctor:appointment.doctor, status:appointment.status});
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
            const dateformat=date.getDate()+ '/' +(date.getMonth()+1) + '/' + date.getFullYear();
            this.ChildAppointmentsList.push({clinica: appointment.clinica, nume_pacient: appointment.nume_pacient, nume_insotitor:appointment.nume_insotitor, data: dateformat, ora: appointment.ora, specializare:appointment.specializare, serviciu: appointment.serviciu, doctor:appointment.doctor, status:appointment.status});
            this.ChilddataSource = new MatTableDataSource(this.ChildAppointmentsList);
          }
        });
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.AdultdataSource.filter = filterValue.trim().toLowerCase();
    this.ChilddataSource.filter = filterValue.trim().toLowerCase();

  }

  OnAdultAppointment(){
    this.router.navigate(['/programari-adulti']);
  }

  OnChildAppointment(){
    this.router.navigate(['/programari-copii']);
  }

  OnReviewDoctor(appointment:any){
    this.router.navigate(["/add-review-doctori"]);
  }

  Back() {
    this.router.navigate(['/dashboard']);
  }

  // ChangeSatusColor(){
  //   const status = document.getElementById('status');
  //   if(status.innerHTML === "Trimis"){
  //     status.style.backgroundColor = "yellow";
  //   } else if (status.innerHTML === "Acceptat"){
  //     status.style.backgroundColor = "green";
  //   }
  //   else {
  //     status.style.backgroundColor = "red";
  //   }
  // }


  // ShowAdultAppointments(){
  //   document.getElementById('adultTable').style.display='inline-table';
  //   document.getElementById('childTable').style.display='none';
  // }

  // ShowChildAppointments() {
  //   document.getElementById('adultTable').style.display='none';
  //   document.getElementById('childTable').style.display='inline-table';
  // }











}
