import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {HomeComponent} from './component/home/home.component';
import {AppRoutingModule, routes} from './app-routing-module';
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
import {EmailModalComponent} from './component/email-modal/email-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {SigPadComponent} from './component/sig-pad/sig-pad.component';
import {SearchRepairIdComponent} from './component/serch-repair-id/search-repair-id.component';
import {LogServiceComponent} from './component/log-service/log-service.component';
import {AdminDashboardComponent} from './component/admin-dashboard/admin-dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {StatisticComponent} from './component/statistic/statistic.component';
import {EmailClientSendComponent} from './component/email-client-send-admin/email-client-send.component';
import {DiviceTumorowComponent} from './component/divice-tumorow/divice-tumorow.component';
import {ExtendRepairComponent} from './component/extend-repair/extend-repair.component';
import {ExtendDateRepairComponent} from './component/extend-date-repair/extend-date-repair.component';
import {UserAdminComponent} from './component/user-admin/user-admin.component';
import {StatisticRepairComponent} from './component/statistic-repair/statistic-repair.component';
import {AppComponent} from './app.component';
import {ChartModule} from 'primeng';
import {StatisticModelPartsComponent} from './component/statistic-model-parts/statistic-model-parts.component';
import {AddNewDeviceComponent} from './component/add-new-device/add-new-device.component';
import {AddnewRepairComponent} from './component/addnew-repair/addnew-repair.component';
import {WebSocketService} from './component/service/WebSocketService';
import {NotificationComponent} from './component/notification/notification.component';
import {NotifaiManageComponent} from './component/notifai-manage/notifai-manage.component';
import {EndRepairNotificationComponent} from './component/end-repair-notification/end-repair-notification.component';
import {SmsSenderComponent} from './component/sms-sender/sms-sender.component';
import {EmailNotificationComponent} from './component/email-notification/email-notification.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {AutocompletComponent} from './component/autocomplet/autocomplet.component';
import {NumberRepairComponent} from './component/number-repair/number-repair.component';
import {EditRepairComponent} from './component/edit-repair/edit-repair.component';
import {PaginatorAllRepairComponent} from './component/paginator-all-repair/paginator-all-repair.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {SendRedactPasswordRequestComponent} from './component/send-redact-password-request/send-redact-password-request.component';
import {EditPassworComponent} from './component/edit-passwor/edit-passwor.component';
import {ClientPaginatorDateComponent} from './component/client-paginator-date/client-paginator-date.component';
import {MessageAdminComponent} from './component/message-admin/message-admin.component';
import {DragOnDropRepairComponent} from './component/drag-on-drop-repair/drag-on-drop-repair.component';
import {RouterModule} from '@angular/router';
import {DeviceSellComponent} from './component/device-sell/device-sell.component';
import {DeviceBayComponent} from './component/device-bay/device-bay.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {PageableDeviceSaleComponent} from './component/pageable-device-sale/pageable-device-sale.component';
import {RepairDashboardComponent} from './component/repair-dashboard/repair-dashboard.component';
import {ShopDashboardComponent} from './component/shop-dashboard/shop-dashboard.component';
import {SinglDeviceShouwComponent} from './component/singl-device-shouw/singl-device-shouw.component';
import {SingleDeviceForSaleComponent} from './component/single-divice-forsale/single-device-for-sale.component';
import {DeviceSaleByIdComponent} from './component/device-sale-by-id/device-sale-by-id.component';
import {DeviceSalePaginatorComponent} from './component/device-sale-paginator/device-sale-paginator.component';
import {AllDeviceSaleComponent} from './component/all-device-sale/all-device-sale.component';
import {AllDeviceInSaleComponent} from './component/all-device-in-sale/all-device-in-sale.component';

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
    SearchRepairIdComponent,
    LogServiceComponent,
    AdminDashboardComponent,
    StatisticComponent,
    EmailClientSendComponent,
    DiviceTumorowComponent,
    ExtendRepairComponent,
    ExtendDateRepairComponent,
    UserAdminComponent,
    StatisticRepairComponent,
    StatisticModelPartsComponent,
    AddNewDeviceComponent,
    AddnewRepairComponent,
    NotificationComponent,
    NotifaiManageComponent,
    EndRepairNotificationComponent,
    SmsSenderComponent,
    EmailNotificationComponent,
    AutocompletComponent,
    NumberRepairComponent,
    EditRepairComponent,
    PaginatorAllRepairComponent,
    SendRedactPasswordRequestComponent,
    EditPassworComponent,
    ClientPaginatorDateComponent,
    MessageAdminComponent,
    DragOnDropRepairComponent,
    DeviceSellComponent,
    DeviceBayComponent,
    NotFoundComponent,
    PageableDeviceSaleComponent,
    RepairDashboardComponent,
    ShopDashboardComponent,
    SinglDeviceShouwComponent,
    SingleDeviceForSaleComponent,
    DeviceSaleByIdComponent,
    DeviceSalePaginatorComponent,
    AllDeviceSaleComponent,
    AllDeviceInSaleComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
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
    MatGridListModule,
    ChartModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatPaginatorModule
  ],
  providers: [WebSocketService, HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
