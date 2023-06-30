import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vizualizare-doctori',
  templateUrl: './vizualizare-doctori.component.html',
  styleUrls: ['./vizualizare-doctori.component.css']
})
export class VizualizareDoctoriComponent {

  DoctorsList: {id: string, nume:string, id_specializari:string[], id_clinica:string } [] = [];
  DoctorsdisplayedColumns: string[] = ['Nr.crt', 'Nume', 'Clinica', 'Specializari', 'Nota', ' '];
  clinicsList: any[] =[];
  specializationsList:any[] =[];
  reviewsList:any[] =[];
  selectedDoctor: string = '';

  public DoctordataSource:any;
  public edit: boolean = false;
  public id:string;
  public panelOpenState = false;
  public showPanel = false;

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

  DisplayMedia(index: number) {
    let suma:number=0;
    const doctorReviews :any[] = this.reviewsList.filter(review => review.doctor == this.DoctorsList[index].nume)
    
    if(doctorReviews.length === 0){
      return 0;
    }

    suma = doctorReviews.reduce((acc, review) => acc + Number(review.nota), 0);
    return suma/doctorReviews.length;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.DoctordataSource.filter = filterValue.trim();
  }

  Back(){
    this.router.navigate(['/dashboard']);
  }

  displayPanel(index: number) {
    this.showPanel = true;
    this.selectedDoctor = this.DoctorsList[index].nume;
  }

  onClose() {
    this.showPanel = false;
  }
}
