import { Component, OnDestroy, OnInit } from '@angular/core';
//Angular Material Imports
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
//User List model
//Users Services
import { UsersService } from '../users.service';
import { UserTableActionsComponent } from '../user-table-actions/user-table-actions.component';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SingleUser } from '../models/single-user.model';

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

  //Update & Delete Users
  openActionDialog(action: string, rowData: SingleUser) {
    // rowData.action = action;
    let dialogClass = '',
        dialogWidth = '';
    if (action == 'Edit') {
      dialogClass = 'user-edit-dialog';
      dialogWidth = "50%"
    } else if (action == 'Delete') {
      dialogClass = 'user-delete-dialog';
      dialogWidth = "30%"
    }
    const dialogRef = this.dialog.open(UserTableActionsComponent, {
      width: dialogWidth,
      data: rowData,
      panelClass: dialogClass
    });

    dialogRef.afterClosed().pipe(map(result => {
      if (result)
        delete result.data["action"];
      return result;
    })).subscribe(result => {
      // if (result){
      //   if (result.action == 'Edit')
      //     this.editUser(result.data);
      //   if(result.action == 'Delete')
      //     this.deleteUser(result.data);
      // }
    });
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
