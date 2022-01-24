import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigPadService implements OnDestroy {
  @Output()
  open$ = new EventEmitter();
  @Output()
  image_sig_ad: EventEmitter<string> = new EventEmitter<string>();
  image_sig: string[] = [];
  private signDefault = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABIxJREFUeF7t2FENwlAQRNGtFL4RgxIMYaEKUFINqIAg42ZPFUzObCbNO8ZHgACBiMARySkmAQIExmA5AgIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKgIDBcgMECGQEDFamKkEJEDBYboAAgYyAwcpUJSgBAgbLDRAgkBEwWJmqBCVAwGC5AQIEMgIGK1OVoAQIGCw3QIBARsBgZaoSlAABg+UGCBDICBisTFWCEiBgsNwAAQIZAYOVqUpQAgQMlhsgQCAjYLAyVQlKYL3A3WCtvwEABDICT4OV6UpQAusFHgZr/Q0AIJAReBmsTFeCElgv8DZY628AAIGMwGWwMl0JSmC9wGmw1t8AAAIZgY/BynQlKIH1At6w1p8AAAINge8/pj+sRllSEtgucM3M7Qd1qgfshFABSgAAAABJRU5ErkJggg==';
  private image_event: Subscription;

  constructor() {
    this.add_image_event();
  }

  add_image_event() {
    this.image_event = this.image_sig_ad.subscribe(image => {
      this.image_sig.push(image);
    });
  }

  getSignPictures() {
    let signatures = this.image_sig;
    this.image_sig = [];
    if (signatures.length !== 2) {
      if (signatures.length === 0) {
        signatures.push(this.signDefault);
        signatures.push(this.signDefault);
      } else if (signatures.length === 1) {
        if (signatures[0] !== undefined && signatures[0].length > 0) {
          signatures.push(this.signDefault);
        } else {
          signatures = [];
          signatures.push(this.signDefault);
          signatures.push(this.signDefault);
        }
      }
    }
    return signatures;
  }

  ngOnDestroy(): void {
    this.image_event.unsubscribe();
  }
}
