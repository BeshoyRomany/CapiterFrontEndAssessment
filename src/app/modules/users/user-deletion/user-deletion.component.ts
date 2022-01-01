import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingleUser } from '../models/single-user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-deletion',
  templateUrl: './user-deletion.component.html',
  styleUrls: ['./user-deletion.component.scss']
})
export class UserDeletionComponent implements OnInit {
  user: SingleUser = {}
  constructor(public dialogRef: MatDialogRef<UserDeletionComponent>, 
    @Optional() @Inject(MAT_DIALOG_DATA) public userData: SingleUser , private usersService : UsersService) { }

  ngOnInit(): void {
    //Get User Data from modal
    this.user = this.userData;
  }

  //Delete user
  deleteUser(){
    this.usersService.deleteUser(this.userData.id).subscribe(status => {
      if(status){
        console.log(status)
        this.usersService.showMessage(`${this.userData.first_name} deleted successfully` , 'success')
        this.dialogRef.close(this.userData.id);
      }
    },
    (error) => {
      this.usersService.showMessage(error, 'error');
    })

  }
  //Close delete user modal
  cancel(){
    this.dialogRef.close()
  }
}
