import { Component, OnDestroy, OnInit } from '@angular/core';
//Angular Material Imports
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

//Users Services, Model and rxjs
import { UsersService } from '../users.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SingleUser } from '../models/single-user.model';
import { UserCreationComponent } from '../user-creation/user-creation.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['avatar', 'first_name', 'last_name', 'email', 'actions'];
  dataSource!: MatTableDataSource<SingleUser>;
  subscriptions: Subscription[] = [];
  constructor(private userService: UsersService, public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
   let getUsers = this.userService.getAllUsers().subscribe(
      results => {
        console.log(results.data);
        this.dataSource = this.getMatUsersDataSource(results.data);
      },
      errorReq => {
        console.log(errorReq);
      }
    );
    this.subscriptions.push(getUsers);
  }

  // MatTable DataSource Class
  getMatUsersDataSource(userList: SingleUser[]){
    let matTableDataSource = new MatTableDataSource(userList); 
    return matTableDataSource;
  }

  //Add User
  addUser() {
    const dialogRef = this.dialog.open(UserCreationComponent, {
      panelClass:'app-dialog-size'
    });

    dialogRef.afterClosed().pipe(map(result => {
      return result;
    })).subscribe(result => {

    });
  }

  //Delete user
  deleteUser(rowData: SingleUser){

  }

  //Update User
  updateUser(userRow: SingleUser){
    this.router.navigate(['/users', userRow.id, 'edit'], {queryParams: {userId: userRow.id}});
  }

  //Clear Subscriptions
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
}
