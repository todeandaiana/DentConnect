import { Router } from '@angular/router';
import { IUser } from '../interfaces/user.interface';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import * as bcrypt from 'bcryptjs';


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
    this.fireauth.signInWithEmailAndPassword(email,password).then(res=>{
      console.log(res.user);
      if(res.user)
        localStorage.setItem('uid', res.user.uid);

      if(res.user?.emailVerified == false) {
        this.router.navigate(['/verify-email']);
      }
      else{
          // this.router.navigate(["/dashboard"]);
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
      password: '', // setăm inițial parola la null
      name: user.name,
      roleAs: user.roleAs
    };
    // criptăm parola utilizând bcrypt.hash
    return bcrypt.hash(user.password, 10).then((hash: string) => {
      userData.password = hash; // actualizăm parola cu hash-ul generat
      return userRef.doc(uid).set(userData, {merge: true});
    });
  }

  //sign out
  logout(){
    this.fireauth.signOut().then( () => {
      this.currentUser$.next(undefined);
      localStorage.clear();
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
        const loggedin:any=user.data();
        localStorage.setItem("role", loggedin.roleAs);
        if(loggedin.roleAs === 'customer'){
            this.router.navigate(["/dashboard"]);
          }else {
            if(loggedin.roleAs === 'admin'){
              this.router.navigate(["/admin-dashboard"]);
            }
            else {
              this.router.navigate(["/"]);
            }
          }
      })
    } else {
      this.currentUser$.next(undefined);
    }
  }
}
  

