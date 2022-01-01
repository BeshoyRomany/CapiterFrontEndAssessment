import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Routing Module
import { UserRoutingModule } from './user-routing.module';
//Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
//User Components
import { UserListComponent } from './user-list/user-list.component';
import { SingleUserComponent } from './single-user/single-user.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { UserUpdatingComponent } from './user-updating/user-updating.component';
import { UserDeletionComponent } from './user-deletion/user-deletion.component';
import { HttpClientModule } from '@angular/common/http';
import { UserTableActionsComponent } from './user-table-actions/user-table-actions.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    UserListComponent,
    SingleUserComponent,
    UserCreationComponent,
    UserUpdatingComponent,
    UserDeletionComponent,
    UserTableActionsComponent,
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule
  ],
})
export class UsersModule {}
