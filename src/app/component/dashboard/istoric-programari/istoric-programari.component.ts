import { DatePipe, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-istoric-programari',
  templateUrl: './istoric-programari.component.html',
  styleUrls: ['./istoric-programari.component.css']
})
export class IstoricProgramariComponent implements OnInit {


  AdultAppointmentsList: {clinica:string, nume_pacient: string, data: string, ora:string, specializare:string, serviciu:string, doctor:string} [] = [];
  ChildAppointmentsList: {clinica:string, nume_pacient: string, varsta_pacient:string, nume_insotitor:string, data: string, ora:string, specializare:string, serviciu:string, doctor:string} [] = [];
  AdultdisplayedColumns: string[] = ['Nr.crt', 'Clinica', 'Pacient', 'Data', 'Ora', 'Specializare', 'Serviciu', 'Doctor'];
  ChilddisplayedColumns: string[] = ['Nr.crt', 'Clinica', 'Pacient', 'Vârstă pacient', 'Însoțitor', 'Data', 'Ora', 'Specializare', 'Serviciu', 'Doctor'];
  public AdultdataSource:any;
  public ChilddataSource:any;



  ngOnInit(): void {
    this.getAdultAppointments();
    this.getChildAppointments();
    // document.getElementById('AdultTable').style.display='none';
    // document.getElementById('childTable').style.display='none';
  }

  constructor(private firestore: AngularFirestore, private router: Router) {}
  
  
  getAdultAppointments(){
    const userId = localStorage.getItem('uid');
    this.firestore
      .collection('programari_adulti')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const appointment: any = doc.data();
          if(appointment.user_id === userId ) {
            const timestampFirebase=appointment.data;
            const date = timestampFirebase.toDate();
            const dateformat=date.getDate()+ '/' +(date.getMonth()+1) + '/' + date.getFullYear();
            this.AdultAppointmentsList.push({clinica: appointment.clinica, nume_pacient: appointment.nume_pacient, data: dateformat, ora: appointment.ora, specializare:appointment.specializare, serviciu: appointment.serviciu, doctor:appointment.doctor});
            this.AdultdataSource = new MatTableDataSource(this.AdultAppointmentsList);
          }
        });
      });
  }

  getChildAppointments(){
    const userId = localStorage.getItem('uid');
    this.firestore
      .collection('programari_copii')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const appointment: any = doc.data();
          if(appointment.user_id === userId ) {
            const timestampFirebase=appointment.data;
            const date = timestampFirebase.toDate();
            const dateformat=date.getDate()+ '/' +(date.getMonth()+1) + '/' + date.getFullYear();
            this.ChildAppointmentsList.push({clinica: appointment.clinica, nume_pacient: appointment.nume_pacient, varsta_pacient:appointment.varsta_pacient, nume_insotitor:appointment.nume_insotitor, data: dateformat, ora: appointment.ora, specializare:appointment.specializare, serviciu: appointment.serviciu, doctor:appointment.doctor});
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

  Back() {
    this.router.navigate(['/dashboard']);
  }

  // ShowAdultAppointments(){
  //   document.getElementById('adultTable').style.display='inline-table';
  //   document.getElementById('childTable').style.display='none';
  // }

  // ShowChildAppointments() {
  //   document.getElementById('adultTable').style.display='none';
  //   document.getElementById('childTable').style.display='inline-table';
  // }











}
