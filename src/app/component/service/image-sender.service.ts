import {EventEmitter, Injectable, Output} from '@angular/core';

import {ImageList} from '../entity/ImageList';


@Injectable({
  providedIn: 'root'
})
export class ImageSenderService {
  @Output()
  addImage = new EventEmitter();
  @Output()
  submitImage = new EventEmitter();
  @Output()
  deliteImage = new EventEmitter();
  images: string[] = [];
  imagesList: ImageList[] = [];

  constructor() {
  }

  addImagesToSend(file) {
    this.selectFile(file);
  }

  removeImages(index) {
    this.images.splice(index, 1);
  }

  selectFile(file) {
    const reader = new FileReader();
    reader.onload = this.handleFile.bind(this);
    reader.readAsBinaryString(file);

  }


  handleFile(event) {
    const binaryString = event.target.result;
    this.images.push(btoa(binaryString));
  }

  submitImageToBack() {
    console.log(this.images);
    this.imagesList = [];
    const images = Array.from(new Set(this.images));
    images.forEach(value => {
      this.imagesList.push(new ImageList(value));
    });
    return this.imagesList;
  }

}
