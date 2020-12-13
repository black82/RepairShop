import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  formClient: FormGroup;

  constructor(private fb: FormBuilder,
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
      typeInvoiceContact: new FormControl(null, [Validators.required]),
      emailCompany: new FormControl(null, [Validators.required]),
      cityAndCountry: new FormControl(null, [Validators.required]),
      clientTitle: new FormControl(null, [Validators.required]),
      streetAndHouseNumber: new FormControl(null, [Validators.required]),
      imeiAndSnTitle: new FormControl(null, [Validators.required]),
      testInputNotPassedTitle: new FormControl(null, [Validators.required]),
      companyIvaTitle: new FormControl(null, [Validators.required]),
      companySdiTitle: new FormControl(null, [Validators.required]),
      clientEmailTitle: new FormControl(null, [Validators.required]),
      clientPhoneTitle: new FormControl(null, [Validators.required]),
      clientAddressTitle: new FormControl(null, [Validators.required]),
      modelTitle: new FormControl(null, [Validators.required]),
      usedConditionTitle: new FormControl(null, [Validators.required]),
      guaranteeTitle: new FormControl(null, [Validators.required]),
      accessoryTitle: new FormControl(null, [Validators.required]),
      dateSailingTitle: new FormControl(null, [Validators.required]),
      dateBayingTitle: new FormControl(null, [Validators.required]),
      typeDeviceTitle: new FormControl(null, [Validators.required]),
      testInputAllPassedTitle: new FormControl(null, [Validators.required]),
      testInputAllNotPassedTitle: new FormControl(null, [Validators.required]),
      testOutputAllPassedTitle: new FormControl(null, [Validators.required]),
      testOutputNotPassedTitle: new FormControl(null, [Validators.required]),
      testOutputAllNotPassedTitle: new FormControl(null, [Validators.required]),
      noteInputTitle: new FormControl(null, [Validators.required]),
      noteOutputTitle: new FormControl(null, [Validators.required]),
      conditionedGeneralTitle: new FormControl(null, [Validators.required]),
      titleConditionedGeneral: new FormControl(null, [Validators.required]),
      privacyAuthorization: new FormControl(null, [Validators.required]),
      statementAgreementConditions: new FormControl(null, [Validators.required]),
      staffSignTitle: new FormControl(null, [Validators.required]),
      clientSignTitle: new FormControl(null, [Validators.required]),
      bayingPriceTitle: new FormControl(null, [Validators.required]),
      sellerPriceTitle: new FormControl(null, [Validators.required]),
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
