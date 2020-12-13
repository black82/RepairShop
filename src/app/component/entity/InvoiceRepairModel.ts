export class InvoiceRepairModel {
  id: number;
  typeInvoiceContact: string;
  emailCompany: string;
  cityAndCountry: string;
  streetAndHouseNumber: string;
  testInputNotPassedTitle: string;
  testInputAllPassedTitle: string;
  testOutputNotPassedTitle: string;
  testOutputAllPassedTitle: string;
  noteOutputTitle: string;
  noteInputTitle: string;
  titleConditionedGeneral: string;
  conditionedGeneralTitle: string;
  privacyAuthorization: string;
  statementAgreementConditions: string;
  staffSignTitle: string;
  clientSignTitle: string;
  clientTitle: string;
  companyName: string;
  companyIvaTitle: string;
  companySdiTitle: string;
  clientEmailTitle: string;
  clientPhoneTitle: string;
  clientAddressTitle: string;
  modelTitle: string;
  usedConditionTitle: string;
  imeiAndSnTitle: string;
  defectTitle: string;
  dateToEnterTitle: string;
  dateToOutTitle: string;
  repairPriceTitle: string;
  workMakeTitle: string;
  partReplaysTitle: string;
  accessoryTitle: string;
  cashAdvance: string;
  dateRepairWillReady: string;
  testInputAllNotPassedTitle: string;
  testOutputAllNotPassedTitle: string;
  orderModels: string;


  constructor(id: number, typeInvoiceContact: string, emailCompany: string, cityAndCountry: string,
              streetAndHouseNumber: string, testInputNotPassedTitle: string,
              testInputAllPassedTitle: string, testOutputNotPassedTitle: string,
              testOutputAllPassedTitle: string, noteOutputTitle: string, noteInputTitle: string,
              titleConditionedGeneral: string, conditionedGeneralTitle: string,
              privacyAuthorization: string, statementAgreementConditions: string,
              staffSignTitle: string, clientSignTitle: string, clientTitle: string,
              companyName: string, companyIvaTitle: string, companySdiTitle: string,
              clientEmailTitle: string, clientPhoneTitle: string, clientAddressTitle: string,
              modelTitle: string, usedConditionTitle: string, imeiAndSnTitle: string, defectTitle: string,
              dateToEnterTitle: string, dateToOutTitle: string, repairPriceTitle: string,
              workMakeTitle: string, partReplaysTitle: string, accessoryTitle: string,
              cashAdvance: string, dateRepairWillReady: string, testInputAllNotPassedTitle: string,
              testOutputAllNotPassedTitle: string, orderModels: string) {
    this.id = id;
    this.typeInvoiceContact = typeInvoiceContact;
    this.emailCompany = emailCompany;
    this.cityAndCountry = cityAndCountry;
    this.streetAndHouseNumber = streetAndHouseNumber;
    this.testInputNotPassedTitle = testInputNotPassedTitle;
    this.testInputAllPassedTitle = testInputAllPassedTitle;
    this.testOutputNotPassedTitle = testOutputNotPassedTitle;
    this.testOutputAllPassedTitle = testOutputAllPassedTitle;
    this.noteOutputTitle = noteOutputTitle;
    this.noteInputTitle = noteInputTitle;
    this.titleConditionedGeneral = titleConditionedGeneral;
    this.conditionedGeneralTitle = conditionedGeneralTitle;
    this.privacyAuthorization = privacyAuthorization;
    this.statementAgreementConditions = statementAgreementConditions;
    this.staffSignTitle = staffSignTitle;
    this.clientSignTitle = clientSignTitle;
    this.clientTitle = clientTitle;
    this.companyName = companyName;
    this.companyIvaTitle = companyIvaTitle;
    this.companySdiTitle = companySdiTitle;
    this.clientEmailTitle = clientEmailTitle;
    this.clientPhoneTitle = clientPhoneTitle;
    this.clientAddressTitle = clientAddressTitle;
    this.modelTitle = modelTitle;
    this.usedConditionTitle = usedConditionTitle;
    this.imeiAndSnTitle = imeiAndSnTitle;
    this.defectTitle = defectTitle;
    this.dateToEnterTitle = dateToEnterTitle;
    this.dateToOutTitle = dateToOutTitle;
    this.repairPriceTitle = repairPriceTitle;
    this.workMakeTitle = workMakeTitle;
    this.partReplaysTitle = partReplaysTitle;
    this.accessoryTitle = accessoryTitle;
    this.cashAdvance = cashAdvance;
    this.dateRepairWillReady = dateRepairWillReady;
    this.testInputAllNotPassedTitle = testInputAllNotPassedTitle;
    this.testOutputAllNotPassedTitle = testOutputAllNotPassedTitle;
    this.orderModels = orderModels;
  }
}
