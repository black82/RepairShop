import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {Client} from '../entity/ClientWeb';
import {DeviceInputService} from '../service/device-input.service';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.css']
})
export class SearchByNameComponent implements OnInit {
  searchForm: UntypedFormGroup;
  @Input()
  headerForm: string;
  @Input()
  typeClient: string;
  clients: Client[];
  nameCheckBox = false;
  familyCheckBox = false;
  buttonText: string;


  constructor(private formBuilder: UntypedFormBuilder,
              private httpClient: HttpClien,
              private deviceService: DeviceInputService,
              private alertService: AlertServiceService) {
  }

  ngOnInit(): void {
    if (this.typeClient === 'repair') {
      this.buttonText = 'Search Repair Client By FullName';
    } else if (this.typeClient === 'shop') {
      this.buttonText = 'Search Shop Client By FullName';
    }
    this.initForm();
  }

  initForm(): void {
    this.searchForm = this.formBuilder.group(
      {
        name: new UntypedFormControl(null, Validators.required),
        family: new UntypedFormControl(null, Validators.required),
      });
  }

  onFormSubmit() {
    if (this.searchForm.invalid) {
      this.alertService.warn(null, 'you form not valid !!!',
        false, false, '', null);
      return;
    }
    if (this.nameCheckBox && this.familyCheckBox) {
      this.alertService.warn(null, 'you form disable all input !!!',
        false, false, '', null);
      return;
    }
    if (this.typeClient === 'repair') {
      if (!this.nameCheckBox && !this.familyCheckBox) {
        this.getClientRepairByNameAndFamily();
      } else if (!this.nameCheckBox && this.familyCheckBox) {
        this.getClientRepairByName();
      } else if (this.nameCheckBox && !this.familyCheckBox) {
        this.getClientRepairByFamily();
      }
    } else if (this.typeClient === 'shop') {
      if (!this.nameCheckBox && !this.familyCheckBox) {
        this.getClientShopByNameAndFamily();
      } else if (this.nameCheckBox && !this.familyCheckBox) {
        this.getClientShopByFamily();
      } else if (!this.nameCheckBox && this.familyCheckBox) {
        this.getClientShopByName();
      }
    }
  }

  nameCheckBoxClick() {
    this.nameCheckBox = !this.nameCheckBox;
    this.searchForm.controls.name.setValue(null);
    if (this.nameCheckBox) {
      this.searchForm.controls.name.clearValidators();

    } else {
      this.searchForm.controls.name.setValidators(Validators.required);
    }
    this.searchForm.controls.name.updateValueAndValidity();
    this.checkTypeSearchByButtonText();
  }

  familyCheckBoxClick() {
    this.familyCheckBox = !this.familyCheckBox;
    this.searchForm.controls.family.setValue(null);
    if (this.familyCheckBox) {
      this.searchForm.controls.family.clearValidators();
    } else {
      this.searchForm.controls.family.setValidators(Validators.required);
    }
    this.searchForm.controls.family.updateValueAndValidity();
    this.checkTypeSearchByButtonText();
  }

  checkTypeSearchByButtonText() {
    if (this.familyCheckBox && this.nameCheckBox) {
      this.buttonText = 'INVALID FORM';
    } else if (!this.familyCheckBox && !this.nameCheckBox) {
      this.buttonText = 'Search Shop Client By FullName';
    } else if (this.familyCheckBox && !this.nameCheckBox) {
      this.buttonText = 'Search Repair Client By Name';
    } else if (this.nameCheckBox && !this.familyCheckBox) {
      this.buttonText = 'Search Repair Client By Family';
    }
  }

  private getClientRepairByNameAndFamily() {
    this.httpClient.getClientRepairByNameAndFamily(this.searchForm.controls.name.value, this.searchForm.controls.family.value)
      .subscribe(clients => {
        this.clients = clients;
        this.deviceService.$client_pushArray.emit(clients);
      });
  }

  private getClientShopByNameAndFamily() {
    this.httpClient.getClientShopByNameAndFamily(this.searchForm.controls.name.value, this.searchForm.controls.family.value)
      .subscribe(transaction => {
        this.deviceService.$deviceForSaleClientTransactionArray.emit(transaction);
      });
  }

  private getClientRepairByName() {
    this.httpClient.getClientRepairByName(this.searchForm.controls.name.value)
      .subscribe(clients => {
        this.clients = clients;
        this.deviceService.$client_pushArray.emit(clients);
      });

  }

  private getClientRepairByFamily() {
    this.httpClient.getClientRepairByFamily(this.searchForm.controls.family.value)
      .subscribe(clients => {
        this.clients = clients;
        this.deviceService.$client_pushArray.emit(clients);
      });

  }

  private getClientShopByFamily() {
    this.httpClient.getClientShopByOnlyFamily(this.searchForm.controls.family.value)
      .subscribe(transaction => {
        this.deviceService.$deviceForSaleClientTransactionArray.emit(transaction);
      });
  }

  private getClientShopByName() {
    this.httpClient.getClientShopByOnlyName(this.searchForm.controls.name.value)
      .subscribe(transaction => {
        this.deviceService.$deviceForSaleClientTransactionArray.emit(transaction);
      });
  }
}
