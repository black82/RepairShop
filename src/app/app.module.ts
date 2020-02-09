import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {HomeComponent} from './component/home/home.component';
import {AppRoutingModule} from './app-routing-module';
import {DeviceinputComponent} from './component/deviceinput/deviceinput.component';
import {OtpoutDeviceComponent} from './component/otpout-device/otpout-device.component';
import {SingleContentComponent} from './component/single-content/single-content.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SearchformComponent} from './component/searchform/searchform.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DeviceinputComponent,
    OtpoutDeviceComponent,
    SingleContentComponent,
    SearchformComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
