export class ImageList {
  foto_id: number;
  fotoBase64: string;

  constructor(fotoBase64: string) {
    this.fotoBase64 = fotoBase64;
  }
}
