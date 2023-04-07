import { Component } from '@angular/core';

@Component({
  selector: 'app-programari-copii',
  templateUrl: './programari-copii.component.html',
  styleUrls: ['./programari-copii.component.css']
})
export class ProgramariCopiiComponent {
  programareCopil = {
    numePacient: '',
    numeInsotitor: '',
    email:'',
    telefon: '', 
    data_ora: '',
    mesaj:''
  }

  onSendChildAppointment(){

  }

  Back(){

  }

  submitChildForm() {
    console.log(this.programareCopil);
}
}
