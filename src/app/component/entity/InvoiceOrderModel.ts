export class InvoiceOrderModel {
  id: number;

  typeInvoiceContact: string;
  colorsTitle: string;
  emailCompany: string;

  cityAndCountry: string;

  streetAndHouseNumber: string;
  noteInputTitle: string;
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
  modelTitle: string;
  dateToEnterTitle: string;
  dateToOutTitle: string;
  typeObjectTitle: string;
  cashAdvance: string;
  sellerPriceTitle: string;

  constructor(id: number, typeInvoiceContact: string, emailCompany: string,
              cityAndCountry: string, streetAndHouseNumber: string,
              noteInputTitle: string, conditionedGeneralTitle: string,
              privacyAuthorization: string, statementAgreementConditions: string,
              staffSignTitle: string, clientSignTitle: string, clientTitle: string,
              companyName: string, companyIvaTitle: string, companySdiTitle: string,
              clientEmailTitle: string, clientPhoneTitle: string,
              clientAddressTitle: string, orderModels: string, modelTitle: string,
              dateToEnterTitle: string, dateToOutTitle: string,
              typeObjectTitle: string, cashAdvance: string, sellerPriceTitle: string) {
    this.id = id;
    this.typeInvoiceContact = typeInvoiceContact;
    this.emailCompany = emailCompany;
    this.cityAndCountry = cityAndCountry;
    this.streetAndHouseNumber = streetAndHouseNumber;
    this.noteInputTitle = noteInputTitle;
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
    this.modelTitle = modelTitle;
    this.dateToEnterTitle = dateToEnterTitle;
    this.dateToOutTitle = dateToOutTitle;
    this.typeObjectTitle = typeObjectTitle;
    this.cashAdvance = cashAdvance;
    this.sellerPriceTitle = sellerPriceTitle;
  }
}
