import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-images-carusel-app',
  templateUrl: './images-carusel-app.component.html',
  styleUrls: ['./images-carusel-app.component.css']
})
export class ImagesCaruselAppComponent implements OnInit {
  @Input()
  images: string[];
  imagesSrc: {
    itemImageSrc: string;
    thumbnailImageSrc: string;
    alt: string;
    count: number
  }[];
  showImages = false;
  showImageEmpty=false


  constructor() {

  }

  ngOnInit(): void {
    if (this.images && this.images.length > 0) {
      this.imagesSrc = this.createImageByGallery(this.images);
      this.showImages = true;
    }else {
      this.showImageEmpty=true;
    }

  }


  createImageByGallery(images: string[]) {
    let imagesAfter = [];
    let count = 0;
    images.forEach(p => {
      count++;
      imagesAfter.push({
        itemImageSrc: 'https://drive.google.com/uc?id=' + p + '&export=download',
        thumbnailImageSrc: 'https://drive.google.com/uc?id=' + p + '&export=download',
        alt: 'img- ' + count,
        count: count
      })
    });
    return imagesAfter;
  }
}
