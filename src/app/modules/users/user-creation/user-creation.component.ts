import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss'],
})
export class UserCreationComponent implements OnInit, OnDestroy {
  userAddForm!: FormGroup;
  subscriptions: Subscription[] = [];
  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserCreationComponent>
  ) {}

  ngOnInit(): void {
    //Check Validation
    this.userValidation();
  }

  //user form validation
  userValidation() {
    this.userAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      job: ['', Validators.required],
    });
  }

  //Form Validation controls
  get f() {
    return this.userAddForm.controls;
  }

  //Create User
  addUser() {
    if (this.userAddForm.valid) {
      const formData = {
        name: this.userAddForm.value.name,
        job: this.userAddForm.value.job,
      };
      let userCreation = this.userService.createUser(formData).subscribe(
        (response) => {
          console.log(response);
          if (response) {
            this.userService.showMessage(
              `${response.name} Added Successfully`,
              'success'
            );
          }
        },
        (errorReq) => {
          console.log(errorReq);
          this.userService.showMessage(errorReq, 'error');
        }
      );
      this.subscriptions.push(userCreation);
    }
  }

  //close Dialog
  cancel(){
    this.dialogRef.close();
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
  //Remove Subscriptions
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
}
