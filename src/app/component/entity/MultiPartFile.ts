export class MultiPartFile {
  name: string;

  originalFilename: string;

  contentType: string;

  content: Uint8Array;

  constructor(name: string, originalFilename: string, contentType: string, content: Uint8Array) {
    this.name = name;
    this.originalFilename = originalFilename;
    this.contentType = contentType;
    this.content = content;
  }
}
