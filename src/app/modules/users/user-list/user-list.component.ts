import { Component, OnInit } from '@angular/core';
//Angular Material Imports
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
//User List model
import { UserList } from '../models/usersList.model';
//Users Services
import { UsersService } from '../users.service';
import { UserTableActionsComponent } from '../user-table-actions/user-table-actions.component';
import { map } from 'rxjs/operators';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['avatar', 'first_name', 'last_name', 'email', 'actions'];
  dataSource!: MatTableDataSource<UserList>;
  constructor(private userService: UsersService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      results => {
        this.dataSource = this.getMatUsersDataSource(results.data);
        console.log(this.dataSource);
      },
      errorReq => {
        console.log(errorReq);
      }
    );
  }

  // MatTable DataSource Class
  getMatUsersDataSource(userList: UserList[]){
    let matTableDataSource = new MatTableDataSource(userList); 
    return matTableDataSource;
  }

  //Update & Delete Users
  openActionDialog(action: string, rowData: UserList) {
    rowData.action = action;
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
    })
  }

}
