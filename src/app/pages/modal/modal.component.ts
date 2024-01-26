import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { take } from 'rxjs';
import { ModalType } from 'src/app/interfaces/modal';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild('overlay') overlay: ElementRef<HTMLDivElement>;
  showModal: boolean
  modalClose: boolean = false
  messageText: string;
   

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    // this.modalService.showModal$.pipe(take(1)).subscribe(data => this.showModal = data)
    this.messageText = this.modalService.getMessage()
  };

  close(): void {
    this.modalService.show(false)
    console.log('close')
  };
  
  overlayClose(ev: Event): void {
    if (this.overlay.nativeElement === ev.target) {
      this.modalClose = true
    }
  };

  closeModal() {
    this.modalService.show(false)
  };

  cancel() {
    this.modalClose = false
  };

}
