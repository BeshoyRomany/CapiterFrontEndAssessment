import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoading = false;
  constructor(private layoutService: LayoutService, public loaderService: LoaderService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.init();
  }
  init() {
    this.loaderService.getSpinnerObserver().subscribe((status) => {
      this.isLoading = status === 'start';
      this.cdRef.detectChanges();
    });
  }
  onToggleSidebar(){
    this.layoutService.toggleSidebar();
  }

}
