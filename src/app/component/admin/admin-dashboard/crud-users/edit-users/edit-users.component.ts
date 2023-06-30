import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit{

  userForm: FormGroup;
  uid:string;

  ngOnInit(): void {
  }

  constructor(private router:Router, private firestore: AngularFirestore) {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    })

    this.uid=this.router.getCurrentNavigation().extras.state['id'];
    this.getUser();
  }

  getUser(){
    this.firestore.collection('users').doc(this.uid).get().subscribe( (doc) =>{
      const user:any = doc.data();
      this.userForm.patchValue({
        name:user.name,
        email:user.email
      })
    })
  }

  updateUser(){
    this.firestore.collection(`users`).doc(this.uid).update({
      name:this.userForm.value.name,
      email:this.userForm.value.email
    })
    .then( ()=> {
      this.router.navigate(["/show-users"]);
    })
    .catch( (error)=>{
      console.error(error);
    })
  }

  get f() {
    return this.userForm.controls;
  }

  onFormGroup() {
    console.log(this.userForm);
  }

  Back(){
    this.router.navigate(["/show-users"]);
  }

}
