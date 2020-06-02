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
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {PrintPageComponent} from './component/print-page/print-page.component';
import {CheckDeviceRepairActiveComponent} from './component/check-device-repair-active/check-device-repair-active.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {SignInComponent} from './component/sign-in/sign-in.component';
import {TokenInterceptor} from './component/service/TokenInterceptor';
import {SearchEmailComponent} from './component/search-email/search-email.component';
import {DragfileComponent} from './component/dragfile/dragfile.component';
import {EmailModalComponent} from './component/email-madal/email-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {SigPadComponent} from './component/sig-pad/sig-pad.component';
import {SerchRepairIdComponent} from './component/serch-repair-id/serch-repair-id.component';
import {LogServiceComponent} from './component/log-service/log-service.component';
import {AdminDashboardComponent} from './component/admin-dashboard/admin-dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';


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
    SearchEmailComponent,
    DragfileComponent,
    EmailModalComponent,
    SigPadComponent,
    SerchRepairIdComponent,
    LogServiceComponent,
    AdminDashboardComponent
  ],
  imports: [
    NgbModule,
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatGridListModule

  ],
  providers: [HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
