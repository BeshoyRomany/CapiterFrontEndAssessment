import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoading = false;
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
    this.loaderService.getSpinnerObserver().subscribe((status) => {
      this.isLoading = status === 'start';
      this.cdRef.detectChanges();
    });
  }
  //Logout
  logout() {
    this.tokenStorage.logOut();
  }

  onToggleSidebar() {
    this.layoutService.toggleSidebar();
  }
}
