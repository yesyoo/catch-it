import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserItemFormComponent } from './user-item-form/user-item-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DealtypeSelectComponent } from '../../../components/dealtype-select/dealtype-select.component';
import { SubcategorySelectComponent } from 'src/app/components/subcategory-select/subcategory-select.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { BoardModule } from '../board/board.module';
import { BoardComponent } from '../board/board.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    UserComponent,
    UserItemFormComponent,
    UserSettingsComponent,
    UserMessagesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DealtypeSelectComponent,
    SubcategorySelectComponent,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    DialogModule,
    ToastModule,
    MessageModule
  ],
  providers: [
    MessageService
  ]

 
})
export class UserModule { }
