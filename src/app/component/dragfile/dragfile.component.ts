import {Component, OnInit} from '@angular/core';
import {ImageSenderService} from '../service/image-sender.service';
import {faFileUpload} from '@fortawesome/free-solid-svg-icons/faFileUpload';

@Component({
  selector: 'app-dragfile',
  templateUrl: './dragfile.component.html',
  styleUrls: ['./dragfile.component.css']
})
export class DragfileComponent implements OnInit {
  files: any = [];
  file_icon = faFileUpload;

  constructor(private imageSend: ImageSenderService) {
  }

  ngOnInit(): void {

  }


  onSelect(event) {
    this.imageSend.addImage.emit(event);
    this.files.push(event.addedFiles[0]);
  }

  onRemove(file) {
    this.imageSend.removeImages(this.files.indexOf(file));
    this.files.splice(this.files.indexOf(file), 1);
  }

}
