import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SigPadService} from '../service/sig-pad.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sig-pad',
  templateUrl: './sig-pad.component.html',
  styleUrls: ['./sig-pad.component.css']
})
export class SigPadComponent implements OnInit, OnDestroy {


  @ViewChild('sigPad') public sigPad: ElementRef;
  sigPadElement;
  context;
  isDrawing = false;
  name = 'Staff sign';
  showSigPad = false;
  count = 0;
  private subscription: Subscription;

  constructor(private sig_service: SigPadService) {

  }

  public static relativeCoords(event) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return {x, y};
  }

  ngOnInit() {
    this.subscription = this.sig_service.open$.subscribe(() => {
      this.showSigPad = !this.showSigPad;
    });

  }


  @HostListener('document:mouseup', ['$event'])
  onMouseUp() {
    this.isDrawing = false;
  }

  onMouseDown(e) {
    this.isDrawing = true;
    const coords = SigPadComponent.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  onMouseMove(e) {
    this.sigPadElement = this.sigPad.nativeElement;
    this.context = this.sigPadElement.getContext('2d');
    this.context.strokeStyle = 'black';
    if (this.isDrawing) {
      const coords = SigPadComponent.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    this.context.beginPath();
  }

  save() {
    this.count = this.count + 1;
    const img = this.sigPadElement.toDataURL('image/png');
    this.sig_service.image_sig_ad.emit(img);
    if (this.count === 2) {
      this.sig_service.open$.emit();
      this.count = 0;
    }
    if (this.count === 1) {
      this.name = 'Client sign';
    }
    this.clear();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
