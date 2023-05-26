export interface MultiPartFile {
  name: string;

  originalFilename: string;

  contentType: string;

  content: Blob [];
}
