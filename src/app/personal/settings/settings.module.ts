import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent} from '../profile/profile.component';
import { PasswordComponent } from '../password/password.component';
import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [ProfileComponent, PasswordComponent],
  declarations: [SettingsPage, ProfileComponent, PasswordComponent]
})
export class SettingsPageModule {}
