import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent {

  UsersList: {id:string, name:string, email:string} []= [];
  UsersdisplayedColumns: string[] = ['Nr.crt', 'Nume', 'Email', 'Editează', 'Șterge'];

  public UserdataSource:any;
  public edit: boolean = false;
  public id:string;

  ngOnInit(): void {
    this.getUsers();
  }

  constructor(private firestore: AngularFirestore, private router: Router) {
  }

  getUsers(){
    this.firestore
      .collection('users')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const user: any = doc.data();
            this.UsersList.push({id: doc.id, name: user.name, email:user.email});
            this.UserdataSource = new MatTableDataSource(this.UsersList);          
        });
      });
  }

  
  AddUser(){
    this.router.navigate(['/add-users']);
  }

  EditUser(user:any){
    this.router.navigate(['/edit-users'], {state: {id:user.id}});
  }

  DeleteUser(user: any) : void {
    this.firestore.collection('users').doc(user.id).delete();
  }

  Back(){
    this.router.navigate(['/admin-dashboard']);
  }



}



