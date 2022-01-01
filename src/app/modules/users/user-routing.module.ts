import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UserUpdatingComponent } from './user-updating/user-updating.component';
import { SingleUserComponent } from './single-user/single-user.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {path: ':id/edit', component: UserUpdatingComponent},
  {path: ':id', component: SingleUserComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
