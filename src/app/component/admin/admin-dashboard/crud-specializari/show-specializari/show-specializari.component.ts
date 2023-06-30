import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-specializari',
  templateUrl: './show-specializari.component.html',
  styleUrls: ['./show-specializari.component.css']
})
export class ShowSpecializariComponent implements OnInit{
  SpecializationsList: {id:string, nume:string, id_clinici:string[]} [] =[];
  SpecializationsdisplayedColumns: string[] =['Nr.crt', 'Nume', 'Clinici', 'Editează', 'Șterge'];
  clinicsList: any[] =[];

  public SpecializationdataSource:any;
  public edit: boolean = false;
  public id:string;

  ngOnInit(): void {
    this.getSpecializations();
    this.getClinics();
  }

  constructor(private firestore: AngularFirestore, private router: Router) {
  }

  getSpecializations(){
    this.firestore
      .collection('specializari')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const specialization: any = doc.data();
            this.SpecializationsList.push({id: doc.id, nume: specialization.nume, id_clinici:specialization.id_clinici});
            this.SpecializationdataSource = new MatTableDataSource(this.SpecializationsList);          
        });
      });
  }

    getClinics(){
    this.firestore.collection('clinici').valueChanges().subscribe(clinics => {
      this.clinicsList = clinics;
    })
  }

  DisplayClinic(clinic:any, clinicsId: any[]){
    return clinicsId.includes(clinic.id_clinica);
  }


  AddSpecialization(){
    this.router.navigate(['/add-specializari']);
  }

  EditSpecialization(specialization:any){
    this.router.navigate(['/edit-specializari'], {state: {id:specialization.id}});
  }

  DeleteSpecialization(specialization: any) : void {
    this.firestore.collection('specializari').doc(specialization.id).delete();

    this.firestore.collection('serviciii').get().subscribe(snapshot => {
      snapshot.forEach((doc: any) => {
        const serviciuRef = this.firestore.doc(`serviciii/${doc.id}`); 
        const data:any = doc.data();
        if (data.id_specializare == specialization.id) {
          serviciuRef.delete();
        }
      });
    });

    this.firestore.collection('doctori', ref => ref.where('id_specializari', "array-contains", specialization.id)).get().subscribe(snapshot => {
      snapshot.forEach( (doc:any) => {
        const doctorRef = this.firestore.doc(`doctori/${doc.id}`);
        const data:any = doc.data();
        if(data.id_specializari.length ===1){
          doctorRef.delete();
        }else {
          data.id_specializari=data.id_specializari.filter((specializationId:any)=>specializationId !== specialization.id);
        }
      })
    });

    this.firestore.collection('programari_adulti', ref => ref.where('specializare', "==", specialization.nume)).get().subscribe(snapshot => {
      snapshot.forEach( (doc:any) => {
        const programareRef = this.firestore.doc(`programari_adulti/${doc.id}`);
        const today = new Date();
        const info:any = doc.data();
        const appointmentDate:Date =new Date(info.data);
        if(appointmentDate>today){
          programareRef.delete();
        }
      })
    });
  }

  Back(){
    this.router.navigate(['/admin-dashboard']);
  }

}
