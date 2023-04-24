import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { IProgramareAdult } from '../interfaces/programareAdult.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // AdultAppointmentsRef: AngularFireList<any>;
  // AdultAppointmentRef: AngularFireObject<any>;

  appointment: AngularFirestoreDocument<any>;
  }

  
  // //create appointment
  // AddAppointment( appointment: IProgramareAdult){
  //   this.AdultAppointmentsRef.push({
  //     nume_pacient: appointment.nume_pacient,
  //     email: appointment.email,
  //     telefon: appointment.telefon,
  //     data:appointment.data,
  //     ora:appointment.ora,
  //     clinica:appointment.clinica,
  //     specializare: appointment.specializare,
  //     serviciu: appointment.serviciu,
  //     doctor:appointment.doctor,
  //     mesaj: appointment.mesaj,
  //     status: appointment.status
  //   })
  // }

  // GetAppointment(id:string){
  //   this.AdultAppointmentRef=this.db.object('programari_adulti/' +id);
  //   return this.AdultAppointmentRef;
  // }

  // //fetch appointment list
  // GetAppointmentsList(appointment: IProgramareAdult){
  //   this.AdultAppointmentsRef = this.db.list('programari_adulti');
  //   return this.AdultAppointmentRef;
  // }

  // UpdateAppointment( appointment: IProgramareAdult){
  //   this.AdultAppointmentRef.update({
  //     nume_pacient: appointment.nume_pacient,
  //     email: appointment.email,
  //     telefon: appointment.telefon,
  //     data:appointment.data,
  //     ora:appointment.ora,
  //     clinica:appointment.clinica,
  //     specializare: appointment.specializare,
  //     serviciu: appointment.serviciu,
  //     doctor:appointment.doctor,
  //     mesaj: appointment.mesaj,
  //     status: appointment.status
  //   })
  // }

  // //delete app
  // DeleteAppointment(id:string){
  //   this.AdultAppointmentRef = this.db.object('programari_adulti/' +id);
  //   this.AdultAppointmentRef.remove();
  // }

