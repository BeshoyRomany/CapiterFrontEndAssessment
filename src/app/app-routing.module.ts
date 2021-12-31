import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'userList', 
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
