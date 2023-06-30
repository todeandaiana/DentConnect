import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-clinici',
  templateUrl: './show-clinici.component.html',
  styleUrls: ['./show-clinici.component.css']
})
export class ShowCliniciComponent implements OnInit{

  ClinicsList: {id:string, nume:string, CUI:string, adresa:string, program:string, telefon:string} []= [];
  ClinicsdisplayedColumns: string[] = ['Nr.crt', 'Nume', 'CUI', 'Adresa', 'Program', 'Telefon', 'Editează', 'Șterge'];

  public ClinicdataSource:any;
  public edit: boolean = false;
  public id:string;

  ngOnInit(): void {
    this.getClinics();
  }

  constructor(private firestore: AngularFirestore, private router: Router) {
  }

  getClinics(){
    this.firestore
      .collection('clinici')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const clinic: any = doc.data();
            this.ClinicsList.push({id: doc.id, nume: clinic.nume, CUI:clinic.CUI, adresa:clinic.adresa, program:clinic.program, telefon:clinic.telefon});
            this.ClinicdataSource = new MatTableDataSource(this.ClinicsList);          
        });
      });
  }

  AddClinic(){
    this.router.navigate(['/add-clinici']);
  }

  EditClinic(clinic:any){
    this.router.navigate(['/edit-clinici'], {state: {id:clinic.id}});
  }

  DeleteClinic(clinic: any) : void {
    this.firestore.collection('clinici').doc(clinic.id).delete();

    this.firestore.collection('specializari', ref => ref.where('id_clinici', "array-contains", clinic.id)).get().subscribe(snapshot => {
      snapshot.forEach( (doc:any) => {
        const specializareRef = this.firestore.doc(`specializari/${doc.id}`);
        const data:any = doc.data();
        if(data.id_clinici.length ===1){
          specializareRef.delete();
        }else {
          data.id_clinici=data.id_clinici.filter((clinicId:any)=>clinicId !== clinic.id);
        }
        
      })
    });
    
    this.firestore.collection('serviciii').get().subscribe(snapshot => {
      snapshot.forEach( (doc:any) => {
        const serviciuRef = this.firestore.doc(`serviciii/${doc.id}`);
        const data:any = doc.data();
        if(data.preturi.length ===1){
          serviciuRef.delete();
        }
        else {
          data.preturi=data.preturi.filter((pret:any)=>pret.id_clinica !== clinic.id);
        }
      })
    });

    this.firestore.collection('doctori').get().subscribe(snapshot => {
      snapshot.forEach((doc: any) => {
        const doctorRef = this.firestore.doc(`doctori/${doc.id}`); 
        const data:any = doc.data();
        if (data.id_clinica == clinic.id) {
          doctorRef.delete();
        }
      });
    });

    this.firestore.collection('programari_adulti', ref => ref.where('clinica', "==", clinic.nume)).get().subscribe(snapshot => {
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
