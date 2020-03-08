import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Device} from '../entity/Device';
import {FiltreMoreDeviceRepairActivService} from '../service/filtre-more-device-repair-activ.service';
import {faBellSlash} from '@fortawesome/free-solid-svg-icons/faBellSlash';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';

@Component({
  selector: 'app-check-device-repair-active',
  templateUrl: './check-device-repair-active.component.html',
  styleUrls: ['./check-device-repair-active.component.css']
})
export class CheckDeviceRepairActiveComponent implements OnInit {
  device_input: Device[];
  @Output()
  device_return: EventEmitter<Device> = new EventEmitter<Device>();
  styleTag: HTMLStyleElement;
  fade = false;
  title_icon = faBellSlash;
  device = faMobile;

  constructor(private device_filtre: FiltreMoreDeviceRepairActivService) {
  }

  private static buildStyleElement(): HTMLStyleElement {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.className = 'alert_css';
    style.textContent = `
			.container {
				display: none;
			  }
		`;
    return (style);
  }

  ngOnInit(): void {
    this.styleTag = CheckDeviceRepairActiveComponent.buildStyleElement();
    this.device_filtre.device_check.subscribe(device => {
      this.device_input = [];
      this.device_input = device;
      this.fade = true;
      this.disable();

    });

  }

  select_device(device: Device) {
    this.device_input = [];
    this.removeAlert();
    this.device_return.emit(device);
  }

  removeAlert() {
    this.enable();
    this.fade = !this.fade;
  }

  public enable(): void {
    document.querySelector('body').removeChild(this.styleTag);
  }

  public disable(): void {
    document.body.appendChild(this.styleTag);
  }
}
