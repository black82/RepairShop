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
import {SerchRepairIdComponent} from './component/serch-repair-id/serch-repair-id.component';


export const routers: Routes = [
  {path: '', component: HomeComponent},
  {path: 'input/client/device', component: DeviceinputComponent, canActivate: [AutGuardService]},
  {path: 'output/client/device', component: OtpoutDeviceComponent, canActivate: [AutGuardService]},
  {path: 'search/telephone/number', component: SearchpageComponent, canActivate: [AutGuardService]},
  {path: 'client/sign-up', component: SignUpComponent},
  {path: 'client/sign-in', component: SignInComponent},
  {path: 'search/email', component: SearchEmailComponent, canActivate: [AutGuardService]},
  {path: 'search/repair/id', component: SerchRepairIdComponent, canActivate: [AutGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
