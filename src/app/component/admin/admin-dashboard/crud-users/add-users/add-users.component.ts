import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import * as passwordGenerator from 'password-generator';
import * as generatePassword from 'password-generator';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})


export class AddUsersComponent implements OnInit{

  newUser: IUser | null = null;

  userForm: FormGroup = new FormGroup ({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl( '', Validators.required),
      // role: new FormControl('customer', Validators.required),
  })

  ngOnInit(): void {
    
  }

  constructor(private router:Router, private firestore: AngularFirestore) {}


  generatePassword(){
    const password = Math.random().toString(36).slice(-8);
    return password;
  }

  onSendUser(){
    this.newUser ={
      name: this.userForm.value.name,
      password: this.userForm.value.password,
      email:this.userForm.value.email,
      roleAs: 'customer'
    };
    this.sendUser(this.newUser);
    this.router.navigate(['/show-users']);
  }

  sendUser(user:any){
    const userRef:any = this.firestore.collection('users');
    const UserData ={
      name: user.name,
      email:user.email,
      password:user.password,
      roleAs:user.roleAs
    };
    return userRef.add(UserData).then((docRef:any) => {
      const uid = docRef.id;
      return userRef.doc(uid).update({uid: uid});
    }).catch((error:any) => {
      console.error("Eroare la salvarea documentului: ", error);
    });
  }

  Back(){
    this.router.navigate(["/show-users"]);
  }

}
