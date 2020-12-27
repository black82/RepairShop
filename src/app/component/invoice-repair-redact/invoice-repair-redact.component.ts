import {Component, OnInit} from '@angular/core';
import {InvoiceRepairModel} from '../entity/InvoiceRepairModel';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  formClient: FormGroup;

  constructor(private fb: FormBuilder,
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
      typeInvoiceContact: new FormControl(null, [Validators.required]),
      emailCompany: new FormControl(null, [Validators.required]),
      cityAndCountry: new FormControl(null, [Validators.required]),
      clientTitle: new FormControl(null, [Validators.required]),
      streetAndHouseNumber: new FormControl(null, [Validators.required]),
      imeiAndSnTitle: new FormControl(null, [Validators.required]),
      repairPriceTitle: new FormControl(null, [Validators.required]),
      testInputNotPassedTitle: new FormControl(null, [Validators.required]),
      companyIvaTitle: new FormControl(null, [Validators.required]),
      companySdiTitle: new FormControl(null, [Validators.required]),
      clientEmailTitle: new FormControl(null, [Validators.required]),
      clientPhoneTitle: new FormControl(null, [Validators.required]),
      clientAddressTitle: new FormControl(null, [Validators.required]),
      modelTitle: new FormControl(null, [Validators.required]),
      usedConditionTitle: new FormControl(null, [Validators.required]),
      defectTitle: new FormControl(null, [Validators.required]),
      accessoryTitle: new FormControl(null, [Validators.required]),
      cashAdvance: new FormControl(null, [Validators.required]),
      dateRepairWillReady: new FormControl(null, [Validators.required]),
      dateToEnterTitle: new FormControl(null, [Validators.required]),
      dateToOutTitle: new FormControl(null, [Validators.required]),
      workMakeTitle: new FormControl(null, [Validators.required]),
      partReplaysTitle: new FormControl(null, [Validators.required]),
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
