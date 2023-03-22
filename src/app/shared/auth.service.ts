import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

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
  }
  

