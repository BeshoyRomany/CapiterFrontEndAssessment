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
import { UserDeletionComponent } from '../user-deletion/user-deletion.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'avatar',
    'first_name',
    'last_name',
    'email',
    'actions',
  ];
  dataSource!: MatTableDataSource<SingleUser>;
  subscriptions: Subscription[] = [];
  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    let getUsers = this.usersService.getAllUsers().subscribe(
      (results) => {
        this.dataSource = this.getMatUsersDataSource(results.data);
      },
      (error) => {
        this.usersService.showMessage(error, 'error');
      }
    );
    this.subscriptions.push(getUsers);
  }

  // MatTable DataSource Class
  getMatUsersDataSource(userList: SingleUser[]) {
    let matTableDataSource = new MatTableDataSource(userList);
    return matTableDataSource;
  }

  //Add User
  addUser() {
    const dialogRef = this.dialog.open(UserCreationComponent, {
      panelClass: 'app-dialog-size',
    });
  }

  //Delete user
  deleteUser(userData: SingleUser) {
    const dialogRef = this.dialog.open(UserDeletionComponent, {
      panelClass: 'app-dialog-size',
      data: userData,
    });

    dialogRef
      .afterClosed()
      .pipe(
        map((result) => {
          return result;
        })
      )
      .subscribe(
        (userData) => {
          if (userData) {
            this.deletUserTable(userData);
          }
        },
        (error) => {
          this.usersService.showMessage(error, 'error');
        }
      );
  }

  //Update User
  updateUser(userRow: SingleUser) {
    this.router.navigate(['/users', userRow.id, 'edit'], {
      queryParams: { userId: userRow.id },
    });
  }

  //Delete User from the the datasource
  deletUserTable(userData: SingleUser) {
      let rowDataIndex = this.dataSource.data.indexOf(userData);
      this.dataSource.data.splice(rowDataIndex, 1);
      this.dataSource._updateChangeSubscription();
  }
  //Clear Subscriptions
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
}
