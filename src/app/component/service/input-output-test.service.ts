import {Injectable} from '@angular/core';
import {InputTest} from '../entity/InputTest';
import {OutputTest} from '../entity/OutputTest';

@Injectable({
  providedIn: 'root'
})
export class InputOutputTestService {

  constructor() {
  }

  inputTestCheck(inputTest: InputTest) {
    const name_test_entre = [];
    if (!inputTest.camera_input) {
      name_test_entre.push('X Fotocamera');
    }
    if (!inputTest.bluetooth) {
      name_test_entre.push('X Bluetooh');
    }
    if (!inputTest.vibrations) {
      name_test_entre.push('X Vibrations');
    }
    if (!inputTest.audio_equipment) {
      name_test_entre.push('X Audio');
    }
    if (!inputTest.software) {
      name_test_entre.push('X Software');
    }
    if (!inputTest.keyboard_input) {
      name_test_entre.push('X La tastiera');
    }
    if (!inputTest.sim_input) {
      name_test_entre.push('X SIM danneggiata/assente ');
    }
    if (!inputTest.microphone_input) {
      name_test_entre.push('X Microfono');
    }
    if (!inputTest.wi_fi_input) {
      name_test_entre.push('X Wi-Fi');
    }
    if (!inputTest.touch_input) {
      name_test_entre.push('X Touch');
    }
    if (!inputTest.sound_equipment_input) {
      name_test_entre.push('X L\'apparecchiatura audio');
    }
    if (!inputTest.camera_input_front) {
      name_test_entre.push('X Fotocamera Frontale');
    }
    if (!inputTest.connectors_input) {
      name_test_entre.push('X Connettori');
    }
    if (!inputTest.display_input) {
      name_test_entre.push('X Display');
    }
    if (!inputTest.sensors_input) {
      name_test_entre.push('X Sensore');
    }
    if (!inputTest.display_touch_input) {
      name_test_entre.push('X Display_touchy');
    }
    if (!inputTest.faceIdInput) {
      name_test_entre.push('X Face Id');
    }
    if (!inputTest.homeButton) {
      name_test_entre.push('X Home Button');
    }
    return name_test_entre;
  }

  outputTestCheck(outputTest: OutputTest) {
    const name_test_out = [];
    if (!outputTest.camera_Output) {
      name_test_out.push('X Fotocamera');
    }
    if (!outputTest.audio_equipment) {
      name_test_out.push('X Speaker');
    }
    if (!outputTest.software) {
      name_test_out.push('X Software');
    }
    if (!outputTest.vibrations) {
      name_test_out.push('X Vibrations');
    }
    if (!outputTest.bluetooth) {
      name_test_out.push('X Bluetooh');
    }
    if (!outputTest.camera_Output_Front) {
      name_test_out.push('X Fotocamera Frontale');
    }
    if (!outputTest.keyboard_Output) {
      name_test_out.push('X Tastiera ');
    }
    if (!outputTest.sim_Output) {
      name_test_out.push('X SIM è danneggiata/assente ');
    }
    if (!outputTest.microphone_Output) {
      name_test_out.push('X Microfono');
    }
    if (!outputTest.wi_fi_Output) {
      name_test_out.push('X Wi-Fi');
    }
    if (!outputTest.touch_Output) {
      name_test_out.push('X Sensore Touch');
    }
    if (!outputTest.sound_equipment_Output) {
      name_test_out.push('X L\'apparecchiatura audio');
    }
    if (!outputTest.connectors_Output) {
      name_test_out.push('X Connettori');
    }
    if (!outputTest.display_Output) {
      name_test_out.push('X Display  ');
    }
    if (!outputTest.sensors_Output) {
      name_test_out.push('X Sensore ');
    }
    if (!outputTest.display_touch_Output) {
      name_test_out.push('X Display_touchy');
    }
    if (!outputTest.faceIdOutput) {
      name_test_out.push('X Face Id  danneggiato ');
    }
    if (!outputTest.homeButton) {
      name_test_out.push('X Home Button ');
    }
    return name_test_out;
  }

}
