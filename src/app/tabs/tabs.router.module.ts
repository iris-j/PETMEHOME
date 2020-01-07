import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService} from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // {
      //   path: 'tab1',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () =>
      //         import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      //     }
      //   ]
      // },
      // {
      //   path: 'tab2',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () =>
      //         import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      //     }
      //   ]
      // },
      // {
      //   path: 'tab3',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () =>
      //         import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      //     }
      //   ]
      // },
      // {
      //   path: 'post',
      //   children: [
      //     {
      //       path:'',
      //       loadChildren: () =>
      //         import('../post/post.module').then(m => m.PostPageModule)
      //     },
      //     {
      //       path:'postlost',
      //       loadChildren: () =>
      //         import('../post/postlost/postlost.module').then(m => m.PostlostPageModule)
      //     },
      //     {
      //       path: 'postpet',
      //       loadChildren: () =>
      //       import('../post/postpet/postpet.module').then(m => m.PostpetPageModule)
      //     }
      //   ]
      // },
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
        path: 'personal',
        children: [
          {
            path:'',
            loadChildren: () =>
              import('../personal/personal.module').then(m => m.PersonalPageModule)
          },
          {
            path:'postlost',
            loadChildren: () =>
              import('../post/postlost/postlost.module').then(m => m.PostlostPageModule)
          },
          {
            path: 'postpet',
            loadChildren: () =>
            import('../post/postpet/postpet.module').then(m => m.PostpetPageModule)
          },
          { 
            path: 'settings', 
            loadChildren: () =>
          import('../personal/settings/settings.module').then(m => m.SettingsPageModule) 
          },

        ],
      },
      {
        path: '',
        redirectTo: '/tabs/register',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'register',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../auth/register/register.module').then(m => m.RegisterPageModule)
      }
    ]
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../auth/login/login.module').then(m => m.LoginPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/explore',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
