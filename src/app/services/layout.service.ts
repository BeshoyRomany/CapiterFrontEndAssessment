import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor() {
    this.getLayout();
  }

  getDomElements() {
    const sidebar = document.querySelector(
      '.app-layout-leftSide'
    )! as HTMLElement;
    const content = document.querySelector(
      '.app-layout-rightSide'
    )! as HTMLElement;
    const overlay = document.querySelector(
      '.app-layout-rightSide--overlay'
    )! as HTMLElement;
    return {
      sidebarEl: sidebar,
      contentEl: content,
      overlayEl: overlay,
    };
  }
  toggleSidebar() {
    this.getDomElements().overlayEl.classList.toggle('d-none');
    this.getDomElements().sidebarEl.classList.toggle('hide');
    this.getDomElements().contentEl.classList.toggle('expand');
  }
  layoutActions() {
    if (window.innerWidth < 991) {
      this.getDomElements().sidebarEl.classList.add('hide');
      this.getDomElements().contentEl.classList.add('expand');
      this.getDomElements().overlayEl.classList.add('d-none');
    } else {
      this.getDomElements().sidebarEl.classList.remove('hide');
      this.getDomElements().contentEl.classList.remove('expand');
    }
  }

  getLayout() {
    const observer = new MutationObserver((mutations, obs) => {
      const sidebar = this.getDomElements().sidebarEl;
      const content = this.getDomElements().contentEl;
      if (sidebar && content) {
        console.log('founded')
        window.onresize = () => {
          this.layoutActions();
        };
        this.layoutActions();
        obs.disconnect();
        return;
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }
}
