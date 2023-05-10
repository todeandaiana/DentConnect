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

  // onSendUser(){
  //   this.newUser ={
  //     name: this.userForm.value.name,
  //     password: this.userForm.value.password,
  //     email:this.userForm.value.email,
  //     roleAs: 'customer'
  //   };
  //   this.sendUser(this.newUser);
  //   this.router.navigate(['/show-users']);
  // }

  // sendUser(user:any){
  //   const userRef:any = this.firestore.collection('users');
  //   const UserData ={
  //     name: user.name,
  //     email:user.email,
  //     password:user.password,
  //     roleAs:user.roleAs
  //   };
  //   return userRef.add(UserData).then((docRef:any) => {
  //     const uid = docRef.id;
  //     return userRef.doc(uid).update({uid: uid});
  //   }).catch((error:any) => {
  //     console.error("Eroare la salvarea documentului: ", error);
  //   });
  // }

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
      
      await this.registerUser(this.newUser); // așteptăm finalizarea înregistrării utilizatorului
      await this.resetPassword(this.newUser.email); // așteptăm finalizarea resetării parolei utilizatorului
  
      this.newUser = null;
      this.router.navigate(['/show-users']);
    } catch (error) {
      console.log('Error adding user:', error);
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

  // async registerUser(user: IUser) {
  //   try {
  //     const res = await this.fireauth.createUserWithEmailAndPassword(user.email, user.password);
  //     const uid = res.user?.uid;
  //     await this.setUserData(user, uid);
  //     console.log('User registered successfully!');
  //   } catch (error) {
  //     if (error === 'auth/email-already-in-use') {
  //       console.log('Error registering user:', error);
  //       throw new Error('Există deja un cont cu acest email!');
  //     } else {
  //       console.log('Error registering user:', error);
  //       throw new Error('Eroare la înregistrarea utilizatorului!');
  //     }
  //   }
  // }

  setUserData(user:any, uid: any){
    const userRef:any = this.firestore.collection(`users`);
    const userData ={
      uid: uid,
      email: user.email,
      // password: '', // setăm inițial parola la null
      name: user.name,
      roleAs: user.roleAs
    };
    // criptăm parola utilizând bcrypt.hash
    // return bcrypt.hash(user.password, 10).then((hash: string) => {
    //   userData.password = hash; // actualizăm parola cu hash-ul generat
      return userRef.doc(uid).set(userData, {merge: true});
  }

  async resetPassword(email: string) {
    try {
      await this.fireauth.sendPasswordResetEmail(email);
      console.log('Password reset email sent successfully!');
    } catch (error) {
      console.log('Error sending password reset email:', error);
      throw new Error('Eroare la trimiterea emailului de resetare a parolei!');
    }
  }

  // async resetPassword(user:IUser){
  //   return await this.fireauth.sendPasswordResetEmail(user.email).then(() => {
  //     return this.fireauth.signInWithEmailAndPassword(user.email, user.password).then(userCredential => {
  //       const uid = userCredential.user?.uid;
  //       return bcrypt.hash(user.password, 10).then((hash: string) => {
  //         const userData = { password: hash };
  //         return this.firestore.collection('users').doc(uid).update(userData);
  //       });
  //     });
  //   });
  // }
  
  
  
  


  // onAddUser() {
  //   try {
  //     this.newUser = {
  //       name: this.userForm.value.name,
  //       roleAs: 'customer',
  //       email: this.userForm.value.email,
  //       password: this.userForm.value.password,
  //     };
      
  //     this.registerUser(this.newUser); // așteptăm finalizarea înregistrării utilizatorului
  //     this.resetPassword(this.newUser); // așteptăm finalizarea resetării parolei utilizatorului
  
  //     this.newUser = null;
  //     this.router.navigate(['/show-users']);
  //   } catch (error) {
  //     console.log('Error adding user:', error);
  //   }
  // }
  

  // //register method
  // registerUser(user: IUser){
  //   this.fireauth.createUserWithEmailAndPassword(user.email, user.password).then( res=> {
  //     const uid = res.user?.uid;
  //       this.setUserData(user, uid);
  //     }, err => {
  //         if (err.code == "auth/email-already-in-use") {
  //           alert("Există un cont cu acest email!");
  //         }
  //         this.router.navigate(['/show-users']);
  //       })
  //     }

  //       //reset password
  //  resetPassword(user:IUser){
  //   this.fireauth.sendPasswordResetEmail(user.email);
  // }
  
  

    

}
