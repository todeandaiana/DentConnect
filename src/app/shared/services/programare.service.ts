import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";


@Injectable({
    providedIn: 'root'
})
export class ProgramareAdultService{
    constructor(private firestore: AngularFirestore) {
       }


    sendProgramare(programare:any){
      const programareRef:any = this.firestore.collection(`programari_adulti`);
      const ProgramareData ={
        user_id: localStorage['uid'],
        nume_pacient: programare.nume_pacient,
        tip:programare.tip,
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
      return programareRef.add(ProgramareData).then((docRef:any) => {
        const id_programare = docRef.id;
        return programareRef.doc(id_programare).update({id_programare: id_programare});
      }).catch((error:any) => {
        console.error("Eroare la salvarea documentului: ", error);
      });
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
      this.firestore.collection('serviciii', ref => ref.where('id_specializare', "==", id )).get().subscribe(snapshot =>{
        snapshot.forEach((doc) => {
          const service: any = doc.data();
          serviceList.push({ id: doc.id, nume: service.nume, id_specializari: service.id_specializare});
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
          if(doctor.id_clinica === clinic_id)
          doctorList.push({ id: doc.id, nume: doctor.nume, id_specializari: doctor.id_specializari, id_clinici:doctor.id_clinica});
        });
        resolve(doctorList);
      })
      })
    }
}
