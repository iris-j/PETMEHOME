import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DetailmodalComponent } from './detailmodal/detailmodal.component';
import { PersonalPage } from './personal.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [DetailmodalComponent],
  declarations: [PersonalPage, DetailmodalComponent]
})
export class PersonalPageModule {}
