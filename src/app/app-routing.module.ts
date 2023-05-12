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
import { ProgramariAdultiComponent } from './component/dashboard/programari/programari-adulti.component';
import { IstoricProgramariComponent } from './component/dashboard/istoric-programari/istoric-programari.component';
import { ComparaServiciiComponent } from './component/dashboard/compara-servicii/compara-servicii.component';
import { AddProgramariComponent } from './component/admin/admin-dashboard/crud-programari/add-programari/add-programari.component';
import { EditProgramariComponent } from './component/admin/admin-dashboard/crud-programari/edit-programari/edit-programari.component';
import { ShowProgramariComponent } from './component/admin/admin-dashboard/crud-programari/show-programari/show-programari.component';
import { AdminDashboardComponent } from './component/admin/admin-dashboard/admin-dashboard.component';
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
import { ComparaDoctoriComponent } from './component/dashboard/compara-doctori/compara-doctori.component';
import { RoleGuard } from './guards/role.guard';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { AddReviewDoctoriComponent } from './component/dashboard/review-doctori/add-review-doctori/add-review-doctori.component';
import { ShowReviewDoctoriComponent } from './component/dashboard/review-doctori/show-review-doctori/show-review-doctori.component';
import { ShowReviewsDoctoriComponent } from './component/admin/admin-dashboard/crud-reviews-doctori/show-reviews-doctori/show-reviews-doctori.component';
import { EditReviewsDoctoriComponent } from './component/admin/admin-dashboard/crud-reviews-doctori/edit-reviews-doctori/edit-reviews-doctori.component';


const routes: Routes = [
  {pathMatch: 'full', path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},

  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  
  {path: 'compara-servicii', component: ComparaServiciiComponent, canActivate: [AuthGuard]},
  {path: 'istoric-programari', component: IstoricProgramariComponent, canActivate: [AuthGuard]},
  {path: 'programari-adulti', component: ProgramariAdultiComponent, canActivate: [AuthGuard]},
  {path: 'compara-doctori', component: ComparaDoctoriComponent, canActivate: [AuthGuard]},

  {path: 'add-review-doctori', component: AddReviewDoctoriComponent, canActivate: [AuthGuard]},
  {path: 'show-review-doctori', component: ShowReviewDoctoriComponent, canActivate: [AuthGuard]},

  

  {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminRoleGuard]},

  {path: 'add-programari', component: AddProgramariComponent, canActivate: [AuthGuard, AdminRoleGuard]},
  {path: 'edit-programari', component: EditProgramariComponent, canActivate: [AuthGuard, AdminRoleGuard]},
  {path: 'show-programari', component: ShowProgramariComponent, canActivate: [AuthGuard, AdminRoleGuard]},
  // {path: 'googlemap', component: GooglemapComponent, canActivate: [AuthGuard]},


  {path: 'add-users', component: AddUsersComponent, canActivate: [AuthGuard, AdminRoleGuard]},
  {path: 'edit-users', component: EditUsersComponent, canActivate: [AuthGuard, AdminRoleGuard]},
  {path: 'show-users', component: ShowUsersComponent, canActivate: [AuthGuard, AdminRoleGuard]},

  {path: 'add-clinici', component: AddCliniciComponent, canActivate: [AuthGuard, AdminRoleGuard]},
  {path: 'edit-clinici', component: EditCliniciComponent, canActivate: [AuthGuard, AdminRoleGuard]},
  {path: 'show-clinici', component: ShowCliniciComponent, canActivate: [AuthGuard, AdminRoleGuard]},

  {path: 'add-specializari', component: AddSpecializariComponent, canActivate: [AuthGuard, AdminRoleGuard]},
  {path: 'edit-specializari', component: EditSpecializariComponent, canActivate: [AuthGuard, AdminRoleGuard]},
  {path: 'show-specializari', component: ShowSpecializariComponent, canActivate: [AuthGuard, AdminRoleGuard]},

  {path: 'add-servicii', component: AddServiciiComponent, canActivate: [AuthGuard, AdminRoleGuard]},
  {path: 'edit-servicii', component: EditServiciiComponent, canActivate: [AuthGuard, AdminRoleGuard]},
  {path: 'show-servicii', component: ShowServiciiComponent, canActivate: [AuthGuard, AdminRoleGuard]},

  {path: 'add-doctori', component: AddDoctoriComponent, canActivate: [AuthGuard, AdminRoleGuard]},
  {path: 'edit-doctori', component: EditDoctoriComponent, canActivate: [AuthGuard, AdminRoleGuard]},

  {path: 'edit-reviews-doctori', component: EditReviewsDoctoriComponent, canActivate: [AuthGuard, AdminRoleGuard]},
  {path: 'show-reviews-doctori', component: ShowReviewsDoctoriComponent, canActivate: [AuthGuard, AdminRoleGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
