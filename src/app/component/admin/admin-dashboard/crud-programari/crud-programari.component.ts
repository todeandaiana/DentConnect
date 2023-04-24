import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-programari',
  templateUrl: './crud-programari.component.html',
  styleUrls: ['./crud-programari.component.css']
})
export class CrudProgramariComponent implements OnInit{


  ngOnInit(): void {
    
  }

  constructor(private router: Router){}

  OnShowAdultAppointments(){
    this.router.navigate(['/show-programari']);
  }

  OnShowChildAppointment(){
    
  }


}
