import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ComparaServiciitService{
    constructor(private fireauth : AngularFireAuth, private router: Router, private firestore: AngularFirestore) {}
       
getServices(id: string) : Promise<any> {
    let serviceList:any = [];
    return new Promise<any>((resolve)=> {
    this.firestore.collection('servicii', ref => ref.where('id_specializari', "==", id )).get().subscribe(snapshot =>{
      snapshot.forEach((doc) => {
        const service: any = doc.data();
        serviceList.push({ id: doc.id, nume: service.nume, pret1: service.pret1, pret2:service.pret2, pret3: service.pret3});
      });
      resolve(serviceList);
    })
    })
  }
}