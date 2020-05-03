import {Component, OnInit} from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {ImageSenderService} from '../service/image-sender.service';

@Component({
  selector: 'app-dragfile',
  templateUrl: './dragfile.component.html',
  styleUrls: ['./dragfile.component.css']
})
export class DragfileComponent implements OnInit {
  files: any = [];
  recyclable = faTrash;

  constructor(private imageSend: ImageSenderService) {
  }

  ngOnInit(): void {
  }


  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.imageSend.addImagesToSend(element);

      this.files.push(element.name);
    }
  }

  deleteAttachment(index, file: File) {
    this.files.splice(index, 1);
    console.log(index);
    this.imageSend.removeImages(index);

  }


}
