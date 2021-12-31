import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  constructor() {
    this.initLayout();
   }
  toggleSidebar(){
    console.log('clicked');
    let sidebar = document.querySelector('.app-layout-leftSide');
    let content = document.querySelector('.app-layout-rightSide');
    let overlay = document.querySelector('.app-layout-rightSide--overlay');
    overlay?.classList.toggle('d-none');
    sidebar?.classList.toggle('hide');
    content?.classList.toggle('expand');
  }
  layoutActions(){
    let sidebar = document.querySelector('.app-layout-leftSide');
    let content = document.querySelector('.app-layout-rightSide');
    let overlay = document.querySelector('.app-layout-rightSide--overlay');
    if(window.innerWidth < 991){
      sidebar?.classList.add('hide');
      content?.classList.add('expand');
      overlay?.classList.add('d-none');
    }else{
      sidebar?.classList.remove('hide');
      content?.classList.remove('expand');
    }
  }
  initLayout(){
    window.onresize = () => {
      this.layoutActions()
    };
    window.onload = () => {
      this.layoutActions();
    };
  }
}
