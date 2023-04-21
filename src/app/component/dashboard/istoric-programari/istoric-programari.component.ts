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

  appointmentsList: {clinica:string, nume_pacient: string, data: string, ora:string, specializare:string, serviciu:string, doctor:string} [] = [];
  displayedColumns: string[] = ['Clinica', 'Pacient', 'Data', 'Ora', 'Specializare', 'Serviciu', 'Doctor'];
  dataSource = new MatTableDataSource(this.appointmentsList);

  ngOnInit(): void {
    this.getAppointments();
  }

  constructor(private firestore: AngularFirestore, private router: Router) {}
  
  
  getAppointments(){
    this.firestore
      .collection('programari-adulti')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const appointment: any = doc.data();
          
          this.appointmentsList.push({clinica: appointment.clinica, nume_pacient: appointment.nume_pacient, data: appointment.data, ora: appointment.ora, specializare:appointment.specializare, serviciu: appointment.serviciu, doctor:appointment.doctor});
        });
      });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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














}
