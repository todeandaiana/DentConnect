import { Component, EventEmitter, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-programari-copii',
  templateUrl: './show-programari-copii.component.html',
  styleUrls: ['./show-programari-copii.component.css']
})

export class ShowProgramariCopiiComponent {
  ChildAppointmentsList: {id:string, clinica:string, nume_pacient: string, varsta_pacient:string, nume_insotitor:string, data: string, ora:string, specializare:string, serviciu:string, doctor:string, mesaj:string, status:string} [] = [];
  ChilddisplayedColumns: string[] = ['Nr.crt', 'Clinica', 'Pacient', 'Vârstă pacient', 'Însoțitor', 'Data', 'Ora', 'Specializare', 'Serviciu', 'Doctor', 'Mesaj', 'Status', 'Editează', 'Șterge'];  
  public ChilddataSource:any;
  public edit: boolean = false;
  public id:string;

  @ViewChild('myTable') myTable!: MatTable<any>;

  appointments: any[];

  ngOnInit(): void {
    
  }

  constructor(private firestore: AngularFirestore, private router: Router) {
    this.getChildAppointments();
  }


  getChildAppointments(){
    this.firestore
      .collection('programari_copii')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const appointment: any = doc.data();
            const timestampFirebase=appointment.data;
            const date = timestampFirebase.toDate();
            const dateformat=date.getDate()+ '/' +(date.getMonth()+1) + '/' + date.getFullYear();
            this.ChildAppointmentsList.push({id: doc.id, clinica: appointment.clinica, nume_pacient: appointment.nume_pacient, varsta_pacient:appointment.varsta_pacient, nume_insotitor:appointment.nume_insotitor, data: dateformat, ora: appointment.ora, specializare:appointment.specializare, serviciu: appointment.serviciu, doctor:appointment.doctor, mesaj:appointment.mesaj, status:appointment.status});
            this.ChilddataSource = new MatTableDataSource(this.ChildAppointmentsList);          
        });
      });
  }

  AddAppointment(){
    this.router.navigate(['/add-programari-copii']);
  }

  EditAppointment(appointment:any){
    console.log(appointment);
    this.router.navigate(['/edit-programari-copii'], {state: {id:appointment.id}});
  }

  DeleteAppointment(appointment: any){
    this.firestore.collection('programari_copii').doc(appointment.id).delete().then( ()=> {
      this.myTable.renderRows();
    })
  }

  Back(){
    this.router.navigate(['/admin-dashboard']);
  }
}

