import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-programari',
  templateUrl: './show-programari.component.html',
  styleUrls: ['./show-programari.component.css']
})
export class ShowProgramariComponent implements OnInit {
  AdultAppointmentsList: {clinica:string, nume_pacient: string, email:string, telefon: string, data: string, ora:string, specializare:string, serviciu:string, doctor:string, mesaj:string,  status:string} [] = [];
  AdultdisplayedColumns: string[] = ['Nr.crt', 'Clinica', 'Pacient', 'Email', 'Telefon', 'Data', 'Ora', 'Specializare', 'Serviciu', 'Doctor', 'Mesaj', 'Status', 'Editează', 'Șterge'];
  public AdultdataSource:any;

  ngOnInit(): void {
    this.getAdultAppointments();
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
            this.AdultAppointmentsList.push({clinica: appointment.clinica, nume_pacient: appointment.nume_pacient, data: dateformat, ora: appointment.ora, email:appointment.email, telefon:appointment.telefon, specializare:appointment.specializare, serviciu: appointment.serviciu, doctor:appointment.doctor, mesaj:appointment.mesaj, status:appointment.status});
            this.AdultdataSource = new MatTableDataSource(this.AdultAppointmentsList);
          }
        });
      });
  }

  AddAppointment(){
    this.router.navigate(['/add-programari']);
  }

  EditAppointment(){
    this.router.navigate(['/edit-programari']);
  }

  DeleteAppointment(){

    
  }

  Back(){
    this.router.navigate(['/crud-programari']);
  }
}
