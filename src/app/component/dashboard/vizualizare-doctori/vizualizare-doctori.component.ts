import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IPrice } from 'src/app/shared/interfaces/price.interface';

@Component({
  selector: 'app-vizualizare-doctori',
  templateUrl: './vizualizare-doctori.component.html',
  styleUrls: ['./vizualizare-doctori.component.css']
})
export class VizualizareDoctoriComponent {

  DoctorsList: {id: string, nume:string, id_specializari:string[], id_clinica:string } [] = [];
  DoctorsdisplayedColumns: string[] = ['Nr.crt', 'Nume', 'Clinica', 'Specializari', 'Nota'];
  clinicsList: any[] =[];
  specializationsList:any[] =[];
  reviewsList:any[] =[];

  public DoctordataSource:any;
  public edit: boolean = false;
  public id:string;
  public panelOpenState = false;

  services: any[];

  ngOnInit(): void {
    this.getClinics();
    this.getSpecializations();
    this.getReviews();
    this.getDoctors();
 }

  constructor(private firestore: AngularFirestore, private router: Router) {
  }

  getClinics(){
    this.firestore.collection('clinici').valueChanges().subscribe(clinics => {
      this.clinicsList = clinics;
    })
  }

  getSpecializations(){
    this.firestore.collection('specializari').valueChanges().subscribe(specializations => {
      this.specializationsList = specializations;
    })
  }

  getReviews(){
    this.firestore.collection('recenzii').valueChanges().subscribe(reviews => {
      this.reviewsList = reviews;
    })
  }


  getDoctors(){
    this.firestore.collection('doctori').get().subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const doctor: any = doc.data();
            this.DoctorsList.push({id: doc.id, nume: doctor.nume, id_specializari:doctor.id_specializari, id_clinica:doctor.id_clinica});
            this.DoctordataSource = new MatTableDataSource(this.DoctorsList);          
        });
      });
  }

  DisplaySpecialization(specialization:any, specializationsId: any[]){
    return specializationsId.some(value => value === specialization.id_specializare);
  }

  DisplayClinic(clinic:any, clinicId: string){
    return clinicId === clinic.id_clinica;
  }

  DisplayNota(review:any, doctor:string){
    return doctor === review.doctor;
  }

  MarkExists(doctor:any, review:any){
    return doctor.nume === review.doctor;
  }

  AllMarks(doctor:any, review:any) :any[]{
    const note:any[]=[];
    if (review.doctor === doctor && review.nota){
      note.push(review.nota);
    }
    return note;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.DoctordataSource.filter = filterValue.trim();
  }

  Back(){
    this.router.navigate(['/dashboard']);
  }
}
