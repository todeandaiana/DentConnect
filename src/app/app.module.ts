import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { ProgramariAdultiComponent } from './component/dashboard/programari-adulti/programari-adulti.component';
import { ProgramariCopiiComponent } from './component/dashboard/programari-copii/programari-copii.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { IstoricProgramariComponent } from './component/dashboard/istoric-programari/istoric-programari.component';
import { ComparaServiciiComponent } from './component/dashboard/compara-servicii/compara-servicii.component';
import { AdminDashboardComponent } from './component/admin/admin-dashboard/admin-dashboard.component';
import { CrudUseriComponent } from './component/admin/admin-dashboard/crud-useri/crud-useri.component';
import { AddProgramariComponent } from './component/admin/admin-dashboard/crud-programari/add-programari/add-programari.component';
import { EditProgramariComponent } from './component/admin/admin-dashboard/crud-programari/edit-programari/edit-programari.component';
import { ShowProgramariComponent } from './component/admin/admin-dashboard/crud-programari/show-programari/show-programari.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
    HomeComponent,
    ProgramariAdultiComponent,
    ProgramariCopiiComponent,
    IstoricProgramariComponent,
    ComparaServiciiComponent,
    AddProgramariComponent,
    CrudUseriComponent,
    EditProgramariComponent,
    ShowProgramariComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    CoreModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatTabsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
