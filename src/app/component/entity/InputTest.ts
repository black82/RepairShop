export class InputTest {
  id_input: number;
  sensors_input: boolean;
  display_input: boolean;
  connectors_input: boolean;
  sound_equipment_input: boolean;
  touch_input: boolean;
  display_touch_input: boolean;
  wi_fi_input: boolean;
  microphone_input: boolean;
  sim_input: boolean;
  keyboard_input: boolean;
  camera_input: boolean;
  camera_input_front: boolean;
  bluetooth: boolean;
  vibrations: boolean;
  audio_equipment: boolean;
  software: boolean;
  faceIdInput: boolean;
  homeButton: boolean;


  constructor(id_input: number, sensors_input: boolean, display_input: boolean,
              connectors_input: boolean, sound_equipment_input: boolean, touch_input: boolean,
              display_touch_input: boolean, wi_fi_input: boolean, microphone_input: boolean,
              sim_input: boolean, keyboard_input: boolean, camera_input: boolean,
              camera_input_front: boolean, bluetooth: boolean, vibrations: boolean,
              audio_equipment: boolean, software: boolean, faceIdInput: boolean,
              homeButton: boolean) {
    this.id_input = id_input;
    this.sensors_input = sensors_input;
    this.display_input = display_input;
    this.connectors_input = connectors_input;
    this.sound_equipment_input = sound_equipment_input;
    this.touch_input = touch_input;
    this.display_touch_input = display_touch_input;
    this.wi_fi_input = wi_fi_input;
    this.microphone_input = microphone_input;
    this.sim_input = sim_input;
    this.keyboard_input = keyboard_input;
    this.camera_input = camera_input;
    this.camera_input_front = camera_input_front;
    this.bluetooth = bluetooth;
    this.vibrations = vibrations;
    this.audio_equipment = audio_equipment;
    this.software = software;
    this.faceIdInput = faceIdInput;
    this.homeButton = homeButton;
  }
}
