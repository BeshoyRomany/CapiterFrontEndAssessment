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
    private usersService: UsersService,
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
      let userCreation = this.usersService.createUser(formData).subscribe(
        (response) => {
          if (response) {
            this.usersService.showMessage(
              `${response.name} Added Successfully`,
              'success'
            );
            this.dialogRef.close();
          }
        },
        (error) => {
          this.usersService.showMessage(error, 'error');
        }
      );
      this.subscriptions.push(userCreation);
    }
  }

  //close Dialog
  cancel() {
    this.dialogRef.close();
    this.removeSubscriptions();
  }
  //Remove Subscriptions
  ngOnDestroy(): void {
    this.removeSubscriptions();
  }

  //Remove Subscriptions
  removeSubscriptions() {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
}
