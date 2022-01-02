import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private layoutService: LayoutService,
    public tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {}
  onToggleSidebar() {
    this.layoutService.toggleSidebar();
  }
  //Check user authentication
  isAuthenticated(): boolean {
    return this.tokenStorage.getUserToken();
  }
}
