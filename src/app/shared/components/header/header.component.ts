import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  getRealName(): string {
    return 'Márcia Pereira';
  }
  isAdmin(): boolean {
    return true;
  }
  logout(): void {
    console.log('Logout');
  }
}
