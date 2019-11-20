import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewPage } from './view.page';
import { DetailmodalComponent } from './detailmodal/detailmodal.component';
const routes: Routes = [
  {
    path: '',
    component: ViewPage
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [DetailmodalComponent],
  declarations: [ViewPage, DetailmodalComponent]
})
export class ViewPageModule {}
