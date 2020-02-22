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
import {SearchpageComponent} from './component/searchpage/searchpage.component';
import {AlertComponent} from './component/alert/alert.component';
import {AnimationWaitComponent} from './component/animation-wait/animation-wait.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DeviceinputComponent,
    OtpoutDeviceComponent,
    SingleContentComponent,
    SearchformComponent,
    SearchpageComponent,
    AlertComponent,
    AnimationWaitComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
