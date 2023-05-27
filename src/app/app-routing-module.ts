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
import {EmailClientSendComponent} from './component/email-client-send-admin/email-client-send.component';
import {DiviceTumorowComponent} from './component/divice-tumorow/divice-tumorow.component';
import {ExtendRepairComponent} from './component/extend-repair/extend-repair.component';
import {UserAdminComponent} from './component/user-admin/user-admin.component';
import {StatisticComponent} from './component/statistic/statistic.component';
import {AddNewDeviceComponent} from './component/add-new-device/add-new-device.component';
import {AddnewRepairComponent} from './component/addnew-repair/addnew-repair.component';
import {EndRepairNotificationComponent} from './component/end-repair-notification/end-repair-notification.component';
import {EditRepairComponent} from './component/edit-repair/edit-repair.component';
import {PaginatorAllRepairComponent} from './component/paginator-all-repair/paginator-all-repair.component';
import {SendRedactPasswordRequestComponent} from './component/send-redact-password-request/send-redact-password-request.component';
import {EditPassworComponent} from './component/edit-passwor/edit-passwor.component';
import {ClientPaginatorDateComponent} from './component/client-paginator-date/client-paginator-date.component';
import {MessageAdminComponent} from './component/message-admin/message-admin.component';
import {DragOnDropRepairComponent} from './component/drag-on-drop-repair/drag-on-drop-repair.component';
import {DeviceSellComponent} from './component/device-sell/device-sell.component';
import {DeviceBayComponent} from './component/device-bay/device-bay.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {PageableDeviceSaleComponent} from './component/pageable-device-sale/pageable-device-sale.component';
import {RepairDashboardComponent} from './component/repair-dashboard/repair-dashboard.component';
import {DeviceSaleByIdComponent} from './component/device-sale-by-id/device-sale-by-id.component';
import {AllDeviceSaleComponent} from './component/all-device-sale/all-device-sale.component';
import {AllDeviceInSaleComponent} from './component/all-device-in-sale/all-device-in-sale.component';
import {ShopDashboardComponent} from './component/shop-dashboard/shop-dashboard.component';
import {SearchByNameClientRepairComponent} from './component/search-by-name-client-repair/search-by-name-client-repair.component';
import {SearchByNameSaleComponent} from './component/search-by-name-sale/search-by-name-sale.component';
import {RedactClientsaleRedacandformComponent} from './component/redact-clientsale-redacandform/redact-clientsale-redacandform.component';
import {InvoiceModelComponent} from './component/invoice-model/invoice-model.component';
import {InvoiceRepairRedactComponent} from './component/invoice-repair-redact/invoice-repair-redact.component';
import {InvoiceShopRedactComponent} from './component/invoice-shop-redact/invoice-shop-redact.component';
import {AddNewOrderComponent} from './component/add-new-order/add-new-order.component';
import {ClouseOrderComponent} from './component/clouse-order/clouse-order.component';
import {AllOrderPaginatorComponent} from './component/all-order-paginator/all-order-paginator.component';
import {SpareAllComponent} from './component/spare-all/spare-all.component';
import {SpareOutPagiComponent} from "./component/spare-out-pagi/spare-out-pagi.component";
import {SpareSingleReturnComponent} from "./component/spare-singl-return/spare-single-return.component";


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '404', component: NotFoundComponent},
  {path: 'input/client/device', component: DeviceinputComponent, canActivate: [AutGuardService]},
  {path: 'output/client/device/sell', component: DeviceSellComponent, canActivate: [AutGuardService]},
  {path: 'input/client/device/bay', component: DeviceBayComponent, canActivate: [AutGuardService]},
  {path: 'input/client/new/device', component: AddNewDeviceComponent, canActivate: [AutGuardService]},
  {path: 'input/client/new/repair', component: AddnewRepairComponent, canActivate: [AutGuardService]},
  {path: 'output/client/device', component: OtpoutDeviceComponent, canActivate: [AutGuardService]},
  {path: 'search/telephone/number', component: SearchpageComponent, canActivate: [AutGuardService]},
  {path: 'client/sign-up', component: SignUpComponent},
  {path: 'client/sign-in', component: SignInComponent},
  {path: 'recovery/password', component: EditPassworComponent},
  {path: 'recovery/password/request', component: SendRedactPasswordRequestComponent},
  {path: 'search/email', component: SearchEmailComponent, canActivate: [AutGuardService]},
  {path: 'search/repair/id', component: SearchRepairIdComponent, canActivate: [AutGuardService]},
  {path: 'admin/logs/server', component: LogServiceComponent, canActivate: [AutGuardService]},
  {path: 'admin/invoice/redact', component: InvoiceModelComponent, canActivate: [AutGuardService]},
  {
    path: 'admin/invoice/repair/redact',
    component: InvoiceRepairRedactComponent,
    canActivate: [AutGuardService],
    data: {animation: 'AboutPage'}
  },
  {
    path: 'admin/invoice/shop/redact', component: InvoiceShopRedactComponent, canActivate: [AutGuardService],
    data: {animation: 'AboutPage'}
  },
  {path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AutGuardService]},
  {path: 'admin/email/client/send', component: EmailClientSendComponent, canActivate: [AutGuardService]},
  {path: 'admin/device/preparation', component: DiviceTumorowComponent, canActivate: [AutGuardService]},
  {path: 'admin/repair/extend', component: ExtendRepairComponent, canActivate: [AutGuardService]},
  {path: 'admin/user', component: UserAdminComponent, canActivate: [AutGuardService]},
  {path: 'admin/statistic/repair', component: StatisticComponent, canActivate: [AutGuardService]},
  {
    path: 'output/repair/notification',
    component: EndRepairNotificationComponent,
    canActivate: [AutGuardService],
    data: {animation: 'AboutPage'}
  },
  {path: 'repair/edit', component: EditRepairComponent, canActivate: [AutGuardService]},
  {path: 'all/repair/paginator', component: PaginatorAllRepairComponent, canActivate: [AutGuardService]},
  {path: 'date/repair/paginator', component: ClientPaginatorDateComponent, canActivate: [AutGuardService]},
  {path: 'date/message/paginator', component: MessageAdminComponent, canActivate: [AutGuardService]},
  {path: 'upload/repair/images', component: DragOnDropRepairComponent, canActivate: [AutGuardService]},
  {path: 'device/sally/all/page', component: PageableDeviceSaleComponent, canActivate: [AutGuardService]},
  {path: 'repair/dashboard', component: RepairDashboardComponent, canActivate: [AutGuardService]},
  {
    path: 'client/repair/name', component: SearchByNameClientRepairComponent, canActivate: [AutGuardService],
    data: {animation: 'AboutPage'}
  },
  {path: 'shop/dashboard', component: ShopDashboardComponent, canActivate: [AutGuardService]},
  {path: 'device/for/sale/single', component: DeviceSaleByIdComponent, canActivate: [AutGuardService]},
  {path: 'device/sale/all/pageable', component: AllDeviceSaleComponent, canActivate: [AutGuardService]},
  {path: 'device/in/sale/pageable', component: AllDeviceInSaleComponent, canActivate: [AutGuardService]},
  {path: 'device/name/sale', component: SearchByNameSaleComponent, canActivate: [AutGuardService]},

  {path: 'input/order', component: AddNewOrderComponent, canActivate: [AutGuardService]},
  {path: 'output/order', component: ClouseOrderComponent, canActivate: [AutGuardService]},
  {path: 'edit/order', component: AllOrderPaginatorComponent, canActivate: [AutGuardService]},
  {path: 'return/all', component: SpareAllComponent, canActivate: [AutGuardService]},
  {path: 'return/out', component: SpareOutPagiComponent, canActivate: [AutGuardService]},
  {path: 'return/single', component: SpareSingleReturnComponent, canActivate: [AutGuardService]},
  {
    path: 'device/sale/redact',
    component: RedactClientsaleRedacandformComponent,
    canActivate: [AutGuardService],
    data: {animation: 'AboutPage'}
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
