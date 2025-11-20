import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

declare var bootstrap: any; // bootstrap JS bundle runtime üçün

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

  closeSidebar() {
    const offcanvasElement = document.getElementById('sidebar');
    if (offcanvasElement) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      bsOffcanvas?.hide();
    }
  }

  sidebarMargin = 0;

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  toggleSidebar() {
    this.sidebar.toggleSidebar();
  }

  onSidebarToggled(isOpen: boolean) {
    this.sidebarMargin = isOpen ? 250 : 0;
  }
}
