import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IClinic } from 'src/app/shared/interfaces/clinic.interface';

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
    // this.getServices();
  }

  Back(){
    this.router.navigate(['/admin-dashboard']);
  }



}
