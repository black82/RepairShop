import {Component, OnDestroy, OnInit} from '@angular/core';
import {Repair} from '../entity/Repair';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {ImageSenderService} from '../service/image-sender.service';
import {ImageList} from '../entity/ImageList';

@Component({
  selector: 'app-drag-on-drop-repair',
  templateUrl: './drag-on-drop-repair.component.html',
  styleUrls: ['./drag-on-drop-repair.component.css']
})
export class DragOnDropRepairComponent implements OnInit, OnDestroy {
  repair: Repair;
  showRepair = false;
  formInput: FormGroup;
  showDrag = false;
  typeImages: string;

  constructor(private fb: FormBuilder,
              private httpService: HttpClien,
              private alert_service: AlertServiceService,
              private imageSender: ImageSenderService) {
  }

  ngOnInit(): void {
    this.formInput = this.fb.group(
      {
        id: [null, Validators.required],
        type_images: [null, Validators.required]
      });
  }


  ngOnDestroy(): void {

  }

  searchRepairByIdRepair() {
    if (!Number(this.formInput.controls.id.value)) {
      this.alert_service.info(null, 'The value entered must be a Number.', false, false, null, null);
      return;
    }
    this.httpService.searchRepairByRepairId(this.formInput.controls.id.value).subscribe(
      repair => {
        this.typeImages = this.formInput.controls.type_images.value;
        this.repair = repair;
        this.showDrag = true;
      },
      () => {

      });

  }

  saveImagesToRepair() {
    const imageLists = this.imageSender.submitImageToBack();
    if (imageLists.length === 0) {
      this.alert_service.info(null, 'The image list is empty', false
        , false, null, null);
    } else {
      this.checkTypeImages(imageLists);
      this.httpService.addNewImagesToRepair(this.repair).subscribe(() => {
        this.alert_service.success(null, 'The images were uploaded successfully'
          , true, false, '');
      });
    }
  }

  checkTypeImages(imageList: ImageList[]) {
    switch (this.typeImages) {
      case '1': {
        imageList.forEach(image => {
          this.repair.repairFileStorage.fotoEnterDevice.push(image);
        });
        break;
      }
      case '2': {
        imageList.forEach(image => {
          this.repair.repairFileStorage.fotoExitDevice.push(image);
        });
        break;
      }
      default: {
        imageList.forEach(image => {
          this.repair.repairFileStorage.fotoEnterDevice.push(image);
        });
      }
    }
  }
}

