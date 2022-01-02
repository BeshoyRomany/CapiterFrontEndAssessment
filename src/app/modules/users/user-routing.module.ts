import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UserUpdatingComponent } from './user-updating/user-updating.component';
import { SingleUserComponent } from './single-user/single-user.component';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {path: ':id/edit', component: UserUpdatingComponent, canActivate: [AuthGuard]},
  {path: ':id', component: SingleUserComponent, canActivate: [AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
