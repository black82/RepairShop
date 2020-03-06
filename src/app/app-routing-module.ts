import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {DeviceinputComponent} from './component/deviceinput/deviceinput.component';
import {OtpoutDeviceComponent} from './component/otpout-device/otpout-device.component';
import {SearchpageComponent} from './component/searchpage/searchpage.component';


export const routers: Routes = [
  {path: '', component: HomeComponent},
  {path: 'input/client/device', component: DeviceinputComponent},
  {path: 'output/client/device', component: OtpoutDeviceComponent},
  {path: 'search/telephone/number', component: SearchpageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routers)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
