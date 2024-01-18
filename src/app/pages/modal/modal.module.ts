import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalRoutingModule } from './modal-routing.module';
import { ModalComponent } from './modal.component';
import { ModalDirective } from './modal.directive';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast'

@NgModule({
  declarations: [
    ModalComponent,
    ModalDirective
  ],
  imports: [
    CommonModule,
    ModalRoutingModule,
    ConfirmDialogModule,
    ToastModule
  ],
  exports: [
    ModalComponent,
    ModalDirective
  ]
})
export class ModalModule { }
