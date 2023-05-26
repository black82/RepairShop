import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {InvoiceShopModels} from '../entity/InvoiceShopModels';
import {InvoiceRepairModel} from '../entity/InvoiceRepairModel';

@Component({
  selector: 'app-invoice-shop-redact',
  templateUrl: './invoice-shop-redact.component.html',
  styleUrls: ['./invoice-shop-redact.component.css']
})
export class InvoiceShopRedactComponent implements OnInit {
  invoiceShopModel: InvoiceShopModels;
  date: Date = new Date();
  formClient: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
              private httpService: HttpClien,
              private alert_service: AlertServiceService) {
  }

  ngOnInit(): void {
    this.httpService.findInvoiceShopModelByOrder('default').subscribe(invoice => {
      this.invoiceShopModel = invoice;

    });
    this.createForm();
  }

  createForm(): void {
    this.formClient = this.fb.group({
      typeInvoiceContact: new UntypedFormControl(null, [Validators.required]),
      emailCompany: new UntypedFormControl(null, [Validators.required]),
      cityAndCountry: new UntypedFormControl(null, [Validators.required]),
      clientTitle: new UntypedFormControl(null, [Validators.required]),
      streetAndHouseNumber: new UntypedFormControl(null, [Validators.required]),
      imeiAndSnTitle: new UntypedFormControl(null, [Validators.required]),
      testInputNotPassedTitle: new UntypedFormControl(null, [Validators.required]),
      companyIvaTitle: new UntypedFormControl(null, [Validators.required]),
      companySdiTitle: new UntypedFormControl(null, [Validators.required]),
      clientEmailTitle: new UntypedFormControl(null, [Validators.required]),
      clientPhoneTitle: new UntypedFormControl(null, [Validators.required]),
      clientAddressTitle: new UntypedFormControl(null, [Validators.required]),
      modelTitle: new UntypedFormControl(null, [Validators.required]),
      usedConditionTitle: new UntypedFormControl(null, [Validators.required]),
      guaranteeTitle: new UntypedFormControl(null, [Validators.required]),
      accessoryTitle: new UntypedFormControl(null, [Validators.required]),
      dateSailingTitle: new UntypedFormControl(null, [Validators.required]),
      dateBayingTitle: new UntypedFormControl(null, [Validators.required]),
      typeDeviceTitle: new UntypedFormControl(null, [Validators.required]),
      testInputAllPassedTitle: new UntypedFormControl(null, [Validators.required]),
      testInputAllNotPassedTitle: new UntypedFormControl(null, [Validators.required]),
      testOutputAllPassedTitle: new UntypedFormControl(null, [Validators.required]),
      testOutputNotPassedTitle: new UntypedFormControl(null, [Validators.required]),
      testOutputAllNotPassedTitle: new UntypedFormControl(null, [Validators.required]),
      noteInputTitle: new UntypedFormControl(null, [Validators.required]),
      noteOutputTitle: new UntypedFormControl(null, [Validators.required]),
      conditionedGeneralTitle: new UntypedFormControl(null, [Validators.required]),
      titleConditionedGeneral: new UntypedFormControl(null, [Validators.required]),
      privacyAuthorization: new UntypedFormControl(null, [Validators.required]),
      statementAgreementConditions: new UntypedFormControl(null, [Validators.required]),
      staffSignTitle: new UntypedFormControl(null, [Validators.required]),
      clientSignTitle: new UntypedFormControl(null, [Validators.required]),
      bayingPriceTitle: new UntypedFormControl(null, [Validators.required]),
      sellerPriceTitle: new UntypedFormControl(null, [Validators.required]),
    });
  }

  submitForm() {
    if (this.formClient.invalid) {
      Object.keys(this.formClient.controls).forEach(key => {
        this.formClient.controls[key].markAllAsTouched();
      });
      this.alert_service.warn('', 'You form not valid',
        false, false, '');
      return;
    }
    this.httpService.addNewInvoiceShopsModel(this.createInvoiceModel()).subscribe(() => {
      this.alert_service.success('', 'You Shop Invoice Model Saved ',
        true, false, '');
    });
  }


  createInvoiceModel(): InvoiceShopModels {
    let formData = Object.assign({InvoiceRepairModel});
    formData = Object.assign(formData, this.formClient.value);
    return new InvoiceShopModels(this.invoiceShopModel?.id, formData.typeInvoiceContact, formData.emailCompany
      , formData.cityAndCountry, formData.streetAndHouseNumber, formData.testOutputNotPassedTitle
      , formData.testInputAllPassedTitle, formData.testOutputNotPassedTitle, formData.testOutputAllPassedTitle
      , formData.noteOutputTitle, formData.noteInputTitle, formData.titleConditionedGeneral, formData.conditionedGeneralTitle
      , formData.privacyAuthorization, formData.statementAgreementConditions, formData.staffSignTitle,
      formData.clientSignTitle, formData.clientTitle, formData.clientTitle, formData.companyIvaTitle,
      formData.companySdiTitle, formData.clientEmailTitle, formData.clientPhoneTitle, formData.clientAddressTitle,
      'default', formData.testInputAllNotPassedTitle, formData.testOutputAllNotPassedTitle,
      formData.modelTitle, formData.usedConditionTitle, formData.imeiAndSnTitle, formData.accessoryTitle,
      formData.dateBayingTitle, formData.guaranteeTitle, formData.dateSailingTitle, formData.bayingPriceTitle,
      formData.sellerPriceTitle, formData.typeDeviceTitle);
  }
}
