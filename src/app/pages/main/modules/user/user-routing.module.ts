import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserItemsComponent } from './user-items/user-items.component';
import { UserComponent } from './user.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { UserSubscriptionsComponent } from './user-subscriptions/user-subscriptions.component';
import { UserItemsFormComponent } from './user-items/user-items-form/user-items-form.component';

const routes: Routes = [
  {
    path: "", component: UserComponent,
    children: [
      {
        path: "", component: UserItemsComponent,
        children: [
          {
            path: "form", component: UserItemsFormComponent
          }
        ]
      },
      {
        path: "settings", component: UserSettingsComponent
      },
      {
        path: "messages", component: UserMessagesComponent
      },
      {
        path: "subscriptions", component: UserSubscriptionsComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
