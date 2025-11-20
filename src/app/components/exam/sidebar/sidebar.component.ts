import { Component, EventEmitter, Output } from '@angular/core';

declare var bootstrap: any; // Bootstrap JS runtime üçün

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  closeSidebar() {
    const offcanvasElement = document.getElementById('sidebar');
    if (offcanvasElement) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      bsOffcanvas?.hide();
    }
  }

  isOpen = false; // default bağlıdır

  @Output() sidebarToggled = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.sidebarToggled.emit(this.isOpen);
  }
}
