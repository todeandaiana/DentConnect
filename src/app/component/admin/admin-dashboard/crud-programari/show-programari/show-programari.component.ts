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
  AdultAppointmentsList: {id: string, clinica:string, nume_pacient: string, tip:string, nume_insotitor:string, email:string, telefon: string, data: string, ora:string, specializare:string, serviciu:string, doctor:string, mesaj:string,  status:string} [] = [];
  AdultdisplayedColumns: string[] = ['Nr.crt', 'Clinica', 'Pacient', 'Tip', 'Însoțitor', 'Email', 'Telefon', 'Data', 'Ora', 'Specializare', 'Serviciu', 'Doctor', 'Mesaj', 'Status', 'Editează', 'Șterge'];
  public AdultdataSource:any;
  public edit: boolean = false;
  public id:string;

  appointments: any[];

  ngOnInit(): void {
    this.getAdultAppointments();
  }

  constructor(private firestore: AngularFirestore, private router: Router) {
  }


  getAdultAppointments(){
    this.firestore
      .collection('programari_adulti')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const appointment: any = doc.data();
            const timestampFirebase=appointment.data;
            const date = timestampFirebase.toDate();
            const dateformat=date.getDate()+ '/' +(date.getMonth()+1) + '/' + date.getFullYear();
            this.AdultAppointmentsList.push({id: doc.id, clinica: appointment.clinica, nume_pacient: appointment.nume_pacient,tip:appointment.tip , nume_insotitor: appointment.nume_insotitor,data: dateformat, ora: appointment.ora, email:appointment.email, telefon:appointment.telefon, specializare:appointment.specializare, serviciu: appointment.serviciu, doctor:appointment.doctor, mesaj:appointment.mesaj, status:appointment.status});
            this.AdultdataSource = new MatTableDataSource(this.AdultAppointmentsList);          
        });
      });
  }

  AddAppointment(){
    this.router.navigate(['/add-programari']);
  }

  EditAppointment(appointment:any){
    console.log(appointment);
    this.router.navigate(['/edit-programari'], {state: {id:appointment.id}});
  }

  DeleteAppointment(appointment: any) : void {
    this.firestore.collection('programari_adulti').doc(appointment.id).delete();
    // this.getAdultAppointments();
  }


  Back(){
    this.router.navigate(['/admin-dashboard']);
  }
}
