import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";


@Injectable({
    providedIn: 'root'
})
export class ProgramareAdultService{
    constructor(private firestore: AngularFirestore) {
       }


    sendProgramareAdult(programare:any){
      const programareRef:any = this.firestore.collection(`programari_adulti`);
      const ProgramareAdultData ={
        user_id: localStorage['uid'],
        nume_pacient: programare.nume_pacient,
        email: programare.email,
        telefon: programare.telefon,
        mesaj: programare.mesaj,
        data: programare.data,
        ora:programare.ora,
        clinica:programare.clinica,
        specializare:programare.specializare,
        serviciu:programare.serviciu,
        doctor:programare.doctor,
        status:programare.status
      };
      return programareRef.doc().set(ProgramareAdultData, {merge: true});
    }

    getSpecializations(id: string) : Promise<any> {
      let specializationList:any = [];
      return new Promise<any>((resolve)=> {
      this.firestore.collection('specializari', ref => ref.where('id_clinici', "array-contains", id )).get().subscribe(snapshot =>{
        snapshot.forEach((doc) => {
          const specialization: any = doc.data();
          specializationList.push({ id: doc.id, nume: specialization.nume, id_clinici: specialization.id_clinici});
        });
        resolve(specializationList);
      })
      })
    }

    getServices(id: string) : Promise<any> {
      let serviceList:any = [];
      return new Promise<any>((resolve)=> {
      this.firestore.collection('servicii', ref => ref.where('id_specializari', "==", id )).get().subscribe(snapshot =>{
        snapshot.forEach((doc) => {
          const service: any = doc.data();
          serviceList.push({ id: doc.id, nume: service.nume, id_specializari: service.id_specializari});
        });
        resolve(serviceList);
      })
      })
    }

    
    getDoctors(id:string, clinic_id:string): Promise<any>{
      let doctorList:any = [];
      return new Promise<any>((resolve)=> {
      this.firestore.collection('doctori', ref => ref.where('id_specializari', "array-contains", id)).get().subscribe(snapshot =>{
        snapshot.forEach((doc) => {
          const doctor: any = doc.data();
          if(doctor.id_clinici === clinic_id)
          doctorList.push({ id: doc.id, nume: doctor.nume, id_specializari: doctor.id_specializari, id_clinici:doctor.id_clinici});
        });
        resolve(doctorList);
      })
      })
    }
}
