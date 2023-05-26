import {Component, OnInit} from '@angular/core';
import {InvoiceRepairModel} from '../entity/InvoiceRepairModel';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';

@Component({
  selector: 'app-invoice-repair-redact',
  templateUrl: './invoice-repair-redact.component.html',
  styleUrls: ['./invoice-repair-redact.component.css']
})
export class InvoiceRepairRedactComponent implements OnInit {
  date: Date = new Date();
  invoiceRepairModel: InvoiceRepairModel;
  formClient: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
              private httpService: HttpClien,
              private alert_service: AlertServiceService) {
  }

  ngOnInit(): void {
    this.httpService.findInvoiceRepairsModelByOrder('default').subscribe(value => {
      this.invoiceRepairModel = value;
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
      repairPriceTitle: new UntypedFormControl(null, [Validators.required]),
      testInputNotPassedTitle: new UntypedFormControl(null, [Validators.required]),
      companyIvaTitle: new UntypedFormControl(null, [Validators.required]),
      companySdiTitle: new UntypedFormControl(null, [Validators.required]),
      clientEmailTitle: new UntypedFormControl(null, [Validators.required]),
      clientPhoneTitle: new UntypedFormControl(null, [Validators.required]),
      clientAddressTitle: new UntypedFormControl(null, [Validators.required]),
      modelTitle: new UntypedFormControl(null, [Validators.required]),
      usedConditionTitle: new UntypedFormControl(null, [Validators.required]),
      defectTitle: new UntypedFormControl(null, [Validators.required]),
      accessoryTitle: new UntypedFormControl(null, [Validators.required]),
      cashAdvance: new UntypedFormControl(null, [Validators.required]),
      dateRepairWillReady: new UntypedFormControl(null, [Validators.required]),
      dateToEnterTitle: new UntypedFormControl(null, [Validators.required]),
      dateToOutTitle: new UntypedFormControl(null, [Validators.required]),
      workMakeTitle: new UntypedFormControl(null, [Validators.required]),
      partReplaysTitle: new UntypedFormControl(null, [Validators.required]),
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
    this.httpService.addNewInvoiceRepairsModel(this.createInvoiceModel()).subscribe(() => {
      this.alert_service.success('', 'You Repair Invoice Model Saved ',
        true, false, '');
    });
  }

  createInvoiceModel(): InvoiceRepairModel {
    let formData = Object.assign({InvoiceRepairModel});
    formData = Object.assign(formData, this.formClient.value);
    return new InvoiceRepairModel(this.invoiceRepairModel?.id, formData.typeInvoiceContact,
      formData.emailCompany, formData.cityAndCountry, formData.streetAndHouseNumber, formData.testInputNotPassedTitle
      , formData.testInputAllPassedTitle, formData.testOutputNotPassedTitle, formData.testOutputAllPassedTitle,
      formData.noteInputTitle
      , formData.noteOutputTitle, formData.titleConditionedGeneral, formData.conditionedGeneralTitle,
      formData.privacyAuthorization, formData.statementAgreementConditions, formData.staffSignTitle
      , formData.clientSignTitle, formData.clientTitle, formData.clientTitle, formData.companyIvaTitle
      , formData.companySdiTitle, formData.clientEmailTitle, formData.clientPhoneTitle
      , formData.clientAddressTitle, formData.modelTitle, formData.usedConditionTitle,
      formData.imeiAndSnTitle, formData.defectTitle, formData.dateToEnterTitle, formData.dateToOutTitle,
      formData.repairPriceTitle, formData.workMakeTitle, formData.partReplaysTitle, formData.accessoryTitle
      , formData.cashAdvance, formData.dateRepairWillReady, formData.testInputAllNotPassedTitle, formData.testOutputAllNotPassedTitle, 'default');

  }
}
