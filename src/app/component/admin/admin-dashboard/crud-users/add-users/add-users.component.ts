import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})

export class AddUsersComponent implements OnInit{

  newUser: IUser | null = null;
  generatedPassword:string;

  userForm: FormGroup = new FormGroup ({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl( '', Validators.required),
  })

  ngOnInit(): void {
    this.generatedPassword = this.generatePassword();
  }

  constructor(private router:Router, private firestore: AngularFirestore, private fireauth : AngularFireAuth) {}

  generatePassword(): string {
    const password = Math.random().toString(36).slice(-8);
    return password;
  }

  Back(){
    this.router.navigate(["/show-users"]);
  }


  async onAddUser() {
    try {
      this.newUser = {
        name: this.userForm.value.name,
        roleAs: 'customer',
        email: this.userForm.value.email,
        password: this.generatedPassword,
      };
      
      await this.registerUser(this.newUser); 
      await this.resetPassword(this.newUser.email); 
  
      this.newUser = null;
      this.router.navigate(['/show-users']);
    } catch (error) {
      console.log('Eroare la adăugarea utilizatorului:', error);
    }
  }

  async registerUser(user: IUser){
    await this.fireauth.createUserWithEmailAndPassword(user.email, user.password).then( res=> {
      const uid = res.user?.uid;
      this.setUserData(user, uid)
    }, err => {
      if (err.code == "auth/email-already-in-use") {
        alert("Există un cont cu acest email!");
      }
      this.router.navigate(['/register']);
    })
  }

  setUserData(user:any, uid: any){
    const userRef:any = this.firestore.collection(`users`);
    const userData ={
      uid: uid,
      email: user.email,
      name: user.name,
      roleAs: user.roleAs
    };
    return userRef.doc(uid).set(userData, {merge: true});
  }

  async resetPassword(email: string) {
    try {
      await this.fireauth.sendPasswordResetEmail(email);
    } catch (error) {
      throw new Error('Eroare la trimiterea emailului de resetare a parolei!');
    }
  }

}
