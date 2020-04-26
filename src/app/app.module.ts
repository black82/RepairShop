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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PrintPageComponent} from './component/print-page/print-page.component';
import {CheckDeviceRepairActiveComponent} from './component/check-device-repair-active/check-device-repair-active.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {SignInComponent} from './component/sign-in/sign-in.component';
import {TokenInterceptor} from './component/service/TokenInterceptor';
import {HttpClien} from './component/service/clientservice.service';
import {SearchEmailComponent} from './component/search-email/search-email.component';


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
    AnimationWaitComponent,
    PrintPageComponent,
    CheckDeviceRepairActiveComponent,
    SignUpComponent,
    SignInComponent,
    SearchEmailComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [HttpClien,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
