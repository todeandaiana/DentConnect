import { Injectable } from '@angular/core';
import { Unsubscribe } from '@angular/fire/app-check';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces/user.interface';
// import {
//   AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router: Router) { }

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
    // register(user: IUser){
    //   this.fireauth.createUserWithEmailAndPassword(user.email, user.password).then( res=> {
    //     this.SendVerficationEmail(res.user);
    //     const uid = res.user?.uid;
    //     const data= {
    //       email: user.email,
    //       name: user.name,
    //       roleAs: user.roleAs
    //     }
    //     const userRef = this.afs.doc(`users/${uid}`);
    //     userRef.set(data).then(() => {
    //       console.log("Works");
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
        
    //   }, err => {
    //     alert(err.message);
    //     this.router.navigate(['/register']);
    //   })
    // }

  //register method
  register(email:string, password:string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res=> {
      this.SendVerficationEmail(res.user);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
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
  

