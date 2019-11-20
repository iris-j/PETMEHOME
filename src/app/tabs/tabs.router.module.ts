import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'post',
        children: [
          {
            path:'',
            loadChildren: () =>
              import('../post/post.module').then(m => m.PostPageModule)
          },
          {
            path:'postlost',
            loadChildren: () =>
              import('../post/postlost/postlost.module').then(m => m.PostlostPageModule)
          }
        ]
      },
      {
        path: 'view',
        children: [
          {
            path:'',
            loadChildren: () =>
              import('../view/view.module').then(m => m.ViewPageModule)
          },

        ]
      },
      {
        path: 'explore',
        children: [
          {
            path:'',
            loadChildren: () =>
              import('../explore/explore.module').then(m => m.ExplorePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
