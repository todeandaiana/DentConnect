import { Unsubscribe } from '@angular/fire/app-check';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';
import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore,AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(private fireauth : AngularFireAuth, private router: Router, private firestore: AngularFirestore) {
    this.setCurrentUser();
   }

  //login method
  login(email:string, password: string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( res=>{
      if(res.user)
        localStorage.setItem('uid', res.user.uid);

      if(res.user?.emailVerified == true) {
        this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/verify-email']);
      }
      this.setCurrentUser();
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
    const userRef:any = this.firestore.collection(`users`);
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
      this.currentUser$.next(undefined);
      localStorage.removeItem('uid');
      this.router.navigate(['/']);

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
      if(localStorage.getItem("uid")) {
        return true;
      }
      else {
        return false;
      }
  }

  private setCurrentUser() {
    const uid = localStorage.getItem("uid");
    if(uid){
      this.firestore.collection(`users`).doc(uid).get().subscribe(user => {
        console.log(user.data());
        this.currentUser$.next(user.data());
      })
    } else {
      this.currentUser$.next(undefined);
    }
     
  }
}
  

