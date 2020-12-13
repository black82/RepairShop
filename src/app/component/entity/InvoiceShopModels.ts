export class InvoiceShopModels {
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
  orderModels: string;
  testInputAllNotPassedTitle: string;
  testOutputAllNotPassedTitle: string;
  modelTitle: string;
  usedConditionTitle: string;
  imeiAndSnTitle: string;
  accessoryTitle: string;
  dateBayingTitle: string;
  guaranteeTitle: string;
  dateSailingTitle: string;
  typeDeviceTitle: string;
  bayingPriceTitle: string;
  sellerPriceTitle: string;

  constructor(id: number, typeInvoiceContact: string, emailCompany: string,
              cityAndCountry: string, streetAndHouseNumber: string, testInputNotPassedTitle: string,
              testInputAllPassedTitle: string, testOutputNotPassedTitle: string,
              testOutputAllPassedTitle: string, noteOutputTitle: string, noteInputTitle: string,
              titleConditionedGeneral: string, conditionedGeneralTitle: string,
              privacyAuthorization: string, statementAgreementConditions: string,
              staffSignTitle: string, clientSignTitle: string, clientTitle: string, companyName: string,
              companyIvaTitle: string, companySdiTitle: string, clientEmailTitle: string,
              clientPhoneTitle: string, clientAddressTitle: string, orderModels: string,
              testInputAllNotPassedTitle: string, testOutputAllNotPassedTitle: string,
              modelTitle: string, usedConditionTitle: string, imeiAndSnTitle: string,
              accessoryTitle: string, dateBayingTitle: string, guaranteeTitle: string,
              dateSailingTitle: string, bayingPriceTitle: string, sellerPriceTitle: string,
              typeDeviceTitle: string
  ) {
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
    this.orderModels = orderModels;
    this.testInputAllNotPassedTitle = testInputAllNotPassedTitle;
    this.testOutputAllNotPassedTitle = testOutputAllNotPassedTitle;
    this.modelTitle = modelTitle;
    this.usedConditionTitle = usedConditionTitle;
    this.imeiAndSnTitle = imeiAndSnTitle;
    this.accessoryTitle = accessoryTitle;
    this.dateBayingTitle = dateBayingTitle;
    this.guaranteeTitle = guaranteeTitle;
    this.dateSailingTitle = dateSailingTitle;
    this.bayingPriceTitle = bayingPriceTitle;
    this.sellerPriceTitle = sellerPriceTitle;
    this.typeDeviceTitle = typeDeviceTitle;
  }
}
