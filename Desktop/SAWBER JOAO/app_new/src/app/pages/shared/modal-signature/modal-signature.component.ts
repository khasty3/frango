import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import SignaturePad from 'signature_pad';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-modal-signature',
  templateUrl: './modal-signature.component.html',
  styleUrls: ['./modal-signature.component.scss'],
})
export class ModalSignatureComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('canvas', { static: true }) signaturePadElement;
  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;

  constructor(
    private modalCtrl: ModalController,
    private elementRef: ElementRef,
    private screenOrientation: ScreenOrientation,
    private messageService: MessageService
  ) { }

  closeModal(params = undefined) {
    this.modalCtrl.dismiss(params);
  }

  ngOnInit(): void {
    console.log();
    if (this.screenOrientation.type == this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    this.init();
  }

  ngOnDestroy(): void {
    this.screenOrientation.unlock();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.init();
  }

  init() {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 60;
    if (this.signaturePad) {
      this.signaturePad.clear(); // Clear the pad on init
    }
  }

  public ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    this.signaturePad.clear();
    this.signaturePad.penColor = 'rgb(56,128,255)';
  }

  save() {
    const sign: string = this.signaturePad.toDataURL();
    console.log('save sign', sign.length);
    if (sign.length < 8000) {
      return this.messageService.toastError('Assinatura muito curta');
    }

    this.closeModal(sign)
  }

  clear() {
    this.signaturePad.clear();
  }

}
