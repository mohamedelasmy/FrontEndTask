import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Content } from './content/content';
import { Header } from './header/header';
import { Main } from '../../core/services/main';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, Content, Header],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  standalone: true
})
export class Sidebar {
  sidebarVisible = true;
  constructor(private service: Main){}
  toggleSidebar() {
    this.service.setSidebarState(!this.sidebarVisible);
  }
}
