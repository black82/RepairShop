import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {DeviceinputComponent} from './component/deviceinput/deviceinput.component';
import {OtpoutDeviceComponent} from './component/otpout-device/otpout-device.component';
import {SearchpageComponent} from './component/searchpage/searchpage.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {SignInComponent} from './component/sign-in/sign-in.component';
import {AutGuardService} from './component/service/aut-guard.service';
import {SearchEmailComponent} from './component/search-email/search-email.component';
import {SearchRepairIdComponent} from './component/serch-repair-id/search-repair-id.component';
import {LogServiceComponent} from './component/log-service/log-service.component';
import {AdminDashboardComponent} from './component/admin-dashboard/admin-dashboard.component';
import {EmailClientSendComponent} from './component/email-client-send/email-client-send.component';
import {DiviceTumorowComponent} from './component/divice-tumorow/divice-tumorow.component';
import {ExtendRepairComponent} from './component/extend-repair/extend-repair.component';
import {UserAdminComponent} from './component/user-admin/user-admin.component';
import {StatisticComponent} from './component/statistic/statistic.component';
import {AddNewDeviceComponent} from './component/add-new-device/add-new-device.component';
import {AddnewRepairComponent} from './component/addnew-repair/addnew-repair.component';


export const routers: Routes = [
  {path: '', component: HomeComponent},
  {path: 'input/client/device', component: DeviceinputComponent, canActivate: [AutGuardService]},
  {path: 'input/client/new/device', component: AddNewDeviceComponent, canActivate: [AutGuardService]},
  {path: 'input/client/new/repair', component: AddnewRepairComponent, canActivate: [AutGuardService]},
  {path: 'output/client/device', component: OtpoutDeviceComponent, canActivate: [AutGuardService]},
  {path: 'search/telephone/number', component: SearchpageComponent, canActivate: [AutGuardService]},
  {path: 'client/sign-up', component: SignUpComponent},
  {path: 'client/sign-in', component: SignInComponent},
  {path: 'search/email', component: SearchEmailComponent, canActivate: [AutGuardService]},
  {path: 'search/repair/id', component: SearchRepairIdComponent, canActivate: [AutGuardService]},
  {path: 'admin/logs/server', component: LogServiceComponent, canActivate: [AutGuardService]},
  {path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AutGuardService]},
  {path: 'admin/email/client/send', component: EmailClientSendComponent, canActivate: [AutGuardService]},
  {path: 'admin/device/preparation', component: DiviceTumorowComponent, canActivate: [AutGuardService]},
  {path: 'admin/repair/extend', component: ExtendRepairComponent, canActivate: [AutGuardService]},
  {path: 'admin/user', component: UserAdminComponent, canActivate: [AutGuardService]},
  {path: 'admin/statistic/repair', component: StatisticComponent, canActivate: [AutGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
