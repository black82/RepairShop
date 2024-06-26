import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';


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
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {PrintPageComponent} from './component/print-page/print-page.component';
import {
  CheckDeviceRepairActiveComponent
} from './component/check-device-repair-active/check-device-repair-active.component';
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
import {
  SendRedactPasswordRequestComponent
} from './component/send-redact-password-request/send-redact-password-request.component';
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
import {SingleDeviceForSaleComponent} from './component/single-divice-forsale/single-device-for-sale.component';
import {DeviceSaleByIdComponent} from './component/device-sale-by-id/device-sale-by-id.component';
import {DeviceSalePaginatorComponent} from './component/device-sale-paginator/device-sale-paginator.component';
import {AllDeviceSaleComponent} from './component/all-device-sale/all-device-sale.component';
import {AllDeviceInSaleComponent} from './component/all-device-in-sale/all-device-in-sale.component';
import {RedactClientComponent} from './component/redact-client/redact-client.component';
import {SearchByNameComponent} from './component/search-by-name/search-by-name.component';
import {
  SearchByNameClientRepairComponent
} from './component/search-by-name-client-repair/search-by-name-client-repair.component';
import {SearchByNameSaleComponent} from './component/search-by-name-sale/search-by-name-sale.component';
import {RedactClientSaleComponent} from './component/redact-client-sale/redact-client-sale.component';
import {
  RedactClientsaleRedacandformComponent
} from './component/redact-clientsale-redacandform/redact-clientsale-redacandform.component';
import {InvoiceModelComponent} from './component/invoice-model/invoice-model.component';
import {InvoiceRepairRedactComponent} from './component/invoice-repair-redact/invoice-repair-redact.component';
import {InvoiceShopRedactComponent} from './component/invoice-shop-redact/invoice-shop-redact.component';
import {StatisticStaffUsersComponent} from './component/statistic-staff-users/statistic-staff-users.component';
import {
  StatisticStaffUsersShopComponent
} from './component/statistic-staff-users-shop/statistic-staff-users-shop.component';
import {RedactStaffUserComponent} from './component/redact-staff-user/redact-staff-user.component';
import {
  StaffUserComponentDialogComponent
} from './component/staff-user-component-dialog/staff-user-component-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpXSRFInterceptor} from './component/service/HttpXSRFInterceptor';
import {AddNewOrderComponent} from './component/add-new-order/add-new-order.component';
import {ClouseOrderComponent} from './component/clouse-order/clouse-order.component';
import {ClouseOrderFormComponent} from './component/clouse-order-form/clouse-order-form.component';
import {AllOrderPaginatorComponent} from './component/all-order-paginator/all-order-paginator.component';
import {SparePaginationComponent} from './component/spare-pagiantor/spare-pagination.component';
import {SpareAllComponent} from './component/spare-all/spare-all.component';
import {SpareRedactComponentComponent} from './component/spare-redact-component/spare-redact-component.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

import {ChartModule} from 'primeng/chart';
import {MatMenuModule} from '@angular/material/menu';
import {SpareOutPagiComponent} from './component/spare-out-pagi/spare-out-pagi.component';
import {SpareSingleReturnComponent} from './component/spare-singl-return/spare-single-return.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {GalleriaModule} from 'primeng/galleria';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {ImagesCaruselAppComponent} from './component/images-carusel-app/images-carusel-app.component';
import {SaveReturnSpareComponent} from './component/save-return-spare/save-return-spare.component';
import {AppPrintReturnComponent} from './component/app-print-return/app-print-return.component';
import {BadgeModule} from 'primeng/badge';
import {RepairClousePaginatorComponent} from './component/repair-clouse-paginator/repair-clouse-paginator.component';
import {SearchByRepairIdSinglComponent} from './component/search-by-repair-id-singl/search-by-repair-id-singl.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    SingleDeviceForSaleComponent,
    DeviceSaleByIdComponent,
    DeviceSalePaginatorComponent,
    AllDeviceSaleComponent,
    AllDeviceInSaleComponent,
    RedactClientComponent,
    SearchByNameComponent,
    SearchByNameClientRepairComponent,
    SearchByNameSaleComponent,
    RedactClientSaleComponent,
    RedactClientsaleRedacandformComponent,
    InvoiceModelComponent,
    InvoiceRepairRedactComponent,
    InvoiceShopRedactComponent,
    StatisticStaffUsersComponent,
    StatisticStaffUsersShopComponent,
    RedactStaffUserComponent,
    StaffUserComponentDialogComponent,
    AddNewOrderComponent,
    ClouseOrderComponent,
    ClouseOrderFormComponent,
    AllOrderPaginatorComponent,
    SparePaginationComponent,
    SpareAllComponent,
    SpareRedactComponentComponent,
    SpareOutPagiComponent,
    SpareSingleReturnComponent,
    ImagesCaruselAppComponent,
    SaveReturnSpareComponent,
    AppPrintReturnComponent,
    RepairClousePaginatorComponent,
    SearchByRepairIdSinglComponent,
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
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    ChartModule,
    MatMenuModule,
    CardModule,
    ButtonModule,
    DividerModule,
    GalleriaModule,
    NgOptimizedImage,
    BadgeModule,
    HttpClientModule,
  ],
  providers: [WebSocketService, HttpClient, RedactStaffUserComponent, GalleriaModule, DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpXSRFInterceptor,
      multi: true,
    }],

  bootstrap: [AppComponent]
})
export class AppModule {
}
