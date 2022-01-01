import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SingleUser } from '../models/single-user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-updating',
  templateUrl: './user-updating.component.html',
  styleUrls: ['./user-updating.component.scss'],
})
export class UserUpdatingComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  userData: SingleUser = {};
  userAvatar!: string;
  job: string = 'Graphic Designer';
  subscriptions: Subscription[] = [];
  editUserForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    //Get Single User
    this.getUser();
    //Get Validation
    this.userValidation();
  }

  //user form validation
  userValidation(){
    this.editUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      job: ['', Validators.required],
      id: ['']
    });
  }

  //Form Validation controls
  get f() { return this.editUserForm.controls};
  //Get Single User
  getUser(){
    const id = this.route.snapshot.params['id'];
    let singleUser = this.userService.getUser(id).subscribe(
      (userData) => {
        if(userData)
        this.userData = userData;
        // Just added for purpose to see the shimmer loading, because the response is too fast
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);

      },
      (errorReq) => {
        this.isLoading = false;
        console.log(errorReq);
      }
    );
    this.subscriptions.push(singleUser);
  }

  //Update User
  updateUser(){
    if(this.editUserForm.valid){
      const updatedData = {
        name: this.editUserForm.value.name,
        job: this.editUserForm.value.job,
        id: this.userData.id
      }
      this.userService.updateUser(updatedData, this.userData.id).subscribe((response) => {
        console.log(response);
        if(response){
          this.userService.showMessage(`${response.name} Updated Successfully`, 'success' );
          console.log(this.editUserForm);
        }
      },
      errorReq=>{
        console.log(errorReq)
        this.userService.showMessage(errorReq, 'error')
      })
    }
  }
  //Remove Subscriptions
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }

}
