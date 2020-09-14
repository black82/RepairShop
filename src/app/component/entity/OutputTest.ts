export class OutputTest {
  id_Output: number;
  sensors_Output: boolean;
  display_Output: boolean;
  connectors_Output: boolean;
  sound_equipment_Output: boolean;
  touch_Output: boolean;
  display_touch_Output: boolean;
  wi_fi_Output: boolean;
  microphone_Output: boolean;
  sim_Output: boolean;
  keyboard_Output: boolean;
  camera_Output: boolean;
  camera_Output_Front: boolean;
  bluetooth: boolean;
  vibrations: boolean;
  audio_equipment: boolean;
  software: boolean;
  faceIdOutput: boolean;


  constructor(id_Output: number, sensors_Output: boolean, display_Output: boolean,
              connectors_Output: boolean, sound_equipment_Output: boolean,
              touch_Output: boolean, display_touch_Output: boolean, wi_fi_Output: boolean,
              microphone_Output: boolean, sim_Output: boolean, keyboard_Output: boolean,
              camera_Output: boolean, camera_Output_Front: boolean, bluetooth: boolean,
              vibrations: boolean, audio_equipment: boolean, software: boolean,
              faceIdOutput: boolean) {
    this.id_Output = id_Output;
    this.sensors_Output = sensors_Output;
    this.display_Output = display_Output;
    this.connectors_Output = connectors_Output;
    this.sound_equipment_Output = sound_equipment_Output;
    this.touch_Output = touch_Output;
    this.display_touch_Output = display_touch_Output;
    this.wi_fi_Output = wi_fi_Output;
    this.microphone_Output = microphone_Output;
    this.sim_Output = sim_Output;
    this.keyboard_Output = keyboard_Output;
    this.camera_Output = camera_Output;
    this.camera_Output_Front = camera_Output_Front;
    this.bluetooth = bluetooth;
    this.vibrations = vibrations;
    this.audio_equipment = audio_equipment;
    this.software = software;
    this.faceIdOutput = faceIdOutput;
  }
}
