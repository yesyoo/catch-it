import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserItemsComponent } from './user-items/user-items.component';
import { UserItemsFormComponent } from './user-items/user-items-form/user-items-form.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { UserSubscriptionsComponent } from './user-subscriptions/user-subscriptions.component';
import { ModalModule } from 'src/app/pages/modal/modal.module';
import { DealtypeSelectComponent } from '../../../../components/dealtype-select/dealtype-select.component';
import { SubcategorySelectComponent } from '../../../../components/subcategory-select/subcategory-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    UserComponent,
    UserItemsComponent,
    UserItemsFormComponent,
    UserSettingsComponent,
    UserMessagesComponent,
    UserSubscriptionsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ModalModule,
    DealtypeSelectComponent,
    SubcategorySelectComponent,
    FormsModule,
    ReactiveFormsModule,
    SelectButtonModule,
    HttpClientModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule
  ],
  providers: []
})
export class UserModule { }
