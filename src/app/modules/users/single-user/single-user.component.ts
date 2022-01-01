import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { SingleUser } from '../models/single-user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit, OnDestroy {
  userProfileData: SingleUser = {};
  subscriptions: Subscription[] = [];
  isLoading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    public loaderService: LoaderService, private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

    //Get Single User
    getUser(){
      const id = this.route.snapshot.params['id'];
      let singleUser = this.userService.getUser(id).subscribe(
        (userData) => {
          if(userData)
            console.log(userData);
            this.userProfileData = userData;

            // Just added for purpose to see the shimmer loading, because the response is too fast
            setTimeout(() => {
              this.isLoading = false;
            }, 2000);
        },
        (errorReq) => {
          console.log(errorReq);
          this.isLoading = false
        }
      );
      this.subscriptions.push(singleUser);
    }

    ngOnDestroy(): void {
      this.subscriptions.forEach((item) => {
        item.unsubscribe();
      });
    }
}
