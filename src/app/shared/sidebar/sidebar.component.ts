import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { Main } from '../../core/services/main';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, ContentComponent, HeaderComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: true
})
export class SidebarComponent {
  constructor(protected service: Main){}
}
