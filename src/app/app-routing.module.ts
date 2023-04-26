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
  {path: 'admin-dashboard', component: AdminDashboardComponent},
  {path: 'add-programari', component: AddProgramariComponent},
  {path: 'edit-programari', component: EditProgramariComponent},
  {path: 'show-programari', component: ShowProgramariComponent},
  {path: 'googlemap', component: GooglemapComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
