import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-servicii',
  templateUrl: './show-servicii.component.html',
  styleUrls: ['./show-servicii.component.css']
})
export class ShowServiciiComponent implements OnInit{
  ServicesList: {id: string, nume:string, pret1:string, pret2:string, pret3:string} [] = [];
  ServicesdisplayedColumns: string[] = ['Nr.crt', 'Nume', 'Pret DentaPro Clinic', 'Pret Stomestet', 'Pret DentaLux Clinic', 'Editează', 'Șterge'];
  public ServicedataSource:any;
  public edit: boolean = false;
  public id:string;

  services: any[];

  ngOnInit(): void {
    this.getServices();
  }

  constructor(private firestore: AngularFirestore, private router: Router) {
  }


  getServices(){
    this.firestore
      .collection('servicii')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const service: any = doc.data();
            this.ServicesList.push({id: doc.id, nume: service.nume, pret1: service.pret1, pret2:service.pret2, pret3:service.pret3 });
            this.ServicedataSource = new MatTableDataSource(this.ServicesList);          
        });
      });
  }

  AddService(){
    this.router.navigate(['/add-servicii']);
  }

  EditService(service:any){
    this.router.navigate(['/edit-servicii'], {state: {id:service.id}});
  }

  DeleteService(service: any) : void {
    this.firestore.collection('servicii').doc(service.id).delete();
    // this.getServices();
  }


  Back(){
    this.router.navigate(['/admin-dashboard']);
  }
}

