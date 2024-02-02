import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserItemsComponent } from './user-items/user-items.component';
import { UserItemFormComponent } from './user-item-form/user-item-form.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DealtypeSelectComponent } from '../../../components/dealtype-select/dealtype-select.component';
import { SubcategorySelectComponent } from 'src/app/components/subcategory-select/subcategory-select.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    UserComponent,
    UserItemsComponent,
    UserItemFormComponent,
    UserSettingsComponent
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
    InputTextareaModule 
  ]
 
})
export class UserModule { }
