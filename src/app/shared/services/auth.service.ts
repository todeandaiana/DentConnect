import { Unsubscribe } from '@angular/fire/app-check';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';
import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore,AngularFirestoreDocument,} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router: Router, private firestore: AngularFirestore) { }

  //login method
  login(email:string, password: string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( res=>{
      localStorage.setItem('token', 'true');

      if(res.user?.emailVerified == true) {
        this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/verify-email']);
      }

    }, err=>{
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

    //register method
    register(user: IUser){
      this.fireauth.createUserWithEmailAndPassword(user.email, user.password).then( res=> {
        const uid = res.user?.uid;
        this.setUserData(user, uid)
        this.SendVerficationEmail(res.user);
      }, err => {
        alert(err.message);
        this.router.navigate(['/register']);
      })
    }

  setUserData(user:any, uid: any){
    const userRef:any =this.firestore.collection(`users`);
    const userData ={
      uid: uid,
      email: user.email,
      name: user.name,
      roleAs: user.roleAs
    };
    return userRef.doc(uid).set(userData, {merge: true});

  }

  //sign out
  logout(){
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);

    }, err => {
      alert(err.message);
    })
  }

  //forgot password
  forgotPassword(email:string){
    this.fireauth.sendPasswordResetEmail(email).then( ()=> {
      this.router.navigate(['/reset-password']);

    }, err => {
      alert('Something went wrong!');
    })

  }

  //email verification pt register
  SendVerficationEmail(user: any){
    this.fireauth.currentUser.then(u => u?.sendEmailVerification())
      .then(() =>{
        this.router.navigate(['/verify-email']);
      }, (err: any) =>{
          alert('Something Went Wrong. Not able to send mail to registered Email.');
      })

  }

  currentUserState() : boolean {
      if(localStorage.getItem("token")) {
        return true;
      }
      else {
        return false;
      }
  }
}
  

