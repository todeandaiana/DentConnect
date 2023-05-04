import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { VerifyEmailComponent} from './component/verify-email/verify-email.component'
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ProgramariAdultiComponent } from './component/dashboard/programari-adulti/programari-adulti.component';
import { ProgramariCopiiComponent } from './component/dashboard/programari-copii/programari-copii.component';
import { IstoricProgramariComponent } from './component/dashboard/istoric-programari/istoric-programari.component';
import { ComparaServiciiComponent } from './component/dashboard/compara-servicii/compara-servicii.component';
import { AddProgramariComponent } from './component/admin/admin-dashboard/crud-programari/add-programari/add-programari.component';
import { EditProgramariComponent } from './component/admin/admin-dashboard/crud-programari/edit-programari/edit-programari.component';
import { ShowProgramariComponent } from './component/admin/admin-dashboard/crud-programari/show-programari/show-programari.component';
import { AdminDashboardComponent } from './component/admin/admin-dashboard/admin-dashboard.component';
import { GooglemapComponent } from './googlemap/googlemap.component';
import { AddProgramariCopiiComponent } from './component/admin/admin-dashboard/crud-programari-copii/add-programari-copii/add-programari-copii.component';
import { EditProgramariCopiiComponent } from './component/admin/admin-dashboard/crud-programari-copii/edit-programari-copii/edit-programari-copii.component';
import { ShowProgramariCopiiComponent } from './component/admin/admin-dashboard/crud-programari-copii/show-programari-copii/show-programari-copii.component';
import { AddServiciiComponent } from './component/admin/admin-dashboard/crud-servicii/add-servicii/add-servicii.component';
import { EditServiciiComponent } from './component/admin/admin-dashboard/crud-servicii/edit-servicii/edit-servicii.component';
import { ShowServiciiComponent } from './component/admin/admin-dashboard/crud-servicii/show-servicii/show-servicii.component';
import { AddUsersComponent } from './component/admin/admin-dashboard/crud-users/add-users/add-users.component';
import { EditUsersComponent } from './component/admin/admin-dashboard/crud-users/edit-users/edit-users.component';
import { ShowUsersComponent } from './component/admin/admin-dashboard/crud-users/show-users/show-users.component';
import { AddCliniciComponent } from './component/admin/admin-dashboard/crud-clinici/add-clinici/add-clinici.component';
import { EditCliniciComponent } from './component/admin/admin-dashboard/crud-clinici/edit-clinici/edit-clinici.component';
import { ShowCliniciComponent } from './component/admin/admin-dashboard/crud-clinici/show-clinici/show-clinici.component';
import { AddSpecializariComponent } from './component/admin/admin-dashboard/crud-specializari/add-specializari/add-specializari.component';
import { EditSpecializariComponent } from './component/admin/admin-dashboard/crud-specializari/edit-specializari/edit-specializari.component';
import { ShowSpecializariComponent } from './component/admin/admin-dashboard/crud-specializari/show-specializari/show-specializari.component';
import { AddDoctoriComponent } from './component/admin/admin-dashboard/crud-doctori/add-doctori/add-doctori.component';
import { EditDoctoriComponent } from './component/admin/admin-dashboard/crud-doctori/edit-doctori/edit-doctori.component';
import { ShowDoctoriComponent } from './component/admin/admin-dashboard/crud-doctori/show-doctori/show-doctori.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},

  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  
  {path: 'compara-servicii', component: ComparaServiciiComponent, canActivate: [AuthGuard]},
  {path: 'istoric-programari', component: IstoricProgramariComponent, canActivate: [AuthGuard]},
  {path: 'programari-adulti', component: ProgramariAdultiComponent, canActivate: [AuthGuard]},
  {path: 'programari-copii', component: ProgramariCopiiComponent, canActivate: [AuthGuard]},

  {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},

  {path: 'add-programari', component: AddProgramariComponent, canActivate: [AuthGuard]},
  {path: 'edit-programari', component: EditProgramariComponent, canActivate: [AuthGuard]},
  {path: 'show-programari', component: ShowProgramariComponent, canActivate: [AuthGuard]},
  // {path: 'googlemap', component: GooglemapComponent, canActivate: [AuthGuard]},

  {path: 'add-programari-copii', component: AddProgramariCopiiComponent, canActivate: [AuthGuard]},
  {path: 'edit-programari-copii', component: EditProgramariCopiiComponent, canActivate: [AuthGuard]},
  {path: 'show-programari-copii', component: ShowProgramariCopiiComponent, canActivate: [AuthGuard]},

  {path: 'add-users', component: AddUsersComponent, canActivate: [AuthGuard]},
  {path: 'edit-users', component: EditUsersComponent, canActivate: [AuthGuard]},
  {path: 'show-users', component: ShowUsersComponent, canActivate: [AuthGuard]},

  {path: 'add-clinici', component: AddCliniciComponent, canActivate: [AuthGuard]},
  {path: 'edit-clinici', component: EditCliniciComponent, canActivate: [AuthGuard]},
  {path: 'show-clinici', component: ShowCliniciComponent, canActivate: [AuthGuard]},

  {path: 'add-specializari', component: AddSpecializariComponent, canActivate: [AuthGuard]},
  {path: 'edit-specializari', component: EditSpecializariComponent, canActivate: [AuthGuard]},
  {path: 'show-specializari', component: ShowSpecializariComponent, canActivate: [AuthGuard]},

  {path: 'add-servicii', component: AddServiciiComponent, canActivate: [AuthGuard]},
  {path: 'edit-servicii', component: EditServiciiComponent, canActivate: [AuthGuard]},
  {path: 'show-servicii', component: ShowServiciiComponent, canActivate: [AuthGuard]},

  {path: 'add-doctori', component: AddDoctoriComponent, canActivate: [AuthGuard]},
  {path: 'edit-doctori', component: EditDoctoriComponent, canActivate: [AuthGuard]},
  {path: 'show-doctori', component: ShowDoctoriComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
