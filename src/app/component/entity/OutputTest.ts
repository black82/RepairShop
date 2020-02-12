export class OutputTest {
  id: number;
  sensors: boolean;
  display: boolean;
  connectors: boolean;
  sound_equipment: boolean;
  touch: boolean;
  wi_fi: boolean;
  microphone: boolean;
  sim: boolean;
  keyboard: boolean;
  camera: boolean;

  constructor(id: number,
              sensors: boolean, display: boolean,
              connectors: boolean, sound_equipment: boolean, touch: boolean,
              wi_fi: boolean, microphone: boolean, sim: boolean, keyboard: boolean, camera: boolean) {
    this.id = id;
    this.sensors = sensors;
    this.display = display;
    this.connectors = connectors;
    this.sound_equipment = sound_equipment;
    this.touch = touch;
    this.wi_fi = wi_fi;
    this.microphone = microphone;
    this.sim = sim;
    this.keyboard = keyboard;
    this.camera = camera;
  }
}
