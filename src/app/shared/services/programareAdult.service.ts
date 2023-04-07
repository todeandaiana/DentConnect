import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { IProgramareAdult } from "../interfaces/programareAdult.interface";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class ProgramareAdultService{
    constructor(private fireauth : AngularFireAuth, private router: Router, private firestore: AngularFirestore, private authService: AuthService) {}
    
    sendProgramareAdult(programare:any){
      const programareRef:any = this.firestore.collection(`programari_adulti`);
      const ProgramareAdultData ={
        user_id: localStorage['uid'],
        nume_pacient: programare.nume_pacient,
        email: programare.email,
        telefon: programare.telefon,
        detalii: programare.detalii,
        data: programare.data,
        ora:programare.ora,
        clinica:programare.clinica
      };
      return programareRef.doc().set(ProgramareAdultData, {merge: true});
    }

    getSpecializations(id: string) : Promise<any> {
      return new Promise<any>((resolve)=> {
        this.firestore.collection('specializari', ref => ref.where('id_clinici', "array-contains", id)).valueChanges().subscribe(specialization => resolve(specialization))
        })
    }
}

