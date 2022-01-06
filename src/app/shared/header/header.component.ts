import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoading = false;
  subscriptions: Subscription[] = [];
  constructor(
    private layoutService: LayoutService,
    public loaderService: LoaderService,
    private cdRef: ChangeDetectorRef,
    public tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  //Http Interceptor to check http requests
  init() {
    let loader = this.loaderService.getSpinnerObserver().subscribe((status) => {
      this.isLoading = status === 'start';
      this.cdRef.detectChanges();
    });
    this.subscriptions.push(loader);
  }
  //Logout
  logout() {
    this.tokenStorage.logOut();
  }

  //Toggle sidebar
  onToggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
}
