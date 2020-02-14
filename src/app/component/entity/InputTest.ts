export class InputTest {
  id_InputTest: number;
  sensors_input: boolean;
  display_input: boolean;
  connectors_input: boolean;
  sound_equipment_input: boolean;
  touch_input: boolean;
  wi_fi_input: boolean;
  microphone_input: boolean;
  sim_input: boolean;
  keyboard_input: boolean;
  camera_input: boolean;

  constructor(id_InputTest: number, sensors_input: boolean, display_input: boolean,
              connectors_input: boolean, sound_equipment_input: boolean, touch_input: boolean,
              wi_fi_input: boolean, microphone_input: boolean, sim_input: boolean,
              keyboard_input: boolean, camera_input: boolean) {
    this.id_InputTest = id_InputTest;
    this.sensors_input = sensors_input;
    this.display_input = display_input;
    this.connectors_input = connectors_input;
    this.sound_equipment_input = sound_equipment_input;
    this.touch_input = touch_input;
    this.wi_fi_input = wi_fi_input;
    this.microphone_input = microphone_input;
    this.sim_input = sim_input;
    this.keyboard_input = keyboard_input;
    this.camera_input = camera_input;
  }
}
